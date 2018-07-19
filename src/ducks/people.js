import { appName } from '../config';
import { Record, List } from 'immutable';
import { all, put, call, take, takeEvery, select, fork, spawn, cancel, cancelled } from 'redux-saga/effects';
import { delay, eventChannel } from 'redux-saga';
import { reset } from 'redux-form';
import { generateId , fbDataToEntities} from './utils';
import firebase from 'firebase';
import { createSelector } from 'reselect';

const ReducerState = Record({
    entities: new List([]),
    loading: false
});

const PersonRecord = Record({
    uid: null,
    firstName: null,
    lastName: null,
    email: null,
    events: []
});

export const moduleName = 'people';
export const FETCH_ALL_SUCCESS = `${appName}/${moduleName}/FETCH_ALL_SUCCESS`;
export const FETCH_ALL_REQUEST = `${appName}/${moduleName}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_ERROR = `${appName}/${moduleName}/FETCH_ALL_ERROR`;
export const ADD_PERSON_SUCCESS = `${appName}/${moduleName}/ADD_PERSON_SUCCESS`;
export const ADD_PERSON_REQUEST = `${appName}/${moduleName}/ADD_PERSON_REQUEST`;
export const ADD_PERSON_ERROR = `${appName}/${moduleName}/ADD_PERSON_ERROR`;
export const ADD_EVENT_REQUEST = `${appName}/${moduleName}/ADD_EVENT_REQUEST`;
export const ADD_EVENT_SUCCESS = `${appName}/${moduleName}/ADD_EVENT_SUCCESS`;

export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action;

    switch (type) {
        // case ADD_PERSON:
        //     return state.update('entities', entities => entities.push(new PersonRecord(payload)));
        case ADD_PERSON_REQUEST:
        case FETCH_ALL_REQUEST:
            return state.set('loading', true);

        case ADD_PERSON_SUCCESS:
            return state
                .set('loading', false)
                .setIn(['entities', payload.uid], new PersonRecord(payload));
        
        case FETCH_ALL_SUCCESS:
            return state
                .set('loading', false)
                .set('entities', fbDataToEntities(payload, PersonRecord));

        case ADD_EVENT_SUCCESS:
            return state.setIn(['entities', payload.personUid, 'events'], payload.events);

        default:
            return state;
    }
}

export const stateSelector = state => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, state => state.entities);
export const idSelector = (_, props) => props.uid;
export const peopleListSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray());
export const personSelector = createSelector(entitiesSelector, idSelector, (entities, id) => entities.get(id));

export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: person
    }
}

export function fetchAllPeople() {
    return {
        type: FETCH_ALL_REQUEST
    }
}

export function addEventToPerson(eventUid, personUid) {
    return {
        type: ADD_EVENT_REQUEST,
        payload: {eventUid, personUid}
    }
}

export const addPersonSaga = function * (action) {
    const peopleRef = firebase.database().ref('people');

    try {
        const ref = yield call([peopleRef, peopleRef.push], action.payload);

        yield put({
            type: ADD_PERSON_SUCCESS,
            payload: {...action.payload, uid: ref.key}
        });

        yield put(reset('person'));
    } catch(error) {
        yield put({
            type: ADD_PERSON_ERROR,
            error
        });
    }
}

export const fetchAllSaga = function * () {
    const peopleRef = firebase.database().ref('people');

    try {
        const data = yield call([peopleRef, peopleRef.once], 'value');

        yield put({
            type: FETCH_ALL_SUCCESS,
            payload: data.val()
        });
    } catch(error) {
        yield put({
            type: FETCH_ALL_ERROR,
            error
        });
    }
}

export const addEventSaga = function * (action) {
    const { eventUid, personUid } = action.payload;
    const eventsRef = firebase.database().ref(`people/${personUid}/events`);

    const state = yield select(stateSelector);
    const events = state.getIn(['entities', personUid, 'events']).concat(eventUid);
    console.log('asdf111');
    try {
        yield call([eventsRef, eventsRef.set], events);
        yield put({
            type: ADD_EVENT_SUCCESS,
            payload: {
                personUid,
                events
            }
        });
    } catch (_) {

    }
}

export const backgroundSyncSaga = function * () {
    try {
        while(true) {
            yield call(fetchAllSaga);
            yield delay(2000);
            
            // throw new Error;
        }
    } finally {
        if (yield cancelled()) {
            console.log('%%%%%%%%%', 'cancelled saga');
        }
    }
}

export const cancellableSync = function * () {
    const task = yield fork(realTimeSync);
    yield delay(6000);
    yield cancel(task);
}

const createPeopleSocket = () => eventChannel(emmit => {
    const ref = firebase.database().ref('people');
    const callback = (data) => emmit({data});
    ref.on('value', callback);
    return () => {
        console.log('------', 'unsubscribed');
        ref.off('value', callback);
    }
});

export const realTimeSync = function * () {
    const chan = yield call(createPeopleSocket);
    
    try {
        while(true) {
            const {data} = yield take(chan);
            yield put({
                type: FETCH_ALL_SUCCESS,
                payload: data.val()
            });
            console.log('************', data.val());
        }
    } finally {
        yield call([chan, chan.close]);
        console.log('------', 'cancelled real time saga');
    }
}

// export function addNewPerson(person) {
//     return (dispatch) => {
//         dispatch({
//             type: ADD_NEW_PERSON,
//             payload: {
//                 person: {
//                     id: Date.now(),
//                     ...person
//                 }
//             }
//         })
//     }
// }

export const saga = function * () {
    yield spawn(cancellableSync);
    yield all([
        yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
        yield takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
        yield takeEvery(ADD_EVENT_REQUEST, addEventSaga)
    ]);
} 
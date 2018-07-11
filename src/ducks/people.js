import { appName } from '../config';
import { Record, List } from 'immutable';

const ReducerState = Record({
    entities: new List([])
});

const PersonRecord = Record({
    id: null,
    firstName: null,
    lastName: null,
    email: null
});

export const moduleName = 'people';
export const ADD_NEW_PERSON = `${appName}/${moduleName}/ADD_NEW_PERSON`;

export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action;

    switch (type) {
        case ADD_NEW_PERSON:
            return state.update('entities', entities => entities.push(new PersonRecord(payload.person)));
        
        default:
            return state;
    }
}

export function addNewPerson(person) {
    return (dispatch) => {
        dispatch({
            type: ADD_NEW_PERSON,
            payload: {
                person: {
                    id: Date.now(),
                    ...person
                }
            }
        })
    }
}
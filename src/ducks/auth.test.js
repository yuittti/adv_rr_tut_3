import firebase from 'firebase';
import reducer, {
    signUpSaga, 
    signInSaga, 
    SIGN_UP_REQUEST, 
    SIGN_UP_SUCCESS, 
    SIGN_UP_ERROR,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    SIGN_OUT_REQUEST,
    SIGN_OUT_SUCCESS, 
    signOutSaga,
    ReducerRecord} from './auth'
import { take, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

it('should sign up', () => {
    const saga = signUpSaga();
    const auth = firebase.auth();
    const authData = {
        email: 'test1@test.test',
        password: 'test1234'
    };
    const user = {
        email: authData.email,
        uid: Math.random().toString()
    };
    const requestAction = {
        type: SIGN_UP_REQUEST,
        payload: authData
    };

    expect(saga.next().value).toEqual(take(SIGN_UP_REQUEST));

    expect(saga.next(requestAction).value).toEqual(call(
        [auth, auth.createUserWithEmailAndPassword],
        authData.email, authData.password
    ));

    expect(saga.next(user).value).toEqual(put({
        type: SIGN_UP_SUCCESS,
        payload: {user}
    }));

    const error = new Error;

    expect(saga.throw(error).value).toEqual(put({
        type: SIGN_UP_ERROR,
        error
    }))
});


it('should sign in', () => {
    const saga = signInSaga();
    const auth = firebase.auth();
    const authData = {
        email: 'test1@test.test',
        password: 'test1234'
    };
    const user = {
        email: authData.email,
        uid: Math.random().toString()
    };
    const requestAction = {
        type: SIGN_IN_REQUEST,
        payload: authData
    };

    expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST));

    expect(saga.next(requestAction).value).toEqual(call(
        [auth, auth.signInWithEmailAndPassword],
        authData.email, authData.password
    ));

    expect(saga.next(user).value).toEqual(put({
        type: SIGN_IN_SUCCESS,
        payload: {user}
    }));

    const error = new Error;

    expect(saga.throw(error).value).toEqual(put({
        type: SIGN_IN_ERROR,
        error
    }))
});

it('should sign out', () => {
    const saga = signOutSaga();
    const auth = firebase.auth();

    expect(saga.next().value).toEqual(call([auth, auth.signOut]));
    expect(saga.next().value).toEqual(put({
        type: SIGN_OUT_SUCCESS
    }));
    expect(put(push('/auth/signin')));
});

// Reducers tests

it('should sign out', () => {
    const state = new ReducerRecord({
        user: {}
    });

    const newState = reducer(state, {type: SIGN_OUT_SUCCESS});
    expect(newState).toEqual(new ReducerRecord);
});

it('should sign in', () => {
    const state = new ReducerRecord();
    const user = {
        email: 'test1@test.test',
        password: 'test1234'
    };
    const newState = reducer(state, {
        type: SIGN_IN_SUCCESS,
        payload: { user }
    });
    expect(newState).toEqual(new ReducerRecord({user}));
})
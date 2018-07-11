import React, { Component } from 'react';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import { NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp, moduleName } from '../../ducks/auth';
import Loader from '../Loader/Loader';

class AuthPage extends Component {

    render() { 
        const {loading} = this.props;
        console.log('----', loading);
        return (
            <div>
                <h1>Auth page</h1>
                <NavLink to='/auth/signin' activeStyle={{color: 'red'}}>Sign in</NavLink>
                <NavLink to='/auth/signup' activeStyle={{color: 'red'}}>Sign up</NavLink>
                <Route path='/auth/signin' render={() => <SignInForm onSubmit = {this.handleSignIn} />} />
                <Route path='/auth/signup' render={() => <SignUpForm onSubmit = {this.handleSignUp} />} />
                {loading && <Loader />}
            </div>
        );
    }

    handleSignIn = (values) => {
        console.log(values);
    }

    handleSignUp = ({email, password}) => {
        this.props.signUp(email, password);
    }
}
 
export default connect(state => ({
    loading: state[moduleName].loading
}), {signUp})(AuthPage);
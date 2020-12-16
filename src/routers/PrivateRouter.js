import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { HomePage } from '../components/HomePage';

export const PrivateRoute = ( { 
    isAuthenticated,
    component: Component,
    ...rest}) => (
    <Route {...rest}  component={(props) => (
        isAuthenticated.merchLogin === true ? (
            <div>
                <HomePage />
                <Component {...props} />
            </div>
        ) : (
            <Redirect to='/' />
        )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { HomePage } from '../components/HomePage';
import StartLogin from '../components/StartLogin'

export const PublicRoute = ( {
    isAuthenticated,
    component: Component,
    ...rest}) => (
    <Route {...rest}  component={(props) => (
        isAuthenticated.merchLogin === true ? (
            <div>
                <Redirect to='/dashboard' />
            </div>
        ) : (
            <div>
                <Component {...props} />
            </div>
        )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth
})

export default connect(mapStateToProps)(PublicRoute);
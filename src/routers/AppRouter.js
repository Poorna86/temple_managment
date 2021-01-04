import React from 'react';
import { connect } from 'react-redux';
import {Router, Route , Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { HomePage } from '../components/HomePage';
import DashboardPage from '../components/DashboardPage';
import ProfileEditPage from '../components/ProfileEditPage';
import CreateUser from '../components/CreateUser';
import CreateEvent from '../components/CreateEvent';

export const history = createHistory()

class AppRouter extends React.Component {
// const AppRouter = () => (
    render () {
    return (
        <Router history={history}>
            <div>
                <Switch>
                    {/* {this.props.merchSignup || !this.props.loginStatus && */}
                        <Route path={["/","/merch/login","/merch/signup","/user/login","/user/signup"]} component={HomePage} exact={true}/>
                    {/* } */}
                    {/* {this.props.loginStatus &&
                        <div> */}
                            <Route path="/dashboard" component={DashboardPage} />
                            <Route path="/profileedit" component={ProfileEditPage} />
                            <Route path="/createuser" component={CreateUser} />
                            <Route path="/createevent" component={CreateEvent} />
                        {/* </div>
                    } */}
                </Switch>
            </div>
        </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginStatus: state.auth.loginStatus,
        merchSignup: state.auth.merchSignup
    }
}
 
export default connect(mapStateToProps)(AppRouter);
import React from 'react';
import {Router, Route , Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { HomePage } from '../components/HomePage';
import DashboardPage from '../components/DashboardPage';
import StartLogin from '../components/StartLogin';
import { UserForm } from '../components/UserForm';
import PublicRoute from './PublicRouter';
import PrivateRoute from './PrivateRouter';

export const history = createHistory()

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path={["/","/merch/login"]} component={HomePage} exact={true}/>
                <PrivateRoute path="/dashboard" component={DashboardPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
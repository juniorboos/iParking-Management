import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Sidemenu from './components/Sidemenu'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Management from './pages/Management';
// import Register from './pages/Register';
// import Profile from './pages/Profile';
// import NewIncident from './pages/NewIncident'

export default function Routes() {
    return (
        <BrowserRouter>
            <Sidemenu />
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/management" component={Management} />
                {/* <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} /> */}
            </Switch>
        </BrowserRouter>
    )
}

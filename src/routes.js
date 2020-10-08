import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Management from './pages/Management';
// import Register from './pages/Register';
// import Profile from './pages/Profile';
// import NewIncident from './pages/NewIncident'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/management" component={Management} />
                {/* <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} /> */}
            </Switch>
        </BrowserRouter>
    )
}
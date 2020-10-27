import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { setAccessToken } from './services/accessToken';
import api from './services/api';
import Sidemenu from './components/Sidemenu'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Management from './pages/Management';
import NotFound from './pages/NotFound';
import { useDispatch, useSelector } from 'react-redux'

export default function Routes() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const sidebar = useSelector(state => state.sidebar)

    useEffect(() => {
        api.post("refresh_token", {}, { withCredentials: true })
            .then(response => {
                if (response.data.ok) {
                    setAccessToken(response.data.accessToken)
                    dispatch({
                        type: 'LOGIN',
                        user: response.data.user
                    })
                }
                setLoading(false)
            })
    }, [])

    const PrivateRoute = ({ component: Component, ...rest }) => {
        return (
            <Route
                {...rest}
                render={props =>
                    sidebar ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                    )
                }
            />
        )
    }

    const LoginRoute = ({ component: Component, ...rest }) => {
        return (
            <Route
                {...rest}
                render={props =>
                    !sidebar ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
                    )
                }
            />
        )
    }

    const NotFoundRoute = ({ component: Component, ...rest }) => {
        return (
            <Route
                {...rest}
                render={props => (
                    dispatch({ type: 'HIDE_SIDEBAR' }),
                    (
                        <Component {...props} />
                    )
                )
                }
            />
        )
    }

    if (loading) {
        return <div>loading...</div>
    }
    return (
        <BrowserRouter>
            <Sidemenu show={sidebar} />
            <Switch>
                <LoginRoute path="/" exact component={Login} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/management" component={Management} />
                <NotFoundRoute component={NotFound} />
                {/* <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} /> */}
            </Switch>
        </BrowserRouter>
    )
}

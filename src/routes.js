import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { setAccessToken } from './services/accessToken';
import api from './services/api';
import Sidemenu from './components/Sidemenu'
import Login from './pages/Login';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Management from './pages/Management';
import NotFound from './pages/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import firebase from './services/firebase'

export default function Routes() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()
    const sidebar = useSelector(state => state.sidebar)
    // const user = useSelector(state => state.user)
    
    // useEffect(() => {
    //     console.log(user)
        // api.post("refresh_token", {}, { withCredentials: true })
        //     .then(response => {
        //         if (response.data.ok) {
        //             setAccessToken(response.data.accessToken)
        //             dispatch({
        //                 type: 'LOGIN',
        //                 user: response.data.user
        //             })
        //         }
        //         setLoading(false)
        //     })
    // }, [])

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log("authenticated")
                user.getIdTokenResult().then(idTokenResult => {
                    if(idTokenResult.claims.admin) {
                        setUser(firebase.auth().currentUser)
                        const user = {
                            email: firebase.auth().currentUser.email,
                            name: firebase.auth().currentUser.displayName,
                        };
                        dispatch({
                            type: 'LOGIN', 
                            user: user
                        })
                    }
                })
            } else {
                dispatch({ type: 'LOGOUT'})
            }
            setLoading(false)
        });
    }, [])
    
    const PrivateRoute = ({ component: Component, ...rest }) => {
        return (
            <Route
                {...rest}
                render={props =>
                    user ? (
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
                    !user ? (
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
                <PrivateRoute path="/admin" component={Admin} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/management" component={Management} />
                <NotFoundRoute component={NotFound} />
                {/* <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} /> */}
            </Switch>
        </BrowserRouter>
    )
}

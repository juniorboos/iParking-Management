import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Sidemenu from './components/Sidemenu'

import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Management from './pages/Management';
import NotFound from './pages/NotFound';
import Analytics from './pages/Analytics';

import { useDispatch, useSelector } from 'react-redux';
import firebase from './services/firebase'

export default function Routes() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()
    const sidebar = useSelector(state => state.sidebar)
    const userId = useSelector(state => state.user.id)

    function onAuthStateChange (callback) {
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("Authenticated")
                user.getIdTokenResult().then(idTokenResult => {
                    if(idTokenResult.claims.admin) {
                        // setUser(firebase.auth().currentUser)
                        const user = {
                            id: firebase.auth().currentUser.uid,
                            email: firebase.auth().currentUser.email,
                            name: firebase.auth().currentUser.displayName,
                        };
                        dispatch({
                            type: 'LOGIN', 
                            user: user
                        })
                        callback(firebase.auth().currentUser)
                    }
                })
            } else {
                console.log("Logging out")
                alert('You are not ADMIN!')
                // setUser(null)
                dispatch({ type: 'LOGOUT'})
                callback(null)
            }
            setLoading(false)
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser)
        return () => {
            console.log('stopped listening')
            unsubscribe()
        }     
    }, [])
    
    const PrivateRoute = ({ component: Component, ...rest }) => {
        return (
            <Route
                {...rest}
                render={props =>
                    user ? (
                        dispatch({ type: 'SHOW_SIDEBAR' }),
                        <Component {...props} />
                    ) : (
                        dispatch({ type: 'HIDE_SIDEBAR' }),
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
                        dispatch({ type: 'HIDE_SIDEBAR' }),
                        <Component {...props} />
                    ) : (
                        dispatch({ type: 'SHOW_SIDEBAR' }),
                        <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
                    )
                }
            />
        )
    }

    const PublicRoute = ({ component: Component, ...rest }) => {
        return (
            <Route
                {...rest}
                render={props => (
                    dispatch({ type: 'HIDE_SIDEBAR' }),
                    <Component {...props} />
                )}
            />
        )
    }

    if (loading) {
        return <div>loading...</div>
    }

    return (
        <BrowserRouter>
            {sidebar && (<Sidemenu />) }
            <Switch>
                <LoginRoute path="/" exact component={Home} />
                <LoginRoute path="/login" component={Login} />
                <PrivateRoute path="/admin" component={Admin} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/management" component={Management} />
                <PrivateRoute path="/analytics" component={Analytics} />
                <PublicRoute component={NotFound} />
                {/* <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} /> */}
            </Switch>
        </BrowserRouter>
    )
}
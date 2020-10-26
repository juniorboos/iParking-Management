import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { setAccessToken } from './services/accessToken';
import api from './services/api';
import Sidemenu from './components/Sidemenu'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Management from './pages/Management';
import { useDispatch, useSelector } from 'react-redux'

export default function Routes() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const sidebar = useSelector(state => state.sidebar)

    useEffect(() => {
        api.post("refresh_token", {}, { withCredentials: true })
            .then(response => {
                if (response.data.ok) {
                    console.log("Refreshed: ")
                    console.log(response.data)
                    setAccessToken(response.data.accessToken)
                    dispatch({
                        type: 'LOGIN',
                        user: response.data.user
                    })
                }
                setLoading(false)
            })
    }, [])

    const PrivateRoutes = () => {
        if (sidebar) {
            return (
                <>
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/management" component={Management} />
                </>
            )
        } else {
            return null
        }
    }

    if (loading) {
        return <div>loading...</div>
    }
    return (
        <BrowserRouter>
            <Sidemenu show={sidebar}/>
            <Switch>
                <Route path="/" exact component={Login} />
                <PrivateRoutes />
                {/* <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/management" component={Management} /> */}
                {/* <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} /> */}
            </Switch>
        </BrowserRouter>
    )
}

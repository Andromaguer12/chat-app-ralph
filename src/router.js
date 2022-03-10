import React, { Suspense, useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import { RoutesTemplate } from './pages/routes/routesTemplate'
import RoutesValidator from './pages/routes/RoutesValidator'
import { UserContext } from './services/UserContext'


export default function Router() {
    const [User, setUser] = useState({ auth: "null" })
    
  return (
    <BrowserRouter>
        <Suspense fallback={<p>LOADING...</p>}>
            <Switch>
                <UserContext.Provider value={{User, setUser}}>
                    {
                        RoutesTemplate.map(({routes, auth}) => {
                            return routes.map((route) => (
                                <Route 
                                    path={route.path}
                                    key={route.path}
                                    exact={true}
                                    render={(routedata) => {
                                        return <RoutesValidator 
                                            route={routedata}
                                            path={route.path}
                                            auth={auth}
                                            component={route.component}
                                            redirect={route.to}
                                        />
                                    }}
                                />
                            ))
                        })
                    }
                </UserContext.Provider>
                <Route path="/" component={ErrorPage} />
            </Switch>
        </Suspense>
    </BrowserRouter>
  )
}

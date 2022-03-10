import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../../services/UserContext'
import commonLayout from './commonLayout'

const user = {
    auth: "null",
    name: "pedazo"
}

export default function RoutesValidator({route, path, auth, component, redirect, ...props}) {
    const {User, setUser} = useContext(UserContext)
    const Layout = commonLayout;
    // user
    const userRestrictions = (user, pageAuth) => user === "user" && pageAuth === "user"
    const nullRestrictions = (user, pageAuth) => user === "null" && pageAuth === "null"

    if(userRestrictions(User.auth, auth)){
        return (
            <Layout Component={component} {...props} />
        )
    }

    if(nullRestrictions(User.auth, auth)){
        return (
            <Layout Component={component} {...props} />
        )
    }

    return (
        <Redirect to={redirect} />
    )
}

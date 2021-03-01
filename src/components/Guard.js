
import React from 'react'
import { Redirect } from 'react-router-dom'

const Guard = (props) => {
    userInfo
    return (
            userInfo?
            <Route {...props} />
            :<Redirect to="/"/>
    )
}

export default Guard

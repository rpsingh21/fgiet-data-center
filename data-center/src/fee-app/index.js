import React from 'react'
import { Route } from 'react-router-dom'

import FeeRegistrationForm from './FeeRegistrationForm'

const FeeApp = ({match}) =>{
    return (
        <div>
            <Route exact path={`${match.url}/registration`} component={FeeRegistrationForm}></Route>
        </div>
    )
}

export default FeeApp

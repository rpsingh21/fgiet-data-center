import React from 'react'
import { Route } from 'react-router-dom'

import FeeRegistrationForm from './registration-form'

const FeeApp = ({match}) =>{
    return (
        <div>
            <Route exact 
                path={`${match.url}/registration`} 
                component={FeeRegistrationForm}/>
        </div>
    )
}

export default FeeApp

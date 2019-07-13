import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import BasicDetails from './BasicDetails'

class FeeRegistration extends Component {
    render(){
        return (
            <form>
                <h1>Form Component</h1>
                <BasicDetails/>
            </form>
        )
    }
}

const FeeRegistrationForm = reduxForm({
    form:'fee-reg'
})(FeeRegistration)

export default FeeRegistrationForm

import React from 'react'

import {Field} from 'redux-form'
import { Input } from 'semantic-ui-react'

const BasicDetails = () => {
    return (
        <div className="basic details">
            <Field name='name' component={Input} type='text'/>
        </div>
    )
}

export default BasicDetails

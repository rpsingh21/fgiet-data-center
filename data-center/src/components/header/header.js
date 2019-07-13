import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu } from 'semantic-ui-react'

export default class MenuExampleSizeSmall extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu size='small'>
                <Menu.Item name='home'
                    as={Link} to=''
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}>
                    <img src="https://www.fgiet.in/media/img/fgiet.png" alt="logo"/>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item as={Link} to='/fee/registration' name='fee_reg'
                        onClick={this.handleItemClick}
                        active={activeItem === 'fee_reg'}>
                        <Button>Fee Registration</Button>
                    </Menu.Item>
                    <Menu.Item as={Link} to='/login' name='login'
                        onClick={this.handleItemClick}
                        active={activeItem === 'login'}>
                        <Button primary>Sing In</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

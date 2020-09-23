import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {
    state = {
        username: ''
    }

    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    formSubmitHandler = (e) => {
        e.preventDefault();
        const user = {
            username: this.state.username,
        }

        console.log(user)

        axios.post('http://localhost:5000/users/add', user)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        this.setState({
            username: ''
        })

        // window.location = '/'
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.formSubmitHandler}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.usernameChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

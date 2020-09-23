import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class CreateExercise extends Component {
    state = {
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: [],
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => { return user.username }),
                        username: res.data[0].username
                    })
                }
            })
            .catch(err => {
                console.log("Error ", err)
            })
    }

    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    descriptionChangeHandler = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    durationChangeHandler = (e) => {
        this.setState({
            duration: e.target.value
        })
    }

    dateChangeHandler = (date) => {
        this.setState({
            date: date
        })
    }

    formSubmitHandler = (e) => {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise)

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        window.location = '/'
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.formSubmitHandler}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.usernameChangeHandler}>
                            {
                                this.state.users.map((user) => {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.descriptionChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.durationChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.dateChangeHandler}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

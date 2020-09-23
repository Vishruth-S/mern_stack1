import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar';
import ExercisesList from './components/ExercisesList';
import EditExercise from './components/EditExercise';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Route path="/" exact component={ExercisesList} />
          <Route path="/edit/:id" exact component={EditExercise} />
          <Route path="/create" exact component={CreateExercise} />
          <Route path="/user" exact component={CreateUser} />
        </div>
      </Router>
    )
  }
}


export default App
import React, { Component } from 'react';  // TODO - Ask Michael what this is doing
import './App.css';
import Nav from './components/Nav';
import List from './components/List';
import Note from './components/Note';
import axios from 'axios';
import urlFor from './helpers/urlFor';

// TODO - Ask Michael - if you put all the imports in a file and import that file do you get all those imports too?
// TODO - Ask Michael about naming convention for file names, functions and variables

class App extends Component {
  constructor () {
    super();
    this.state = {
      showNote: false
    };
  }

  render () {
    const { showNote } = this.state;

    return (
            <div className="App">
              <Nav toggleNote={this.toggleNote} showNote={showNote}/>
              { showNote ? <Note/> : <List getNotes={this.getNotes}/> }
            </div>
    );
  }

  toggleNote = () => {
    this.setState({ showNote: !this.state.showNote});
  }

  // TODO - Ask Michael if promises are specific to Axios or just the .get, .then .catch format
  getNotes = () => {
    axios.get(urlFor('notes'))
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.data));
  }
}

export default App;

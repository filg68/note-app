import React, { Component } from 'react';  // TODO - Ask Michael what this is doing
import './App.css';
import Nav from './components/Nav';
import List from './components/List';
import Note from './components/Note';
import axios from 'axios';

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

  getNotes = () => {
    axios.get('https://gamba-notes.herokuapp.com/notes')
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.data));
  }
}

export default App;

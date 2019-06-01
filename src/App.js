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
      showNote: false,
      notes: [],
      note: {}
    };
  }

  render () {
    const { showNote, notes, note } = this.state;

    return (
            <div className="App">
              <Nav toggleNote={this.toggleNote} showNote={showNote}/>
              { showNote
                      ?
                      <Note note={note}
                            submitNote={this.submitNote}
                      />
                      :
                      <List getNotes={this.getNotes}
                            notes={ notes }
                            getNote={ this.getNote }
                      /> }
            </div>
    );
  }

  toggleNote = () => {
    this.setState({ showNote: !this.state.showNote});
  }

  // TODO - Ask Michael if promises are specific to Axios or just the .get, .then .catch format
  getNotes = () => {
    axios.get(urlFor('notes'))
    .then((res) => this.setState( {notes: res.data }))
    .catch((err) => console.log(err.data));
  }

  getNote = (id) => {
    axios.get(urlFor(`notes/${id}`))
    .then ((res) => this.setState({ note: res.data, showNote: true }))
    .catch ((err) => console.log(err.response.data));
  }

  submitNote = (data) => {
    console.log(data);
  }

}

export default App;

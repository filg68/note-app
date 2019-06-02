import React, { Component } from 'react';  // TODO - Ask Michael what this is doing
import './App.css';
import Nav from './components/Nav';
import List from './components/List';
import Note from './components/Note';
import axios from 'axios';
import urlFor from './helpers/urlFor';
import Flash from './components/Flash';

// TODO - Ask Michael - if you put all the imports in a file and import that file do you get all those imports too?
// TODO - Ask Michael about naming convention for file names, functions and variables

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNote: false,
      notes: [],
      note: {},
      newTag: false,
      error:''
    };
  }

  render () {
    const { showNote, notes, note, newTag, error } = this.state;

    return (
            <div className="App">
              <Nav toggleNote={this.toggleNote} showNote={showNote}/>
              {error && <Flash error={error} resetError={this.resetError} />}
              { showNote
                      ?
                      <Note note={note}
                            submitNote={this.submitNote}
                            showTagForm={this.showTagForm}
                            closeTagForm={this.closeTagForm}
                            submitTag={this.submitTag}
                            deleteTag={this.deleteTag}
                            newTag={newTag}

                      />
                      :
                      <List getNotes={this.getNotes}
                            notes={ notes }
                            getNote={ this.getNote }
                            deleteNote={this.deleteNote}
                      /> }
            </div>
    );
  }

  toggleNote = () => {
    this.setState({
                    showNote: !this.state.showNote,
                    note: {},
                    error: ''
    });
  };

  // TODO - Ask Michael if promises are specific to Axios or just the .get, .then .catch format
  getNotes = () => {
    axios.get(urlFor('notes'))
    .then((res) => this.setState( {notes: res.data }))
    .catch((err) => console.log(err.data));
  };


  // TODO Ask Michael - what's with the weird quotes ` why not just use '
  getNote = (id) => {
    axios.get(urlFor(`notes/${id}`))
    .then ((res) => this.setState({ note: res.data, showNote: true }))
    .catch ((err) => console.log(err.response.data));
  };

  performSubmissionRequest = (data, id) => {
    if (id) {
      return axios.patch(urlFor(`notes/${id}`), data)
    }else{
      return axios.post(urlFor('notes'), data );
    }

  };

  //TODO Ask Michael about the res\err naming and if it is an arbitrary convention
  submitNote = (data, id) => {
    this.performSubmissionRequest(data, id)
    .then(() => this.setState({ showNote: false, error: '' }))
    .catch((err) => {
      const { errors } = err.response.data;
      if (errors.content) {
        this.setState({ error: 'Missing Note Content!' });
      } else if (errors.title) {
        this.setState({error: 'Missing Note Title!'});
      }
    });
  };

  //TODO Ask Michael --- does every function that the app need to perfomr live in this file?

  deleteNote = (id) => {
    const newNotesState = this.state.notes.filter((note) => note.id !== id );
    axios.delete(urlFor(`notes/${id}`))
    .then (() => this.setState({notes: newNotesState }))
    .catch ((err) => console.log(err.response.data));
  };

  showTagForm = () => {
    this.setState({ newTag: true });
  };

  closeTagForm = () => {
    this.setState({ newTag: false });
  };

  submitTag = (data, noteId) => {
    axios.post(urlFor(`notes/${noteId}/tags`), data)
    .then(() => this.getNote(noteId))
    .catch((err) => {
      const { errors } = err.response.data;
      if (errors.name) {
        this.setState({ error: 'Missing Tag Name!'});
      }
    });
  };

  deleteTag = (noteId, tagId) => {
    axios.delete(urlFor(`/tags/${tagId}`))
    .then(() => this.getNote(noteId))
    .catch((err) => console.log(err.response.data))
  };

  resetError = () => { this.setState({ error: '' })};
}

export default App;

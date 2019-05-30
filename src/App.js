import React, { Component } from 'react';  // TODO - Ask Michael what this is doing
import './App.css';
import Nav from './components/Nav';
import List from './components/List';
import Note from './components/Note';

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
              { showNote ? <Note/> : <List/> }
            </div>
    );
  }

  toggleNote = () => {
    this.setState({ showNote: !this.state.showNote});
  }
}

export default App;

import React from 'react';

class NoteCard extends React.Component {

  renderTags(note) {
    return note.tags.map((tag, index) =>
      <span className='note-card-tag' key={index}>
        {tag.name}
      </span>
    );
  };

  render () {
    const { note, getNote, deleteNote } = this.props; // TODO Ask Michael - destructuring is an E6 feature right?

    return (
            <div className='note-card-container'>
              <div className='note-card-title'>
                {note.title}
              </div>
              <div className='note-card-content'>
                {note.content}
              </div>
              <span classname='note-card-tags'>
                {this.renderTags(note)}
              </span>
              <span className='note-card-delete' onClick={() => deleteNote(note.id)}>
                <i className='material-icons'>close</i>
              </span>
              <span className='note-card-edit' onClick={() => getNote(note.id) }>
                <i className='material-icons'>mode_edit</i>
              </span>
            </div>
    );
  }
}

export default NoteCard;
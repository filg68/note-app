import React from 'react';
import NoteCard from './NoteCard';

class List extends React.Component {

  componentWillMount () {
    this.props.getNotes();
  }

  render () {
    const { notes, getNote } = this.props;

    // Builds a card for each note
    const cards = notes.map((note, index) => {
      return (
              <NoteCard
                key={index}
                index={index}
                note={note}
                getNote={ getNote }
              />
      );
    });

    // noinspection JSRemoveUnnecessaryParentheses
    return (
            <div className='list-container'>
              {cards}
            </div>
    );
  }

}

export default List;
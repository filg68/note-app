import React, { Component } from 'react';

class Nav extends Component {
  render () {
    const { toggleNote, showNote } = this.props;  // TODO - Ask Michael about how toggleNote is being used - assume
                                                  // function?
    return (
      <div className='nav-container'>
        <div className='nav-logo'>Note</div>
        <div className='nav-button' onClick={() => toggleNote()} >
          { showNote ? 'Cancel' : '+ Note' }
        </div>
      </div>
    );
  }
}

export default Nav;

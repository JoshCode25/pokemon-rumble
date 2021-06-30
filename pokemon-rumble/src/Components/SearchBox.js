  
import React from 'react';

const SearchBox = ({ updateDisplay, submitInput, levelUp }) => {
  return (
    <div className='pa2 flex justify-center'>
      <input
        className='pa3 ba b--green bg-lightest-blue'
        id='searchIdentifier'
        type='search'
        placeholder='Name/Id'
        onChange={updateDisplay}
        onBlur={updateDisplay}
      />
      <input
        className='pa3 ba b--green bg-lightest-blue'
        id='searchLevel'
        type='number'
        min='1'
        max='100'
        placeholder='Level'
        onChange={updateDisplay}
        onBlur={updateDisplay}
      />
      <input
        type='button'
        value='submit'
        onClick={submitInput}
      />
      <input
        type='button'
        value='Level Up'
        onClick={levelUp}
      />
    </div>
  );
}

export default SearchBox;
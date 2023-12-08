import React from 'react';

const TextSource = ({setText,Text,settextchars}) => {
  const handleTextChange = (event) => {
    const newText = event.target.value;
    const charCountChange = newText.length - Text.length;
    setText(newText);
    settextchars((prevCharCount) => prevCharCount + charCountChange);
  };
  return (
    <div>
      <div className='my-6 mx-6 rounded-lg border border-bray-400  focus:border-blue-300'>
        <textarea
          className='w-full p-2 focus:outline-none focus:outline-blue-300 rounded-lg shadow-md text-sm'
          rows="20" cols="50"
          placeholder="Enter text here..."
          value={Text}
          onChange={handleTextChange}
        ></textarea>
      </div>
    </div>
  );
};

export default TextSource;

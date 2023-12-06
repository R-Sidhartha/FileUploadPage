import React, { useState } from "react";

const QASource = ({setTotalCharacters}) => {
  const [qaComponents, setQaComponents] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAddComponent = () => {
    const newQaComponent = { question, answer };
    setTotalCharacters(question.length + answer.length);
    setQaComponents((prevQaComponents) => [...prevQaComponents, newQaComponent]);
    setQuestion("");
    setAnswer("");
  };
  
  const handleRemoveComponent = (index) => {
    // Get the lengths of the question and answer before updating state
    const questionLength = qaComponents[index].question.length;
    const answerLength = qaComponents[index].answer.length;
  
    // Update charCount by subtracting the lengths of the removed question and answer
    setTotalCharacters((prevCharCount) => prevCharCount - questionLength - answerLength);
  
    // Update qaComponents by removing the specified component
    setQaComponents((prevQaComponents) => prevQaComponents.filter((_, i) => i !== index));
  };
  
  
  

  const handleCloseAllComponents = () => {
    setQaComponents([]);
    setTotalCharacters(0);
  };

  const handleQuestionChange = (event) => {
    const newQuestion = event.target.value;
    setQuestion(newQuestion);
    setTotalCharacters((prevCharCount) => {
      const removedQuestionChars = question.length;
      return prevCharCount - removedQuestionChars + newQuestion.length;
    });
  };

  const handleAnswerChange = (event) => {
    const newAnswer = event.target.value;
    setAnswer(newAnswer);
    setTotalCharacters((prevCharCount) => {
      const removedAnswerChars = answer.length;
      return prevCharCount - removedAnswerChars + newAnswer.length;
    });
  };

  return (
    <div>
      {qaComponents.map((qa, index) => (
        <div key={index} className="flex flex-col my-4 mx-4">
          <div className="border border-gray-300 p-2 relative">
            <label htmlFor={`question-${index}`}>Question</label>
            <textarea
              id={`question-${index}`}
              className="w-full p-2 focus:outline-none focus:outline-blue-300 rounded-lg shadow-md text-sm my-2"
              rows="2"
              placeholder="Your question ?"
              onChange={handleQuestionChange}
            ></textarea>
            <label htmlFor={`answer-${index}`}>Answer</label>
            <textarea
              id={`answer-${index}`}
              className="w-full p-2 focus:outline-none focus:outline-blue-300 rounded-lg shadow-md text-sm my-2"
              rows="5"
              placeholder="Answer.."
              onChange={handleAnswerChange}
            ></textarea>
            <button
              className="absolute top-0 right-2 px-2 py-1 mt-2 text-sm"
              onClick={() => handleRemoveComponent(index)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      ))}
      <div>
        <button
          className="bg-gray-300 rounded-md px-2 py-1 my-5 mx-5 text-sm"
          onClick={handleAddComponent}
        >
          Add
        </button>
        {qaComponents.length > 0 && (
          <button
            className="bg-red-500 text-white rounded-md px-2 py-1 my-5 mx-5 text-sm"
            onClick={handleCloseAllComponents}
          >
            Close All
          </button>
        )}
      </div>
    </div>
  );
};

export default QASource;

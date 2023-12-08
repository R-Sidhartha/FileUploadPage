import React, { useState } from "react";

const QASource = ({setqaList,qaList,setqaChars }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAddComponent = () => {
    if (question.trim() !== "" && answer.trim() !== "") {
      const newQaComponent = { question, answer };
      setqaChars(
        (prevCharCount) => prevCharCount + question.length + answer.length
      );

      setqaList((prevComponents) => [...prevComponents, newQaComponent]);
      setQuestion("");
      setAnswer("");
    }
  };

  const handleRemoveComponent = (index) => {
    // Subtract the char count of the removed component
    const removedComponent = qaList[index];
    setqaChars(
      (prevCharCount) =>
        prevCharCount -
        removedComponent.question.length -
        removedComponent.answer.length
    );

    // Remove the component from the array
    setqaList((prevComponents) => {
      const updatedComponents = [...prevComponents];
      updatedComponents.splice(index, 1);
      return updatedComponents;
    });
  };

  return (
    <div className="p-2">
      <div className="my-4 mx-4 ">
        <div className="border border-gray-300 p-2 rounded-lg">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 my-1">Question</label>
            <textarea
              rows={3}
              value={question}
              placeholder="Enter your question"
              required
              onChange={(e) => setQuestion(e.target.value)}
              className="border border-gray-300 p-2 rounded-md text-sm text-gray-700 focus:border-blue-300 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
            ></textarea>
          </div>
          <div className="flex flex-col my-2">
            <label className="text-sm text-gray-600 my-1">Answer</label>
            <textarea
              rows={5}
              value={answer}
              placeholder="Enter answer"
              required
              onChange={(e) => setAnswer(e.target.value)}
              className="border border-gray-300 p-2 rounded-md text-sm text-gray-700 focus:border-blue-300 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
            ></textarea>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-gray-300 rounded-md px-2 py-1 my-3 text-sm"
            onClick={handleAddComponent}
            hidden={!question || !answer}
          >
            Add
          </button>
        </div>
        {qaList.length > 0 && (
          <div>
            <h2 className="text-center text-gray-700 my-1">
              Q&A Components ({qaList.length})
            </h2>
            <div className="border border-gray-400 rounded-lg mt-2">
              <ul>
                {qaList.map((component, index) => (
                  <li
                    key={index}
                    className="my-4 mx-4 border border-gray-300 p-3 rounded-lg relative"
                  >
                    <div className="flex flex-col">
                      <label className="my-1 text-sm text-gray-600">
                        Question {index + 1}:
                      </label>
                      <textarea
                        rows={3}
                        value={component.question}
                        className="border border-gray-300 p-2 rounded-md text-sm text-gray-600 bg-gray-100 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                        readOnly
                      ></textarea>
                    </div>
                    <div className="flex flex-col my-2">
                      <label className="my-1 text-sm text-gray-600">
                        Answer:
                      </label>
                      <textarea
                        rows={5}
                        value={component.answer}
                        className="border border-gray-300 p-2 rounded-md text-sm text-gray-600 bg-gray-100 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                        readOnly
                      ></textarea>
                    </div>
                    <button
                      className="absolute top-1 right-2 text-gray-700 hover:opacity-60"
                      onClick={() => handleRemoveComponent(index)}
                    >
                      <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default QASource;

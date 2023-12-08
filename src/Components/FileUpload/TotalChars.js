import React from "react";

const TotalChars = ({totalCharacters,Sources}) => {
  const {filelist, qalist, fileChars, qachars, textChars}=Sources
  return (
    <div className="w-3/4 md:w-1/2 lg:w-11/12">
      <div
        className={`w-full border border-gray-300 flex flex-col items-center`}
      >
        <div
          className={`flex flex-col justify-center w-full p-3`}
        >
            <h2 className="font-bold text-center opacity-75 my-2">Sources</h2>
            <div className="flex flex-col">
              {filelist>0 &&
            <span className="text-sm my-1 text-gray-700">
              {filelist} File <span className="opacity-80">({fileChars} chars)</span>
            </span>
            }
            {qalist > 0 &&
            <span className="text-sm my-1 text-gray-700">
              {qalist} Q&A <span className="opacity-80">({qachars} chars)</span>
            </span>
            }
            {textChars>0 &&
            <span className="text-sm text-gray-700">
             Text input <span className="opacity-80">({textChars} chars)</span> 
            </span>
            }
            </div>
          <h2 className=" font-semibold my-1 text-sm">
            Total characters 
          </h2>
          <p className="text-sm text-center">
            {totalCharacters}
            <span className="opacity-60">/10,00,000 limit</span>
          </p>
          <div className="w-full">
            <button className="btn block mt-4 px-4 py-2 rounded-md bg-gradient-to-r from-blue-300 via-purple-500 to-blue-200  font-semibold hover:opacity-90 my-2 w-full text-lg">
              Create Chatbot &#8230;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalChars;

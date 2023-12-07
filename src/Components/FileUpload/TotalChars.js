import React from "react";

const TotalChars = ({isMobileView,Sources,totalCharacters}) => {
  return (
    <div>
      <div
        className={`${
          isMobileView ? " w-11/12 my-3 " : " w-full border border-gray-300 "
        }  flex flex-col items-center ${
          Sources.length > 0
            ? "border border-gray-400 border-opacity-40 rounded-3xl"
            : ""
        }  `}
      >
        <div
          className={`flex flex-col justify-center w-full p-3`}
        >
            <h2 className="font-bold text-center opacity-75 my-2">Sources</h2>
            <span className="text-sm">
              {/* Total Files: {files.length > 0 ? files.length : 0} */}
            </span>
          <h2 className=" font-semibold my-2">
            Total Characters
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
        {/* )} */}
      </div>
    </div>
  );
};

export default TotalChars;

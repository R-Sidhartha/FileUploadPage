import React, { useState } from "react";
import TotalChars from "./FileUpload/TotalChars";
import FileSource from "./FileUpload/FileSource";
import TextSource from "./FileUpload/TextSource";
import WebsiteSource from "./FileUpload/WebsiteSource";
import QASOurce from "./FileUpload/QASOurce";

const Main = ({ isMobileView,totalCharacters,setTotalCharacters }) => {
  const [Sources, setSources] = useState({totalFiles:'',totalTextChars:'',totalQAcomponenets:''});
  const [Source, setSource] = useState('File');
  const handleFileSource = () => {
    setSource('File')
  };
  const handleTextSource = () => {
    setSource('Text');
  };
  const handleQuestionSource = () => {
    setSource('Q&A');
  };
  const handleWebsiteSource = () => {
    setSource('Website');
  };
  
  let sourceComponent;

  if (Source==='File') {
    sourceComponent = (
      <FileSource
      setTotalCharacters={setTotalCharacters}
      totalCharacters={totalCharacters}
        isMobileView={isMobileView}
        setSources={setSources}
      />
    );
  } else if (Source==='Text') {
    sourceComponent = <TextSource 
    setTotalCharacters={setTotalCharacters}
     totalCharacters={totalCharacters}
     setSources={setSources}
     />;
  } else if (Source==='Q&A') {
    sourceComponent = <QASOurce
    setTotalCharacters={setTotalCharacters}
     totalCharacters={totalCharacters}
     setSources={setSources}/>;
  } else if (Source==='Website') {
    sourceComponent = <WebsiteSource />;
  }

  return (
    <>
      <div
        className={`fileupload mt-28 ${isMobileView ? "mobilefileupload" : ""}`}
      >
        <h2 className={`text-3xl font-bold p-4 text-center`}>Data Sources</h2>
        <div
          className={`flex justify-center items-center h-1 ${
            isMobileView ? "" : ""
          }`}
        ></div>
        <h4
          className={`${
            isMobileView ? "mb-1 mx-2" : "mb-6"
          } my-1 mx-1 text-sm text-center text-gray-500`}
        >
          Train Your Chatbot: Upload and Enhance its Knowledge and Skills with
          Our Convenient Upload Page.
        </h4>
        <div
          className={`${
            isMobileView ? " flex-col" : ""
          } flex flex-col w-screen  justify-center items-center mb-3`}
        >
          <div
            className={`flex justify-center w-full ${
              isMobileView ? " flex-col items-center " : ""
            }`}
          >
            <div
              className={`${
                isMobileView ? "w-full" : "w-1/6"
              } flex flex-col items-center mx-2 `}
            >
              <nav
                className={`bg-transparent  w-full flex justify-center items-center flex-col `}
              >
                <ul className={`p-4 ${isMobileView ? "flex" : "space-y-4"} `}>
                  <li className="flex items-center rounded-md hover:bg-gray-100 p-1">
                    <button onClick={handleFileSource}>
                    <i className="fa-regular fa-file fa-lg opacity-40 mx-3"></i>
                      File
                    </button>
                  </li>
                  <li className="flex items-center rounded-md hover:bg-gray-100 p-1">
                    <button onClick={handleTextSource}>
                    <i className="fa-regular fa-file-word fa-lg opacity-40 mx-3"></i>
                      Text
                    </button>
                  </li>
                  <li className="flex items-center rounded-md hover:bg-gray-100 p-1">
                    <button onClick={handleWebsiteSource}>
                    <i className="fa-solid fa-earth-asia fa-lg opacity-40 mx-3"></i>
                      Website
                    </button>
                  </li>
                  <li className="flex items-center rounded-md hover:bg-gray-100 p-1">
                    <button onClick={handleQuestionSource} >
                    <i className="fa-regular fa-comments fa-lg opacity-40 mx-3"></i>
                      Q&A
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="w-1/2">
            <div className="border border-gray-300 shadow-lg mx-2 w-11/12 relative flex flex-col items-center">
              <div className="w-full">
                <h2 className="text-xl font-semibold p-2">{Source}</h2>
                <div className="bg-gray-300 w-full h-px "></div>
              </div>

              <div className="w-full">
              {sourceComponent}
              </div>
            </div>
            </div>
            <div className="w-1/5">
              <TotalChars
                isMobileView={isMobileView}
                Sources={Sources}
                totalCharacters={totalCharacters}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

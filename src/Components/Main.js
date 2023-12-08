import React, { useEffect, useState } from "react";
import TotalChars from "./FileUpload/TotalChars";
import FileSource from "./FileUpload/FileSource";
import TextSource from "./FileUpload/TextSource";
import WebsiteSource from "./FileUpload/WebsiteSource";
import QASource from "./FileUpload/QASource";

const Main = ({ isMobileView,totalCharacters,setTotalCharacters }) => {
  const [Source, setSource] = useState('File');
 const [FileList,setFileList]=useState([])
 const [Text,setText]=useState('')
 const [qaList,setqaList]=useState([])
   const [filechars, setfilechars] = useState(0)
   const [textchars, settextchars] = useState(0)
   const [qaChars, setqaChars] = useState(0)
  const [Sources, setSources] = useState({
    filelist: [],
    qalist: [],
    fileChars: 0,
    qachars: 0,
    textChars: ''
  });
  
  useEffect(() => {
    setSources((prevSources) => ({
      ...prevSources,
      filelist: FileList.length,
      qalist: qaList.length,
      fileChars: filechars,
      qachars: qaChars,
      textChars: textchars
    }));
  }, [FileList, qaList, filechars, qaChars, textchars]);
  
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
  useEffect(()=>{
    setTotalCharacters(filechars+textchars+qaChars)
  },[filechars,setTotalCharacters,textchars,qaChars])
  let sourceComponent;

  if (Source==='File') {
    sourceComponent = (
      <FileSource
        isMobileView={isMobileView}
        FileList={FileList}
        setFileList={setFileList}
        setfilechars={setfilechars}
      />
    );
  } else if (Source==='Text') {
    sourceComponent = <TextSource 
    Text={Text}
    setText={setText}
    settextchars={settextchars}
     />;
  } else if (Source==='Q&A') {
    sourceComponent = <QASource
    qaList={qaList}
    setqaList={setqaList}
    setqaChars={setqaChars}
     />;
  } else if (Source==='Website') {
    sourceComponent = <WebsiteSource />;
  }

  return (
    <>
      <div
        className={`fileupload mt-28 ${isMobileView ? "mobilefileupload" : ""}`}
      >
        <h2 className={`text-3xl font-bold my-1 text-center`}>Data Sources</h2>
        <div
          className={`flex justify-center items-center h-1 ${
            isMobileView ? "" : ""
          }`}
        ></div>
        <h4
          className={`${
            isMobileView ? "mb-1 mx-2" : "mb-6"
          } mx-1 text-sm text-center text-gray-500`}
        >
          Train Your Chatbot: Upload and Enhance its Knowledge and Skills with
          Our Convenient Upload Page.
        </h4>
        <div
          className={`${
            isMobileView ? " flex-col" : ""
          } flex flex-col w-screen  justify-center items-center my-8`}
        >
          <div
            className={`flex justify-center w-11/12 ${
              isMobileView ? " flex-col items-center " : ""
            }`}
          >
            <div
              className={`${
                isMobileView ? "w-full" : "w-1/6"
              } flex flex-col mx-2 `}
            >
              <nav
                className={`bg-transparent w-5/6 flex  flex-col mx-4`}
              >
                <ul className={`mx-5 ${isMobileView ? "flex" : "space-y-1"} `}>
                  <li className={`flex rounded-md ${Source==='File' ? 'bg-gray-100 text-violet-600 ' : ''} hover:bg-gray-100 hover:text-violet-600 p-2`}>
                    <button onClick={handleFileSource} className="w-full flex items-center">
                    <i className="fa-regular fa-file fa-lg opacity-60 mx-3"></i>
                      File
                    </button>
                  </li>
                  <li className={`flex rounded-md ${Source==='Text' ? 'bg-gray-100 text-violet-600' : ''} hover:bg-gray-100 p-2 hover:text-violet-600`}>
                    <button onClick={handleTextSource} className="w-full flex items-center">
                    <i className="fa-solid fa-align-left fa-lg opacity-60 mx-3"></i>
                      Text
                    </button>
                  </li>
                  <li className={`flex rounded-md ${Source==='Website' ? 'bg-gray-100 text-violet-600' : ''} hover:bg-gray-100 hover:text-violet-600 p-2`}>
                    <button onClick={handleWebsiteSource} className="w-full flex items-center">
                    <i className="fa-solid fa-earth-asia fa-lg opacity-60 mx-3"></i>
                      Website
                    </button>
                  </li>
                  <li className={`flex rounded-md ${Source==='Q&A' ? 'bg-gray-100 text-violet-600' : ''} hover:bg-gray-100 p-2 hover:text-violet-600`}>
                    <button onClick={handleQuestionSource} className="w-full flex items-center">
                    <i className="fa-regular fa-comments fa-lg opacity-60 mx-3"></i>
                      Q&A
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="w-1/2">
            <div className="border border-gray-300 shadow-lg mx-4 w-11/12 relative flex flex-col items-center">
              <div className="w-full">
                <h2 className="text-xl font-semibold p-2">{Source}</h2>
                <div className="bg-gray-300 w-full h-px "></div>
              </div>

              <div className="w-full">
              {sourceComponent}
              </div>
            </div>
            </div>
            <div className="w-1/4">
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

import React, { useEffect, useState } from "react";
import TotalChars from "./FileUpload/TotalChars";
import FileSource from "./FileUpload/FileSource";
import TextSource from "./FileUpload/TextSource";
import WebsiteSource from "./FileUpload/WebsiteSource";
import QASource from "./FileUpload/QASource";

const Main = ({totalCharacters,setTotalCharacters }) => {
  const [Source, setSource] = useState('Files');
 const [FileList,setFileList]=useState([])
 const [Text,setText]=useState('')
 const [qaList,setqaList]=useState([])
 const [LinkList,setLinkList]=useState([])
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
    setSource('Files')
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

  if (Source==='Files') {
    sourceComponent = (
      <FileSource
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
    sourceComponent = <WebsiteSource LinkList={LinkList} setLinkList={setLinkList}/>;
  }

  return (
    <>
      <div
        className={`fileupload mt-9`}
      >
        <h2 className={`text-3xl font-bold my-1 text-center`}>Data Sources</h2>
        <div
          className={`flex justify-center items-center h-1`}
        ></div>
        <h4
          className={`mb-6 mx-1 text-sm text-center text-gray-500`}
        >
          Train Your Chatbot: Upload and Enhance its Knowledge and Skills with
          Our Convenient Upload Page.
        </h4>
        <div
          className={`flex flex-col w-screen  justify-center items-center lg:my-8`}
        >
          <div
            className={`flex justify-center flex-col lg:flex-row w-11/12 `}
          >
            <div
              className={`lg:w-1/6 flex lg:flex-col mx-2 justify-center items-center lg:justify-start overflow-y-auto`}
            >
              <nav
                className={`bg-transparent lg:w-5/6    lg:text-base`}
              >
                <ul className={`lg:mx-3 flex flex-1 lg:flex-col`}>
                  <li>
                    <ul className="lg:space-y-2 flex lg:flex-col">
                  <li className={`flex rounded-md ${Source==='Files' ? 'bg-gray-50 text-violet-600 ' : ''} hover:bg-gray-50 hover:text-violet-600 py-2 text-gray-700`}>
                    <button onClick={handleFileSource} className="w-full flex items-center">
                    <i className="fa-regular fa-file fa-lg opacity-60 mx-3"></i>
                     <span className="text-sm font-semibold mr-3">Files</span> 
                    </button>
                  </li>
                  <li className={`flex rounded-md ${Source==='Text' ? 'bg-gray-50 text-violet-600' : ''} hover:bg-gray-50 py-2 hover:text-violet-600 text-gray-700`}>
                    <button onClick={handleTextSource} className="w-full flex items-center">
                    <i className="fa-solid fa-align-left fa-lg opacity-60 mx-3"></i>
                    <span className="text-sm font-semibold mr-3">Text</span> 
                    </button>
                  </li>
                  <li className={`flex rounded-md ${Source==='Website' ? 'bg-gray-50 text-violet-600' : ''} hover:bg-gray-50 hover:text-violet-600 py-2 text-gray-700`}>
                    <button onClick={handleWebsiteSource} className="w-full flex items-center">
                    <i className="fa-solid fa-earth-asia fa-lg opacity-60 mx-3"></i>
                    <span className="text-sm font-semibold mr-3">Website</span>
                    </button>
                  </li>
                  <li className={`flex rounded-md ${Source==='Q&A' ? 'bg-gray-50 text-violet-600' : ''} hover:bg-gray-50 py-2 hover:text-violet-600 text-gray-700`}>
                    <button onClick={handleQuestionSource} className="w-full flex items-center">
                    <i className="fa-regular fa-comments opacity-60 fa-lg mx-3"></i>
                    <span className="text-sm font-semibold mr-3">Q&A</span>
                    </button>
                  </li>
                  </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="w-full my-5 lg:my-0 lg:w-1/2 flex items-center justify-center">
            <div className="border border-gray-200 mx-4 w-full relative flex flex-col items-center">
              <div className="w-full">
                <h2 className="text-xl font-semibold p-3">{Source}</h2>
                <div className="bg-gray-200 w-full h-px "></div>
              </div>

              <div className="w-full">
              {sourceComponent}
              </div>
            </div>
            </div>
            <div className="w-full lg:w-1/4 lg:mx-4 flex justify-center lg:block">
              <TotalChars
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

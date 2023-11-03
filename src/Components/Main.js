import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadpng from "./uploadpng2.png";
import filepng from "./filepng.png";
import { Link } from "react-router-dom";
import './fileupload.css'


const Main = ({ isMobileView }) => {
  const [files, setFiles] = useState([]);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [completedUploads, setCompletedUploads] = useState([]);

  useEffect(() => {
    const charCount = files.reduce((total, file) => {
      const trimmedText = file.text ? file.text.split(/\s+/) : "";
      const text = trimmedText.join(" ");
      return total + text.length;
    }, 0);

    setTotalCharacters(charCount);
  }, [files]);

  const handleFileChange = (acceptedFiles) => {
    const newFiles = acceptedFiles;

    newFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const text = reader.result;
        setCompletedUploads((prevCompletedUploads) => [
          ...prevCompletedUploads,
          file,
        ]);
        setFiles((prevFiles) => [...prevFiles, { file, progress: 100, text }]);
      };

      reader.onprogress = (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const percentComplete =
            (progressEvent.loaded / progressEvent.total) * 100;
          setFiles((prevFiles) => {
            const updatedFiles = prevFiles.map((f) =>
              f.file === file ? { ...f, progress: percentComplete } : f
            );
            return updatedFiles;
          });
        }
      };

      reader.readAsText(file);
    });
  };

  const removeFile = (fileToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.file !== fileToRemove));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
    accept: ".pdf, .doc, .docx, .txt",
  });

  return (
    <>
      <div className={`fileupload ${isMobileView ? 'mobilefileupload':''}`}>
        <h2 className={`text-4xl p-5 ${isMobileView ? "" : " mb-2"}`}>
          Upload Your File Here
        </h2>
        <div className={`flex justify-center items-center h-1 ${isMobileView ? "" : ""}`}>
        <div className="w-1/6 bg-gray-600 h-1/2 my-2 rounded-2xl opacity-70"></div>
        </div>
        <h4 className={`${isMobileView?'mb-1':'mb-8'} my-3 mx-1`}><span className="text-2xl">&#187;</span> Train Your Chatbot: Upload and Enhance its Knowledge and Skills with Our Convenient Upload Page.</h4>
        <div className={`${isMobileView ? "flex-col" : ""}flex w-screen`}>
          <div className={`${isMobileView ? "w-full" : "w-1/5 mt-16"}`}>
            <nav
              className={`bg-transparent  w-full flex justify-center items-center flex-col`}
            >
              <ul
                className={`p-4   ${isMobileView ? "flex" : "space-y-8"}`}
              >
                <li className="flex items-center text-xl hover:opacity-60 mx-2">
                  <i className="fa-regular fa-file  fa-lg"></i>
                  <Link className="ml-2" to="/">
                    File
                  </Link>
                </li>
                <li className="flex items-center text-xl hover:opacity-60 mx-2">
                  <i className="fa-regular fa-file-word  fa-lg"></i>
                  <Link className="ml-2" to="/">
                    Text
                  </Link>
                </li>
                <li className="flex items-center text-xl hover:opacity-60 mx-2">
                  <i className="fa-solid fa-earth-asia  fa-lg"></i>
                  <Link className="ml-2" to="/">
                    Website
                  </Link>
                </li>
                <li className="flex items-center text-xl hover:opacity-60 mx-2">
                  <i className="fa-regular fa-comments  fa-lg"></i>
                  <Link to="/" className="ml-2">
                    Q&A
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div
            className={`flex flex-col items-center  ${
              isMobileView ? "mx-5 w-6/7" : "ml-20 w-1/2"
            }`}
          >
            <div className="rounded-2xl border-2 border-opacity-40 border-gray-600 uploadbox p-4 bg-gradient-to-b from-gray-400 via-gray-300 to-gray-200  shadow-lg mx-10 w-full h-96 relative cursor-pointer" {...getRootProps()}>
              <div className="flex flex-col items-center justify-center mt-14">
                <div class="relative w-16 h-16 rounded-full">
                <div class="w-10 h-10 border-4 border-gray-400 rounded-full absolute inset-0 m-auto"></div>
                  <div class="border-dotted animate-ping2 border-2 border-cyan-600 rounded-full absolute inset-0 m-auto delay-100"></div>
                  <div class="border-dotted animate-ping border-2 border-cyan-600 rounded-full absolute inset-0 m-auto delay-300 "></div>

                  <img class="w-20 relative z-50" src={uploadpng} alt="" />
                </div>
                <h4 className=" mt-8 mb-16">
                  Drag and drop your file here to upload
                  <h6 className="text-sm opacity-70 my-2">
                    Supported file types: .pdf, .docs, .docx, .txt
                    (maxSize-15MB)
                  </h6>
                </h4>
              </div>
              <input
                {...getInputProps()}
                accept=".pdf, .doc, .docx, .txt"
                maxSize={15 * 1024 * 1024}
              />
              <label
                htmlFor="file-upload"
                className=" w-full bg-gradient-to-r from-blue-300 via-purple-500 to-blue-200 p-3  rounded-md cursor-pointer hover:opacity-80 font-semibold "
              >
                Select Files
              </label>
              <div className="border-animation"></div>
            </div>
            <div className="mt-4 mx-10 w-full">
              <h2 className="text-xl font-semibold mt-5">
                Uploaded Files{" "}
                <span className="mx-3 text-lg">
                  (Total Files: {files.length})
                </span>
              </h2>
              <div className="flex flex-col justify-center items-center mt-2">
                <ul className="mt-2 grid gap-4 grid-cols-5 ">
                  {files.map((file, index) => (
                    <li key={index} className="mb-2 mx-5">
                      <div className="flex flex-col items-center relative">
                        <button
                          onClick={() => removeFile(file.file)}
                          className="relative bottom-0 left-10 opacity-60 hover:opacity-80"
                        >
                          <i class="fa-solid fa-times"></i>
                        </button>
                        <a
                          href={URL.createObjectURL(file.file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer flex flex-col items-center hover:opacity-80"
                        >
                          <img className="w-9 mx-1" src={filepng} alt="" />
                          <span className="text-xs">{file.file.name}</span>
                          <span className="text-xs my-2">
                            {file.file.size / 1024} KB
                          </span>
                        </a>
                        {file.progress < 100 &&
                          !completedUploads.includes(file.file) && (
                            <div className="w-64 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full h-2 ml-2">
                              <div
                                className={`h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-${file.progress}`}
                              ></div>
                            </div>
                          )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            {files.length > 0 && (
              <div className={`mt-4 mx-10 flex flex-col justify-center items-center `}>
                <h2 className="text-xl font-semibold my-2">Total Characters</h2>
                <p>{totalCharacters} characters</p>
                <div>
                <button className="btn block mt-7 px-4 py-2 rounded-md bg-gradient-to-r from-blue-300 via-purple-500 to-blue-200 text-lg font-semibold hover:opacity-90 my-2">
                  Create Chatbot &#8230;
                </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

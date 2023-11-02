import React, { useEffect, useState } from "react";
import uploadpng from "./uploadpng2.png";
import filepng from "./filepng.png";
import { Link } from "react-router-dom";

const Main = ({ isMobileView }) => {
  const [files, setFiles] = useState([]);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [completedUploads, setCompletedUploads] = useState([]);

  // const handleFileChange = (e) => {
  //   const newFiles = Array.from(e.target.files);

  //   newFiles.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       const text = reader.result;
  //       const trimmedText = text.replace(/\s+/g, " ");
  //       const charCount = trimmedText.length;
  //       setTotalCharacters((prevTotalChars) => prevTotalChars + charCount);

  //       // Mark the upload as complete in the completedUploads state
  //       setCompletedUploads((prevCompletedUploads) => [
  //         ...prevCompletedUploads,
  //         file,
  //       ]);
  //     };
  //     reader.onprogress = (e) => {
  //       if (e.lengthComputable) {
  //         const percentComplete = (e.loaded / e.total) * 100;

  //         // Update the progress bar for this file
  //         setFiles((prevFiles) => {
  //           const updatedFiles = [...prevFiles];
  //           const fileIndex = updatedFiles.findIndex((f) => f.file === file);
  //           if (fileIndex !== -1) {
  //             updatedFiles[fileIndex].progress = percentComplete;
  //           }
  //           return updatedFiles;
  //         });
  //       }
  //     };

  //     reader.readAsText(file);

  //     // Add the file to the list of files with progress
  //     setFiles((prevFiles) => [...prevFiles, { file, progress: 0 }]);
  //   });
  // };

  // const removeFile = (fileToRemove) => {
  //   const removedFile = files.find((file) => file.file === fileToRemove);
  //   if (removedFile) {
  //     const charCount = removedFile.charCount || 0;
  //     // Subtract the character count from the totalCharacters state
  //     setTotalCharacters((prevTotalChars) => prevTotalChars - charCount);
  //   }

  //   // Remove the file from the files state
  //   setFiles((prevFiles) => prevFiles.filter((f) => f.file !== fileToRemove));
  // };

  
  useEffect(() => {
    // Recalculate the character count whenever files change
    // let newText = text.split(/\s+/);
    // setText(newText.join(" "));
    const charCount = files.reduce((total, file) => {
      const trimmedText = file.text ? file.text.split(/\s+/) : "";
      const text=trimmedText.join(" ");
      return total + text.length;
    }, 0);

    setTotalCharacters(charCount);
  }, [files]);
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    const processFile = (file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const text = reader.result;
        // Mark the upload as complete in the completedUploads state
        setCompletedUploads((prevCompletedUploads) => [
          ...prevCompletedUploads,
          file,
        ]);
        setFiles((prevFiles) => [
          ...prevFiles,
          { file, progress: 100, text },
        ]);
      };

      reader.onprogress = (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
          // Update the progress bar for this file
          setFiles((prevFiles) => {
            const updatedFiles = prevFiles.map((f) =>
              f.file === file ? { ...f, progress: percentComplete } : f
            );
            return updatedFiles;
          });
        }
      };

      reader.readAsText(file);
    };

    // Upload files one at a time
    const uploadNextFile = (remainingFiles) => {
      if (remainingFiles.length > 0) {
        const nextFile = remainingFiles[0];
        processFile(nextFile);
        setTimeout(() => {
          // Upload the next file after a delay (adjust as needed)
          uploadNextFile(remainingFiles.slice(1));
        }, 1000); // Adjust the delay as needed
      }
    };

    // Start uploading files one at a time
    uploadNextFile(newFiles);
  };

  const removeFile = (fileToRemove) => {
    // Remove the file from the files state
    setFiles((prevFiles) => prevFiles.filter((f) => f.file !== fileToRemove));
  };

  return (
    <>
      <div className="fileupload">
        <h2 className="text-4xl mt-5 mb-16 ml-44">Upload Your File Here</h2>
        <div className="flex w-screen">
          <div className="w-1/5 mt-16">
            <nav
              className={`bg-gray-200 border-r border-gray-300  w-full flex flex-col justify-center items-center`}
            >
              <ul className="p-4 space-y-8 my-5">
                <li className="flex items-center text-lg hover:opacity-60">
                  <i className="fa-regular fa-file text-gray-500 fa-lg"></i>
                  <Link className="ml-2" to="/">
                    File
                  </Link>
                </li>
                <li className="flex items-center text-lg hover:opacity-60">
                  <i className="fa-regular fa-file-word text-gray-500 fa-lg"></i>
                  <Link className="ml-2" to="/">
                    Text
                  </Link>
                </li>
                <li className="flex items-center text-lg hover:opacity-60">
                  <i className="fa-solid fa-earth-asia text-gray-500 fa-lg"></i>
                  <Link className="ml-2" to="/">
                    Website
                  </Link>
                </li>
                <li className="flex items-center text-lg hover:opacity-60">
                  <i className="fa-regular fa-comments text-gray-500 fa-lg"></i>
                  <Link to="/" className="ml-2">
                    Q&A
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex flex-col items-center w-1/2 ml-36">
            <div className="border border-gray-400 uploadbox p-4 bg-white rounded-lg shadow-lg mx-10 w-full h-96">
              <div className="flex flex-col items-center justify-center mt-14">
                <img className="w-20" src={uploadpng} alt="" />
                <h4 className=" mt-5 mb-16">
                  Drag and drop your file here to upload
                  <h6 className="text-sm opacity-70 my-2">Supported file types: .pdf, .docs, .docx, .txt (maxSize-15MB)</h6>
                </h4>
                
              </div>
              <input
                type="file"
                multiple
                accept=".pdf, .doc, .docx, .txt"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                maxSize={15 * 1024 * 1024}
              />
              <label
                htmlFor="file-upload"
                className=" w-full bg-gradient-to-r from-blue-300 via-purple-500 to-blue-200 p-3  rounded-md cursor-pointer hover:opacity-80 font-semibold "
              >
                Select Files
              </label>
            </div>
            <div className="mt-4 mx-10 w-full">
              <h2 className="text-xl font-semibold mt-5">Uploaded Files <span className="mx-3 text-lg">(Total Files: {files.length})</span></h2>
              <div className="flex flex-col justify-center items-center mt-10">
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
              <div className="mt-4 mx-10">
                <h2 className="text-xl font-semibold my-2">Total Characters</h2>
                <p>{totalCharacters} characters</p>
                <button className="btn block mt-7 px-4 py-2 rounded-md bg-gradient-to-r from-blue-300 via-purple-500 to-blue-200 text-lg font-semibold hover:opacity-90">
                  Create Chatbot
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

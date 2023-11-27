import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadpng from "./uploadpng2.png";
import filepng from "./filepng.png";
import { Link } from "react-router-dom";
// import "./fileupload.css";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Main = ({ isMobileView }) => {
  const [files, setFiles] = useState([]);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [completedUploads, setCompletedUploads] = useState([]);

  // Function to handle text extraction for PDF files
  const extractPdfText = async (file) => {
    const loadingTask = pdfjs.getDocument(URL.createObjectURL(file));
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    let text = "";

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      for (const item of content.items) {
        text += item.str + " ";
      }
    }

    return text;
  };

  const extractTextFromTextFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const text = event.target.result;
        resolve(text);
      };

      reader.readAsText(file);
    });
  };

  useEffect(() => {
    const charCount = files.reduce((total, file) => {
      let text = "";
      if (file.type === "application/pdf") {
        text = extractPdfText(file);
      } else if (file.text) {
        const trimmedText = file.text.split(/\s+/);
        text = trimmedText.join(" ");
      }
      return total + text.length;
    }, 0);

    setTotalCharacters(charCount);
  }, [files]);
  const calculateCumulativeCharCount = () => {
    const charCounts = files.map((file) => {
      if (file.type === "application/pdf" || file.type === "text/plain") {
        return file.text.length;
      }
      return 0;
    });

    const totalCharCount = charCounts.reduce(
      (total, count) => total + count,
      0
    );
    setTotalCharacters(totalCharCount);
  };
  const handleFileChange = async (acceptedFiles) => {
    const newFiles = acceptedFiles;

    for (const file of newFiles) {
      setCompletedUploads((prevCompletedUploads) => [
        ...prevCompletedUploads,
        file,
      ]);

      let text = "";
      if (file.type === "application/pdf") {
        text = await extractPdfText(file);
      } else if (file.type === "text/plain") {
        text = await extractTextFromTextFile(file);
      }

      setFiles((prevFiles) => [...prevFiles, { file, progress: 100, text }]);
    }
    // Calculate the cumulative character count after processing all files
    calculateCumulativeCharCount();
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
      <div
        className={`fileupload mt-16 ${isMobileView ? "mobilefileupload" : ""}`}
      >
        <h2 className={`text-2xl font-bold p-4`}>Data Sources</h2>
        <div
          className={`flex justify-center items-center h-1 ${
            isMobileView ? "" : ""
          }`}
        ></div>
        <h4 className={`${isMobileView ? "mb-1" : "mb-6"} my-1 mx-1 text-sm`}>
          Train Your Chatbot: Upload and Enhance its Knowledge and Skills with Our Convenient Upload Page.
        </h4>
        <div
          className={`${
            isMobileView ? "flex-col" : ""
          }flex flex-col w-screen  justify-center items-center`}
        >
          <div className="flex justify-center w-full">
            <div className={`${isMobileView ? "w-full" : "w-1/5"} flex flex-col items-center mx-2 `}>
              <nav
                className={`bg-transparent  w-full flex justify-center items-center flex-col`}
              >
                <ul className={`p-4 text-lg ${isMobileView ? "flex" : "space-y-4"}`}>
                  <li className="flex items-center hover:opacity-60 mx-2">
                    <i className="fa-regular fa-file"></i>
                    <Link className="ml-2" to="/">
                      File
                    </Link>
                  </li>
                  <li className="flex items-center hover:opacity-60 mx-2">
                    <i className="fa-regular fa-file-word"></i>
                    <Link className="ml-2" to="/">
                      Text
                    </Link>
                  </li>
                  <li className="flex items-center hover:opacity-60 mx-2">
                    <i className="fa-solid fa-earth-asia"></i>
                    <Link className="ml-2" to="/">
                      Website
                    </Link>
                  </li>
                  <li className="flex items-center hover:opacity-60 mx-2">
                    <i className="fa-regular fa-comments"></i>
                    <Link to="/" className="ml-2">
                      Q&A
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div
              className={`flex flex-col items-center  ${
                isMobileView ? "mx-5 w-6/7" : " w-1/2"
              }`}
            >
              <div
                className="rounded-2xl border-2 border-opacity-40 border-gray-500 uploadbox p-4 bg-gradient-to-b from-gray-100 via-white to-gray-100  shadow-lg mx-10 w-full h-96 relative cursor-pointer"
                {...getRootProps()}
              >
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
            </div>

            <div className={`w-1/5 flex flex-col items-center ${files.length>0?'border border-gray-400 border-opacity-40 rounded-3xl':''} mx-2 `}>
              {files.length > 0 && (
                <div
                  className={`mt-4 mx-10 flex flex-col justify-center items-center `}
                >
                  <h2 className="text-lg font-semibold my-2">
                    Total Characters <span className=" text-sm">
                (Total Files: {files.length})
              </span>
                  </h2>
                  <p className="text-sm">{totalCharacters} characters <span className="opacity-60">/10,00,000 limit</span></p>
                  <div className="w-full">
                    <button className="btn block mt-4 px-4 py-2 rounded-md bg-gradient-to-r from-blue-300 via-purple-500 to-blue-200  font-semibold hover:opacity-90 my-2 w-full text-lg">
                      Create Chatbot &#8230;
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 w-11/12">
            <h2 className="text-xl font-semibold mt-5">
              Uploaded Files{" "}
            </h2>
            {files.length>0 ? ( 
            <div className="flex flex-col justify-center items-center mt-2">
              <ul className="mt-2 grid gap-4 grid-cols-3">
                {files.map((file, index) => (
                  <li key={index} className="mb-2 mx-5">
                    <div className="flex flex-col items-center relative">
                      <button
                        onClick={() => removeFile(file.file)}
                        className="relative bottom-0 left-40 opacity-60 hover:opacity-80"
                      >
                        <i class="fa-solid fa-times"></i>
                      </button>
                      <a
                        href={URL.createObjectURL(file.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer flex items-center hover:opacity-80"
                      >
                        <img className="w-6 mx-1" src={filepng} alt="" />
                        <span className="text-xs break-words w-11/12 text-center">
                          {file.file.name} {file.file.size / 1024} KB
                        </span>
                        <span className="text-xs my-2"></span>
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
          ):(<h2 className="my-3 opacity-70">No Files selected to Display</h2>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

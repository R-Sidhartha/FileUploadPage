import React, { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { useDropzone } from "react-dropzone";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileSource = ({setFileList,FileList,setfilechars}) => {
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
    const calculateCharCount = async () => {
      const charCount = await FileList.reduce(async (totalPromise, file) => {
        const total = await totalPromise;

        let text = "";
        if (file.type === "application/pdf") {
          text = await extractPdfText(file);
        } else if (file.text) {
          const trimmedText = file.text.split(/\s+/);
          text = trimmedText.join(" ");
        }

        return total + text.length;
      }, Promise.resolve(0));
      setfilechars(charCount);
    };

    calculateCharCount();
  }, [FileList, setfilechars]);

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

      setFileList((prevFiles) => [...prevFiles, { file, progress: 100, text }]);
    }
  };

  const removeFile = (fileToRemove) => {
    setFileList((prevFiles) => prevFiles.filter((f) => f.file !== fileToRemove));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
    accept: ".pdf, .doc, .docx, .txt",
  });
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`flex flex-col items-center w-11/12`}
      >
        <div className="w-full">
          <div
            className="flex flex-col items-center justify-center mt-6 border border-gray-300 w-full p-6 cursor-pointer"
            {...getRootProps()}
          >
            <div className="relative w-16 h-16 rounded-full my-2 flex justify-center items-center">
              <div className="border-dotted animate-ping2 border border-cyan-600 rounded-full absolute inset-2 m-auto delay-100"></div>
              <div className="border-dotted animate-ping border border-cyan-600 rounded-full absolute inset-4 m-auto delay-300 "></div>

              <i className="fa-solid fa-arrow-up-from-bracket fa-lg opacity-70"></i>
            </div>
            <h4 className=" mt-2 text-center text-sm text-gray-600">
              Drag & drop your files here, or click to upload
              <p className="text-xs opacity-70 my-2 text-center">
                Supported file types: .pdf, .docs, .docx, .txt
              </p>
            </h4>
          </div>
          <input
            {...getInputProps()}
            accept=".pdf, .doc, .docx, .txt"
          />
          <div className="mt-2">
            <div className="flex items-center mt-8">
              <span className="w-1/2 mr-2 h-px bg-gray-300 "></span>
              <p className=" text-sm font-semibold w-1/5 opacity-70">
                Uploaded Files
              </p>
              <span className=" w-1/2 ml-2 h-px bg-gray-300 "></span>
            </div>
            {FileList.length > 0 ? (
              <div className="flex flex-col justify-center items-center mt-2">
                <ul className={"w-full"}>
                  {FileList.map((file, index) => (
                    <li key={index} className="mb-2 ">
                      <div className="flex flex-col items-center ">
                        <div className="flex w-full justify-between">
                          <a
                            href={URL.createObjectURL(file.file)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`cursor-pointer flex items-center hover:opacity-70 `}
                          >
                            <i className="fa-regular fa-file opacity-60"></i>
                            <span
                              className={`text-xs break-words w-11/12 mx-2`}
                            >
                              {file.file.name} {file.file.size / 1024} KB
                            </span>
                          </a>
                          <span className="text-xs my-2">
                            {" "}
                            <button className="ml-8 hover:opacity-60 opacity-80">
                              <i
                                onClick={() => removeFile(file.file)}
                                className="fa-solid fa-trash text-black "
                              ></i>
                            </button>
                          </span>
                        </div>
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
            ) : (
              <h2 className="my-3 opacity-70 text-center text-xs mr-2">
                No Files Uploaded
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileSource;

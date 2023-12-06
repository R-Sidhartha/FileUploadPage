import React, { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { useDropzone } from "react-dropzone";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileSource = ({ setTotalCharacters, isMobileView }) => {
  const [completedUploads, setCompletedUploads] = useState([]);
  const [files, setFiles] = useState([]);

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
  
    // Use functional update to avoid potential stale closure issues
    setTotalCharacters(prevTotalCharacters => prevTotalCharacters + charCount);
     // eslint-disable-next-line
  }, [files, setTotalCharacters]);
  
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
    <div className="flex flex-col justify-center items-center">
      <div
        className={`flex flex-col items-center  ${
          isMobileView ? "mx-5 w-6/7" : " w-11/12"
        }`}
      >
        <div className="w-full">
          <div
            className="flex flex-col items-center justify-center mt-6 border border-gray-300 w-full p-6 cursor-pointer"
            {...getRootProps()}
          >
            <div class="relative w-16 h-16 rounded-full my-2 flex justify-center items-center">
              <div class="border-dotted animate-ping2 border border-cyan-600 rounded-full absolute inset-2 m-auto delay-100"></div>
              <div class="border-dotted animate-ping border border-cyan-600 rounded-full absolute inset-4 m-auto delay-300 "></div>

              <i class="fa-solid fa-arrow-up-from-bracket fa-lg opacity-70"></i>
            </div>
            <h4 className=" mt-2 text-center text-sm text-gray-600">
              Drag & drop your files here, or click to upload
              <h6 className="text-xs opacity-70 my-2 text-center">
                Supported file types: .pdf, .docs, .docx, .txt (maxSize-15MB)
              </h6>
            </h4>
          </div>
          <input
            {...getInputProps()}
            accept=".pdf, .doc, .docx, .txt"
            maxSize={15 * 1024 * 1024}
          />
          <div className="mt-2">
          <div className="flex items-center mt-8">
                  <span className="w-1/2 mr-2 h-px bg-gray-300 "></span>
                  <p className=" text-sm font-semibold w-1/5 opacity-70">Uploaded Files</p>
                  <span className=" w-1/2 ml-2 h-px bg-gray-300 "></span>
                </div>
            {files.length > 0 ? (
              <div className="flex flex-col justify-center items-center mt-2">
                <ul
                  className={'w-full'}
                >
                  {files.map((file, index) => (
                    <li key={index} className="mb-2 ">
                      <div className="flex flex-col items-center ">
                        <div className="flex w-full justify-between">
                          <a
                            href={URL.createObjectURL(file.file)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`cursor-pointer flex items-center hover:opacity-70 `}
                          >
                            <i class="fa-regular fa-file opacity-60"></i>
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
              <h2 className="my-3 opacity-70 text-center text-xs mr-2">No Files Uploaded</h2>
            )}
          </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default FileSource;

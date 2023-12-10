import React, { useState } from 'react';

const WebsiteSource = ({ LinkList, setLinkList }) => {
  const [crawlUrl, setCrawlUrl] = useState('');
  const [submitUrl, setSubmitUrl] = useState('');
  const [includeLink, setIncludeLink] = useState('');
  const [isValidCrawlUrl, setIsValidCrawlUrl] = useState(true);
  const [isValidSubmitUrl, setIsValidSubmitUrl] = useState(true);
  const [isValidIncludeLink, setIsValidIncludeLink] = useState(true);

  const handleUrlChange = (newUrl, setUrl, setIsValidUrl) => {
    setUrl(newUrl);

    // Regular expression for basic URL validation
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    // Check if the URL is valid (or empty)
    setIsValidUrl(newUrl === '' || urlPattern.test(newUrl));
  };

  const handleFetchLinks = () => {
    // write the logic for fetching links here
  };

  const handleAddLink = () => {
    if (isValidIncludeLink) {
      const newLink = { url: includeLink };
      setLinkList((prevLinks) => [...prevLinks, newLink]);
      setIncludeLink('');
    }
  };

  const handleRemoveLink = (index) => {
    setLinkList((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };

  return (
    <div className="my-5 mx-5 ">
      {/* Crawl Section */}
      <div>
        <label htmlFor="CrawlUrl" className="text-gray-600 text-sm">
          Crawl
        </label>
        <div className="flex w-full my-2">
          <input
            type="text"
            name="crawlUrl"
            value={crawlUrl}
            onChange={(e) => handleUrlChange(e.target.value, setCrawlUrl, setIsValidCrawlUrl)}
            placeholder="https://www.example.com"
            className={`rounded-md p-2 w-4/5 border focus:outline-none ${
              isValidCrawlUrl
                ? 'border-gray-200 focus:border-violet-400 focus:border-2'
                : 'border-red-500 '
            } text-sm shadow-md`}
          />
          <button
            onClick={handleFetchLinks}
            className="bg-black text-white rounded-md mx-2 w-1/4 md:w-1/6 text-xs sm:text-sm p-1"
          >
            Fetch Links
          </button>
        </div>
        {!isValidCrawlUrl && crawlUrl !== '' && (
          <p className="text-red-400 flex justify-start w-4/5">Invalid Url</p>
        )}
        <p className="my-5 text-gray-500 text-xs sm:text-sm">
          This will crawl all the links starting with the URL (not including files on the website).
        </p>
      </div>
      <div className="flex items-center justify-center mt-6 mx-2">
        <span className="w-1/2 mr-2 h-px bg-gray-200 "></span>
        <p className=" opacity-70 text-gray-800">OR</p>
        <span className=" w-1/2 ml-2 h-px bg-gray-200 "></span>
      </div>
      {/* Submit Sitemap Section */}
      <div className="my-3">
        <label htmlFor="SubmitUrl" className="text-gray-600 text-sm">
          Submit Sitemap
        </label>
        <div className="flex w-full my-2">
          <input
            type="text"
            name="submitUrl"
            value={submitUrl}
            onChange={(e) => handleUrlChange(e.target.value, setSubmitUrl, setIsValidSubmitUrl)}
            placeholder="https://www.example.com/sitemap.xml"
            className={`rounded-md p-2 w-4/5 border focus:outline-none ${
              isValidSubmitUrl
                ? 'border-gray-200 focus:border-violet-400 focus:border-2'
                : 'border-red-500 '
            } text-sm shadow-md`}
          />
          <button
            onClick={handleFetchLinks}
            className="bg-black text-white rounded-md mx-2 w-1/4 md:w-1/6 text-xs sm:text-sm p-1"
          >
            Fetch Links
          </button>
        </div>
        {!isValidSubmitUrl && submitUrl !== '' && (
          <p className="text-red-400 flex justify-start w-4/5">Invalid Url</p>
        )}
      </div>
      <div className="flex items-center justify-center mt-6 mx-2">
        <span className="w-1/4 sm:w-1/3 md:w-1/2  h-px bg-gray-200 "></span>
        <p className=" opacity-70 w-1/3 sm:w-1/4 md:w-1/3 lg:w-1/4 flex justify-center text-gray-800 text-sm sm:text-base">Include Links</p>
        <span className="w-1/4 sm:w-1/3 md:w-1/2  h-px bg-gray-200 "></span>
      </div>
      {/* Include Links Section */}
      <div>
        <div>
          <div className="flex w-full mt-6">
            <input
              type="text"
              name="includeLink"
              value={includeLink}
              placeholder='https://www.example.com'
              onChange={(e) =>
                handleUrlChange(e.target.value, setIncludeLink, setIsValidIncludeLink)
              }
              className={`rounded-md py-1.5 px-2 w-full border focus:outline-none ${
                isValidIncludeLink
                  ? 'border-gray-200 focus:border-violet-600 focus:border-2'
                  : 'border-red-500 '
              } text-sm`}
            />
          <button
            className={`bg-gray-200 rounded-md px-2 py-0.5 text-sm mx-2`}
            onClick={handleAddLink}
            disabled={!isValidIncludeLink || !includeLink}
          >
            Add
          </button>
          </div>
          {!isValidIncludeLink && includeLink !== '' && (
          <p className="text-red-400 flex justify-start w-4/5 text-sm">Invalid Url</p>
        )}
        </div>
      </div>
      {/* Display Links Section */}
      <div className='my-4'>
        {LinkList.map((link, index) => (
          <div key={index} className="flex w-full mt-2">
            <input
              type="text"
              name={`link-${index}`}
              value={link.url}
              readOnly
              className={`rounded-md bg-gray-100 py-1.5 px-2 w-full border focus:outline-none ${
                isValidIncludeLink
                  ? 'border-gray-200 focus:border-violet-600'
                  : 'border-red-500 '
              } text-sm`}
            />
            <button
            className={`text-red-400 px-2 py-0.5 text-sm mx-3.5 hover:opacity-70`}
            onClick={() => handleRemoveLink(index)}
            disabled={!isValidIncludeLink}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebsiteSource;

import React from 'react'

const WebsiteSource = () => {
  return (
    <div>
      <div className='flex justify-center items-center my-5 mx-5'>
        <label htmlFor="Url" className='mx-2'>
            Crawl
        </label>
        <input type="Url" name="url" placeholder='https://www.example.com' className='rounded-md p-2 w-3/4 border border-gray-300 text-sm' >

        </input>
        <button className='bg-black text-white p-2 rounded-md mx-2'>
            Fetch Links
        </button>
      </div>
    </div>
  )
}

export default WebsiteSource

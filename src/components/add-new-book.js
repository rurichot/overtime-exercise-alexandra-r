import { useCallback, useState } from 'react'

export default function AddNewBook({ onChange, addNewBookEvent, onImageChange }) {

    const [imageURL, setImageURL] = useState("");
    const handleChange = useCallback(e => {
        onChange(e);
    }, [onChange]);

    const addNewBook = useCallback(e => {
        addNewBookEvent(e);
    }, [addNewBookEvent]);

    const handleImageChange = useCallback(e => {
        setImageURL(e.target.files[0].name);
        onImageChange(e);
    }, [onImageChange]);

    return (
        <div className='border border-white'>
            {/* Add New Book */}
            <div className='grid grid-cols-3 p-6 gap-6'>
                <div className='text-center h-full bg-gray-700 flex content-around flex-wrap'>
                    <div className="block w-full margin-auto ">
                        <input id="fileUpload" name="bookCoverImage" type="file" accept="image/*" onChange={handleImageChange} hidden />
                        <label htmlFor="fileUpload" className='text-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-fit" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </label>
                    </div>
                    <div class="p-2 text-center block w-full">
                        {imageURL}
                        <label className="block align-baseline text-sm">Add Cover Image</label>
                    </div>
                </div>
                <div className='text-left col-span-2'>
                    <div className='my-5'>
                        <label className="block text-gray-700 text-sm font-bold mb-2 uppercase" for="bookTitle">
                            Book Title
                        </label>
                        <input id="bookTitle" type="text" placeholder="Title" name="bookTitle" onChange={handleChange}
                            className="text-base appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className='my-5'>
                        <label className="block text-gray-700 text-sm font-bold mb-2 uppercase" for="bookAuthor">
                            Author
                        </label>
                        <input id="bookAuthor" type="text" placeholder="Author" name="bookAuthor" onChange={handleChange}
                            className="text-base appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className='my-5'>
                        <label className="block text-gray-700 text-sm font-bold mb-2 uppercase" for="bookISBN">
                            ISBN
                        </label>
                        <input name="bookISBN" className='text-black border rounded' onChange={handleChange} />
                    </div>
                    <div>
                    <button className='m-auto' onClick={addNewBook}>Add New Book</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

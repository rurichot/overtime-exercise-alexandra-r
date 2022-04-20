import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react'

import type { Book } from './render-library'

interface BookProps {
    onChange: (value: ChangeEvent<HTMLElement>) => void;
    addNewBookEvent: (value: React.MouseEvent<Element>) => void;
    onImageChange: (value: {
        target: {
            result: React.SetStateAction<string>;
        };
    }) => void;
}

export default function AddNewBook({ onChange, addNewBookEvent, onImageChange }: BookProps): ReactElement<Book> {

    const [imageURL, setImageURL] = useState("");

    const handleChange = useCallback((e: ChangeEvent<HTMLElement>) => {
        onChange(e);
    }, [onChange]);

    const addNewBook = useCallback((e: React.MouseEvent<Element>) => {
        addNewBookEvent(e);
    }, [addNewBookEvent]);

    const handleImageChange = useCallback((e: { target: { result: React.SetStateAction<string>; }; }) => {
        setImageURL(e.target.result);
        onImageChange(e);
    }, [onImageChange]);

    const handleFileSelect = (event: any) => {
        let file = event.target.files[0];

        let reader = new FileReader();

        reader.onload = (function (theFile) {
            return function (e: any) {
                setImageURL(e.target.result); //set to display image
                handleImageChange(e);
            };
        })(file);

        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
    }

    return (
        <div className='border border-gray-300 w-full'>
            {/* Add New Book */}
            <div className='sm:grid sm:grid-cols-3 sm:gap-6 p-6'>
                <div className='text-center sm:h-full sm:bg-gray-200 flex content-around flex-wrap p-4'>
                    <div className="block w-full margin-auto sm:h-56">
                        <input id="fileUpload" name="bookCoverImage" type="file" accept="image/*" onChange={handleFileSelect} hidden />
                        {imageURL.length > 0 &&
                            <img className="sm:h-full md:h-48 lg:h-56 h-32 max-h-full max-w-full m-auto" src={imageURL} />
                        }
                    </div>
                    <div className="p-2 text-center block w-full">
                        <label htmlFor="fileUpload" className="cursor-pointer btn-primary inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="md:hidden lg:inline-block h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span>Add Cover Image</span>
                        </label>
                    </div>
                </div>
                <div className='text-left col-span-2'>
                    <div className='mb-5'>
                        <label className="form-label" htmlFor="bookTitle">
                            Book Title
                        </label>
                        <input id="bookTitle" type="text" placeholder="Title" name="bookTitle" onChange={handleChange} className="input-primary" />
                    </div>
                    <div className='my-5'>
                        <label className="form-label" htmlFor="bookAuthor">
                            Author
                        </label>
                        <input id="bookAuthor" type="text" placeholder="Author" name="bookAuthor" onChange={handleChange} className="input-primary" />
                    </div>
                    <div className='my-5'>
                        <label className="form-label" htmlFor="bookISBN">
                            ISBN
                        </label>
                        <input id="bookISBN" type="text" placeholder="ISBN" name="bookISBN" onChange={handleChange} className="input-primary" />
                    </div>
                    <div className='m-auto text-center'>
                        <button className='w-full btn-primary' onClick={addNewBook}>
                            Add New Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

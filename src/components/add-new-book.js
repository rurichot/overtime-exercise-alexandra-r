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
        <div>
            {/* Add New Book */}
            <div>
                <div>
                    <input id="fileUpload" name="bookCoverImage" type="file" accept="image/*" onChange={handleImageChange} hidden />
                    <label htmlFor="fileUpload">test</label>
                    {imageURL}
                    <label>Add Cover Image</label>
                </div>
                <div>
                    <label>Book Title</label>
                    <input name="bookTitle" onChange={handleChange} />
                </div>
                <div>
                    <label>Author</label>
                    <input name="bookAuthor" onChange={handleChange} />
                </div>
                <div>
                    <label>ISBN</label>
                    <input name="bookISBN" onChange={handleChange} />
                </div>
                <button onClick={addNewBook}>Add New Book</button>
            </div>
        </div>
    );
}

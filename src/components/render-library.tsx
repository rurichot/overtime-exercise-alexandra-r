import React from "react";
import MyLibrary from "./myLibrary";
import AddNewBook from "./add-new-book";
import { v4 as uuid } from 'uuid';

export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    coverImage: string;
}

interface BookState extends Partial<Book> {
    myLibrary: any[];
    filteredLibrary: any[];
    bookTitle: string;
    bookAuthor: string;
    bookISBN: string;
    bookCoverImage: string;
    searchInput: string;
    errorMessage: string;
}

export class RenderLibrary extends React.Component {

    state: BookState = {
        myLibrary: [], //load My Library from local storage
        filteredLibrary: [],
        bookTitle: "",
        bookAuthor: "",
        bookISBN: "",
        bookCoverImage: "",
        searchInput: "",
        errorMessage: ""
    };

    // load My Library 
    componentDidMount = () => {
        const myLibrary = JSON.parse(localStorage.getItem("myLibrary") ?? '[]');
        const filteredLibrary = myLibrary;
        this.setState({ myLibrary, filteredLibrary });
    }

    handleChange = (e: any) => {
        const input = e.target;
        this.setState({ [input.name]: input.value });
    }

    handleImageChange = (e: any) => {
        this.setState({ bookCoverImage: e.target.result });
    }

    addNewBook = (e: any) => {
        e.preventDefault();
        if (this.state.bookTitle.length === 0) {
            return;
        }
        const unique_id = uuid();

        const newBook: Book = {
            id: unique_id,
            title: this.state.bookTitle,
            author: this.state.bookAuthor,
            isbn: this.state.bookISBN,
            coverImage: this.state.bookCoverImage
        }

        localStorage.setItem("myLibrary", JSON.stringify(this.state.myLibrary.concat(newBook)));

        this.setState({
            myLibrary: this.state.myLibrary.concat(newBook),
            filteredLibrary: this.state.myLibrary.concat(newBook)
        });
    }

    searchLibrary = () => {
        const filteredLibrary =
            this.state.myLibrary.filter(
                book => {
                    return (
                        book.title.toLowerCase().includes(this.state.searchInput.toLowerCase())
                    );
                }
            )
        this.setState({ filteredLibrary });
    }

    render() {
        return (
            <div className="w-full">
                {/* Add New Book */}
                <AddNewBook onChange={this.handleChange} addNewBookEvent={this.addNewBook} onImageChange={this.handleImageChange} />

                {/* Search */}
                <div className="flex items-center border-b border-teal-500 py-2 my-10">
                    <input name="searchInput" onChange={this.handleChange} type="text" placeholder="Search Book Titles..." aria-label="Search Input"
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" />
                    <button onClick={this.searchLibrary} className="btn-primary" type="button">
                        Search
                    </button>
                </div>

                {/* Display Library */}
                <MyLibrary books={this.state.filteredLibrary} />
            </div>
        );
    }
}
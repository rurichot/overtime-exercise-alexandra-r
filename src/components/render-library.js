import React from "react";
import MyLibrary from "./myLibrary";
import AddNewBook from "./add-new-book";

export class RenderLibrary extends React.Component {

    state = {
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
        const myLibrary = JSON.parse(localStorage.getItem("myLibrary")) ? JSON.parse(localStorage.getItem("myLibrary")) : [];
        const filteredLibrary = myLibrary;
        this.setState({ myLibrary, filteredLibrary });
    }

    handleChange = (e) => {
        const input = e.target;
        this.setState({ [input.name]: input.value });
    }

    handleImageChange = (e) => {
        const file = e.target.files[0];
        this.setState({ bookCoverImage: file.name });
    }

    addNewBook = (e) => {
        e.preventDefault();
        if (this.state.bookTitle.length === 0) {
            return; //TODO: add error display?
        }
        const newBook = {
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

    searchLibrary = (e) => {
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
            <div>
                {/* Add New Book */}
                <AddNewBook onChange={this.handleChange} addNewBookEvent={this.addNewBook} onImageChange={this.handleImageChange} />

                {/* Search */}

                <div className="flex items-center border-b border-teal-500 py-2 my-10">
                    <input name="searchInput" onChange={this.handleChange}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search Book Titles..." aria-label="Full name" />
                    <button onClick={this.searchLibrary} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                        Search
                    </button>
                </div>

                {/* Display Library */}
                <MyLibrary books={this.state.filteredLibrary} />
            </div>
        );
    }
}
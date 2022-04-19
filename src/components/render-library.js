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
                <input placeholder="Search Book Titles..." type="search" name="searchInput" onChange={this.handleChange} />
                <button onClick={this.searchLibrary}>Search</button>

                {/* Display Library */}
                <MyLibrary books={this.state.filteredLibrary} />
            </div>
        );
    }
}
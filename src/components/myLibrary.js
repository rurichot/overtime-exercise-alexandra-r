export default function MyLibrary({ books }) {
    return (
        <div>
            {books.map(book =>
                <div key={book.title} book={book}>
                    <div>{book.coverImage}</div>
                    <div>
                        <h1><i>{book.title}</i></h1>
                        by <b>{book.author}</b><br />
                        ISBN: {book.isbn}
                    </div>
                </div>
            )}
        </div>
    )
}
export default function MyLibrary({ books }) {
    return (
        <div className="divide-y divide-gray-400">
            {books.map(book =>
                <div key={book.id} book={book} className="grid grid-cols-4 gap-4 py-10 ">
                    <div className="sm:h-48 h-28 m-auto">
                        {book.coverImage ?
                            <img className="max-h-full max-w-full" src={book.coverImage} />
                            : <div className="text-base">NO IMAGE</div>
                        }
                    </div>
                    <div className="text-left text-lg col-span-3">
                        <h2 className="text-2xl"><i>{book.title}</i></h2>
                        <h4 className="mb-5">by <b>{book.author ? book.author : <i>Unknown</i>}</b></h4>
                        <h4>ISBN: {book.isbn ? book.isbn : <i>Unknown</i>}</h4>
                    </div>
                </div>
            )}
        </div>
    )
}
import React, { useState, useEffect, useMemo } from "react";
import { getAllBooks } from "../apiServices/authService";
import { Book } from "./book.interface";
import BookListComponent from "./components/book.lists.component";
import BookItemComponent from "./components/book.item.component";
import { ErrorHandler} from "../Exceptions/exception.services";
import { ToastContainer } from "react-toastify";

export default function BookHomeComponent() {
  const [books, setBooks] = useState<Array<Book>>([]);
  const [bookId, setBookId] = useState<number | null>(null);
  const [action, setAction] = useState<'item' | 'list'>('list')

  useEffect(() => {
    const fetchAllBooks = async () => {
        try {
            const books = await getAllBooks();
            setBooks(books);
        } catch (e) {
            console.error("Error fetching books", e);
            new ErrorHandler(e);
        } 
    };
    fetchAllBooks();
  }, []);
  
    const selectBookItem = (bookId: number) => {
        setBookId(bookId);
        setAction('item');
    };

    const onEditBook = (book: Book) => {
        const updatedBooks = books.map(b => b.id === book.id ? book : b);
        setBooks(updatedBooks);
        console.log("Edited book:", book);
        setAction('list');
    };

    const updatedBooks = useMemo(() => books, [books]);
    
  return (
    <div>
      {action === 'list' ? (
        <div>
          <h2>Books List</h2>
          <BookListComponent books={updatedBooks} selectBookItem={selectBookItem} />
        </div>
      ): (
        <div>
          <h2>Book Item - {bookId}</h2>
          <BookItemComponent book={books.find(book => book.id === bookId)!} onEditBook={onEditBook} />
        </div>
      )}
      <ToastContainer></ToastContainer>

    </div>
  );
}

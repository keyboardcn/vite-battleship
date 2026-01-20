import React from "react";
import { Book } from "../book.interface";
import {
  SectionComponent,
  CenterCardComponent
} from "../../commons/common.components";
export default function BookListComponent(
  { books, selectBookItem }: { books: Array<Book>, selectBookItem: (bookId: number) => void }) {
  const emptyBooks = (
    <CenterCardComponent>
      <h2>No books available</h2>
    </CenterCardComponent>
  )
  return (
    <SectionComponent>
      {books.length > 0 ? (
        <CenterCardComponent>
          <table className="table-auto md:table-fixed">
            <thead>
              <tr>
                {Object.keys(books[0]).map((key) => (
                  <th key={key} className="p-1 text-primary-700">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book.id}
                  onClick={() => selectBookItem(book.id)}
                >
                  {Object.keys(book).map((key) => (
                    <td className="p-1 border-b border-b-qua-300 text-primary-700"
                      key={`book-${book.id}-${key}`}
                    >{book[key]}</td>
                  ))}
                  {/* <td><button onClick={() => selectBookItem(book.id)}>Edit</button></td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </CenterCardComponent>
      ) : emptyBooks}
    </SectionComponent>
  );
}
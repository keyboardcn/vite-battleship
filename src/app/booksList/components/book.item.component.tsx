import React, { useEffect, useState } from 'react';
import { Book } from '../book.interface';
import {
    SectionComponent,
    CenterCardComponent,
    ButtonComponent
} from '../../commons/common.components';
import {
    LabelInputComponent,
} from '../../commons/LabelInput.component';
interface BookListComponentProps {
    book: Book;
    onEditBook: (book: Book) => void;
}

export default function BookItemComponent({ book, onEditBook }: BookListComponentProps) {
    const [editableBook, setEditableBook] = useState<Book>(book);
    const objs = Object.entries(book);
    const numOfRows = Math.floor(objs.length / 2);
    const leftKey = objs.length % 2 == 0 ? null : objs.length - 1;
    const pair = [];
    useEffect(() => {
        console.log("change", editableBook);
    }, [editableBook])
    for (let i = 0; i < numOfRows; i++) {
        const [key0, value0] = objs[i * 2];
        const [key1, value1] = objs[i * 2 + 1];
        pair.push(
            <CenterCardComponent>
                <LabelInputComponent
                    labelData={{
                        id: `${key0}-${value0}-lable`,
                        htmlFor: `${key0}-${value0}-input`,
                        content: `${key0}`
                    }}
                    inputData={{
                        id: `${key0}-${value0}-input`,
                        value: `${value0}`,
                        type: "text"
                    }}
                    onChange={(e) => setEditableBook({ ...editableBook, [key0]: e })}
                    disabled={key0 === "id"}
                >
                </LabelInputComponent>

                <LabelInputComponent
                    labelData={{
                        id: `${key1}-${value1}-lable`,
                        htmlFor: `${key1}-${value1}-input`,
                        content: `${key1}`
                    }}
                    inputData={{
                        id: `${key1}-${value1}-input`,
                        value: `${value1}`,
                        type: "text"
                    }}
                    onChange={(e) => setEditableBook({ ...editableBook, [key1]: e })}
                    disabled={key1 === "id"}
                >
                </LabelInputComponent>
            </CenterCardComponent>
        )
    }
    if (leftKey) {
        const [key0, value0] = objs[leftKey];
        pair.push(
            <CenterCardComponent>
                <LabelInputComponent
                    labelData={{
                        id: `${key0}-${value0}-lable`,
                        htmlFor: `${key0}-${value0}-input`,
                        content: `${key0}`
                    }}
                    inputData={{
                        id: `${key0}-${value0}-input`,
                        value: `${value0}`,
                        type: "text"
                    }}
                    onChange={(e) => setEditableBook({ ...editableBook, [key0]: e })}
                >
                </LabelInputComponent>
            </CenterCardComponent>
        )
    }
    console.log("*********pariss", pair.length, numOfRows, book, objs);
    return (
        <SectionComponent>
            {pair}
            <CenterCardComponent>
                <ButtonComponent
                    id="save-item-btn"
                    content="SAVE"
                    onClick={() => onEditBook(editableBook)}
                ></ButtonComponent>
            </CenterCardComponent>
        </SectionComponent>
    );
}
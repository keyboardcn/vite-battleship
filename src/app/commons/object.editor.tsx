import React, { useEffect, useState } from 'react';

import {
    SectionComponent,
    CenterCardComponent,
    ButtonComponent
} from './common.components';
import {
    LabelInputComponent,
} from './LabelInput.component';
interface ItmComponentProps {
    obj: Record<string, any>;
    onEditObj: (obj: Record<string, string>) => void;
}

export default function ItemComponent({ obj, onEditObj }: ItmComponentProps) {
    const [editableObj, setEditableObj] = useState(obj);
    const objArray = Object.entries(obj);
    const numOfRows = Math.floor(objArray.length / 2);
    const leftKey = objArray.length % 2 == 0 ? null : objArray.length - 1;
    const pair = [];
    useEffect(() => {
        console.log("change", editableObj);
    }, [editableObj])
    for (let i = 0; i < numOfRows; i++) {
        const [key0, value0] = objArray[i * 2];
        const [key1, value1] = objArray[i * 2 + 1];
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
                    onChange={(e) => setEditableObj({ ...editableObj, [key0]: e })}
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
                    onChange={(e) => setEditableObj({ ...editableObj, [key1]: e })}
                    disabled={key1 === "id"}
                >
                </LabelInputComponent>
            </CenterCardComponent>
        )
    }
    if (leftKey) {
        const [key0, value0] = objArray[leftKey];
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
                    onChange={(e) => setEditableObj({ ...editableObj, [key0]: e })}
                >
                </LabelInputComponent>
            </CenterCardComponent>
        )
    }
    return (
        <SectionComponent>
            {pair}
            <CenterCardComponent>
                <ButtonComponent
                    id="save-item-btn"
                    content="SAVE"
                    onClick={() => onEditObj(editableObj)}
                ></ButtonComponent>
            </CenterCardComponent>
        </SectionComponent>
    );
}
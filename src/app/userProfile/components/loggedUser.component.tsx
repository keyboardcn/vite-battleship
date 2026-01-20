import React, { useState } from "react";
import { SectionComponent, CenterCardComponent, ButtonComponent } from "../../commons/common.components";

import { LabelInputComponent } from "../../commons/LabelInput.component";
export interface IUser {
    [key: string]: any
}
export function LoggedUserComponent({ props }: IUser) {
    const nrows: number = Math.floor(Object.keys(props).length / 2);
    const rows = Array.from(Array(nrows), (_, k) => k);
    const [userArray, setUserArray] = useState(Object.entries(props));
    console.log(JSON.stringify(userArray), JSON.stringify(props), rows);
    return (
        <SectionComponent>
            {
                rows.map((v, _) => (
                    <CenterCardComponent id={`user-info-row-${v}`}>
                        {[0, 1].map((idx) => (
                            <LabelInputComponent
                                labelData={{
                                    id: `row-${v}-${userArray[v * 2 + idx][0]}-label`,
                                    htmlFor: `row-${v}-${userArray[v * 2 + idx][0]}-input`,
                                    content: `${userArray[v * 2 + idx][0]}:`,
                                }}
                                inputData={{
                                    id: `row-${v}-${userArray[v * 2 + idx][0]}-input`,
                                    type: "text",
                                    value: `${userArray[v * 2 + idx][1]}`
                                }}
                                onChange={(e) => { console.log(e.target.value) }}
                                className="cursor-not-allowed"
                            ></LabelInputComponent>
                        ))}
                    </CenterCardComponent>
                ))
            }
            <CenterCardComponent id="change-user-info-card">
                <ButtonComponent
                    id="change-user-info-btn"
                    content="SAVE USER PROFILE"
                    onClick={() => { console.log("NOT implemented") }}
                ></ButtonComponent>

            </CenterCardComponent>
        </SectionComponent>
    )
}
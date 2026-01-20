import React, { useState } from "react";

import ItemComponent from "../../commons/object.editor";

export interface IUser {
    [key: string]: any
}
export function LoggedUserComponent({ props }: IUser) {
    function handleUpdatedUser(value) {
        console.log(value);
        console.log("TO be implemented");
    }
    return (
        <ItemComponent
            obj={props}
            onEditObj={handleUpdatedUser}
        ></ItemComponent>
    )
}
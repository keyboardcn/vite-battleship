import React, { useState } from "react";
interface ILabelData {
    id: string;
    htmlFor: string;
    content: string;
}

interface IInputData {
    id: string;
    type: "number" | "text" | "password" | "email";
    value?: string | number;
}

export function LabelInputComponent({
    labelData,
    inputData,
    onChange,
    className,
    disabled = false
}: {
    labelData: ILabelData;
    inputData: IInputData;
    onChange: (value: any) => void;
    className?: string;
    disabled?: boolean;
}) {
    const [inputValue, setInputValue] = useState(inputData.value || "");
    const handleChange = (val) => {
        if (inputData.type === "number") {
            onChange(Number(val));
        } else {
            onChange(val);
        }
        setInputValue(val);
    };
    const newClsName = "flex w-full flex-col md:flex-row md:md-2 md:items-center gap-10" + className;
    return (
        <div className={newClsName}>
            <label
                id={labelData.id}
                htmlFor={labelData.htmlFor}
                className="block text-md font-medium text-primary-600 w-24 p-1 md:shrink-0 md:text-right"
            >
                {labelData.content}
            </label>

            <input
                id={inputData.id}
                type={inputData.type}
                value={inputValue}
                className="h-10 grow bg-secondary-300
         text-white p-1 focus:outline-qua-200 scroll-qua-300 hover:bg-green-300 scroll-mb-60 mt-1 block w-full px-3 
         py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500
          focus:border-primary-500 text-sm md:text-md disabled:hover:bg-tertiary-200"
                onChange={(e) => handleChange(e.target.value)}
                disabled={disabled}
            />
        </div>
    );
}

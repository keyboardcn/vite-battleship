import React, { PropsWithChildren, useState } from "react";
import { Link } from "react-router-dom";
export interface IDropdown {
  id: string;
  content: string;
  links: [string, string][];
  className?: string;
}
export function DropdownComponent(
  props: IDropdown
) {
  const [showDD, setShowDD] = useState(false);
  const newClsName = "relative" + " " + props.className;
  return (
    <div
      className={newClsName}
      id={props.id}
      onClick={() => {
        setShowDD(true);
      }}
      onMouseOver={() => setShowDD(true)}
      onMouseLeave={() => setShowDD(false)}
    >
      <a className="items-center font-bold text-xl mr-7 decoration-0 text-white">{props.content.toUpperCase()}</a>
      {showDD && (
        <ul className="absolute top-5 right-2 flex-col bg-blue-600 border border-amber-200 p-1 z-50 rounded-md" 
            onMouseLeave={() => setShowDD(false)}>
          {props.links.map((value) => (
            <li className="flex items-start text-white p-2 hover: bg-blue-600 hover:text-amber-600 min-w-32">
              <Link to={value[0]} onClick={() => setShowDD(false)}>
                {value[1]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

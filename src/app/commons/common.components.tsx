import React, { Children, PropsWithChildren, useState } from "react";


function OneSquareComponent({
  content,
  id,
  getId,
}: {
  content: string;
  id: string;
  getId: (id: string) => void;
}) {
  return (
    <div
      id={id}
      className="flex h-12 w-12 border-collapse justify-center self-center 
        border border-qua-300 text-3xl font-bold outline outline-qua-200"
      onClick={(e) => getId(e.currentTarget.id)}
    >
      {content}
    </div>
  );
}

export function MatrixOfSquareComponent({
  matrix,
  handleMatrixCellHit,
}: {
  matrix: string[][];
  handleMatrixCellHit: (r: number, c: number) => any;
}) {
  const clickOneSquare = (id: string) => {
    const [r, c] = id.split("_").map((v) => parseInt(v));
    console.log("r, c", r, c, matrix[r][c]);
    handleMatrixCellHit(r, c);
  };
  return (
    <div className="mt-1 flex w-fit flex-col justify-center gap-1 rounded-sm bg-primary-300 p-1">
      {matrix && matrix.map((row, rInd) => (
        <div className="flex flex-row justify-center">
          {row.map((c, cInd) => (
            <OneSquareComponent
              content={c}
              id={`${rInd}_${cInd}`}
              getId={clickOneSquare}
            ></OneSquareComponent>
          ))}
        </div>
      ))}
    </div>
  );
}

interface ICardProps {
  id?: string;
}
export function CenterCardComponent({
  id,
  children,
}: PropsWithChildren<ICardProps>) {
  return (
    <div
      id={id}
      className="m-1 flex justify-center items-center gap-1
      rounded-xl bg-primary-100 pl-8 pr-8 pt-6 md:p-6 max-md:flex-col max-md:justify-center"
    >
      {children}
    </div>
  );
}

export function SectionComponent({ children }: PropsWithChildren<any>) {
  return (
    <div className="m-6 p-10 rounded-xl bg-primary-100 border border-qua-400">
      {children}
    </div>
  );
}

export function PageComponent({ children }: PropsWithChildren<any>) {
  return (
    <div className="w-full flex justify-center bg-gray-50 pt-10">
      <div className="bg-gray-100 max-w-lvh">{children}</div>
    </div>
  );
}

interface IButton {
  id: string;
  content: string;
  onClick: () => void;
}
export function ButtonComponent(props: IButton) {
  return (
    <div className="flex items-start w-full">
      <button
        className="mt-1 h-12 block bg-primary-700 border w-full text-white rounded-md"
        id={props.id}
        onClick={() => props.onClick()}
      >
        {props.content.toUpperCase()}
      </button>
    </div>
  );
}


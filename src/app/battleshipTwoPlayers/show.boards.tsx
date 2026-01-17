import React, { useState, useContext } from "react";
import { useAppSelector } from "../redux/hooks";

import {
  MatrixOfSquareComponent,
  CenterCardComponent,
  SectionComponent,
} from "../commons/common.components";
import { useGameContext } from "./game.context";
export function ShowBoards() {
  const { mode } = useAppSelector((state) => state.gameConfig);

  const { playerTurn, setPlayerTurn, boards, handleShoot } =
    useGameContext();

  const [canSwitchPlayer, setCanSwitchPlayer] = useState<boolean>(false);
  const [canShoot, setCanShoot] = useState<boolean>(true);

  const handleBtnClick = () => {
    if (!canSwitchPlayer) {
      alert("Play first before switch palyer!")
    } else {
      setPlayerTurn(1 - playerTurn);
      setCanShoot(true);
      setCanSwitchPlayer(false);
    }
  }

  const validateHandleShoot = (r, c) => {
    if (mode === '2P' && !canShoot) {
      alert("Switch player please!")
    } else {
      setCanShoot(false);
      setCanSwitchPlayer(true);
      handleShoot(r, c);
    }
  }

  return (
    <SectionComponent>
      <CenterCardComponent id="board-card-1">

        <MatrixOfSquareComponent
          matrix={boards.length > 1 ? boards[1 - playerTurn] : boards[0]}
          handleMatrixCellHit={validateHandleShoot}
        ></MatrixOfSquareComponent>
        {boards.length == 2 && (
          <button
            className="font-bold text-primary-600 text-2xl p-5 justify-center"
            onClick={handleBtnClick}
          >
            PLAYER:<strong className="text-3xl text-primary-600">{mode === "2P" ? `${playerTurn === 0 ? "1" : "2"}` : ""}</strong>
          </button>
        )}
      </CenterCardComponent>
    </SectionComponent>
  );
}

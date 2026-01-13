import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

import { ToastContainer, toast } from "react-toastify";

import { ShowBoards } from "./show.boards";
import { WinDialog } from "./win.dialog";
import { StatusDialog } from "./status.dialog";
import thImage from "../../assets/battleship.png";

import {
  PageComponent,
  SectionComponent,
  CenterCardComponent,
} from "../commons/common.components";

import { setBoardSize, setGameMode } from '../redux/gameSlice'
import ResizeComponent from "../commons/ResizeComponent";

import { GameContext } from "../contexts/game.context";
export default function BattleshipMultiPlayer() {
  const dispatch = useAppDispatch();

  const {
    boards,
    statusMessage,
    handleShoot,
    startGame,
  } = useContext(GameContext);

  const [mode, setMode] = useState<string>('1P');
  const [rows, setRows] = useState<number>(5);
  const [trigger, setTrigger] = useState<number>(Math.random());

  const resize = (size: number, _ships: number) => {
    setRows(size);
    toast(JSON.stringify({message: `${rows}-${rows}`, timeStamp: Date.now()}));
    dispatch(setBoardSize({rows:rows, cols: rows}));
    setTrigger(Math.random());
  }
  
  useEffect(() => {
    console.log(rows, mode);
    startGame(mode);
  }, [trigger])

  useEffect(() => {
    dispatch(setGameMode(mode));
  }, [mode])
  const isGameStarted = boards.length > 0;
  const isSingleBoardLayout = boards.length === 1;

  return (
    <PageComponent>
      <SectionComponent>
        <CenterCardComponent id="header">
          <img
            src={thImage}
            className="h-14 bg-transparent"
            alt="Battleship Logo"
          />
          <h2 className="font-bold text-blue-600 text-5xl max-md:text-2xl">Battleship Game</h2>
        </CenterCardComponent>
      </SectionComponent>

      <SectionComponent>
        <CenterCardComponent id="player-row">
          <select
            id="player-select"
            className="w-full h-12 text-blue-600 font-bold hover:bg-green-300 border border-amber-300
            focus:bg-green-300"
            value={mode}
            onChange={(e) =>{setMode(e.target.value)}}
          >
            <option value="1P" className="text-blue-600 hover:bg-blue-300">
              One Player
            </option>
            <option value="2P" className="text-blue-600 hover:bg-blue-300">
              Two Players
            </option>
          </select>
        </CenterCardComponent>
        <ResizeComponent resize={resize}></ResizeComponent>
      </SectionComponent>
      
      <ShowBoards />
      
      <SectionComponent>
        <WinDialog />

        <StatusDialog />
      </SectionComponent>
      <ToastContainer></ToastContainer>
    </PageComponent>
  );
}

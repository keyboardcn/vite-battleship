import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BattleshipMultiPlayer from './battleshipTwoPlayers/battleship.multiplayer';
import BattleshipOnePlayer from './battleShip/BattleshipOnePlayer';
import RenderTextComponent from './textCount/render.text';
import UserProfileHomeComponent from './userProfile/userProfileHomeComponent';
import BookHomeComponent from './booksList/book.home.component';
import { DropdownComponent } from './commons/common.dropdown';
import thImage from "../assets/avatar-icon-png-13.png";

import './app.css';
function App() {
  const [showDD, setShowDD] = useState(false);
  const [showPlaceHolder, setShowPlaceHolder] = useState(false);
  const btspModes: [string, string][] = [
    ['/', "ONE Player"],
    ['/battleship', "MULTI Player"]
  ]
  const userBooks: [string, string][] = [
    ["/show-books", "Show Books"],
    ["", "Undefined"],
  ]

  const breathItms: [string, string][] = [["/user-profile", "User Profiles"], ...btspModes, userBooks[0]];

  return (
      <Router>
        <div className="text-left">
          <nav className='w-full mb-5 bg-blue-700 pt-2 pb-2
          flex justify-between md:justify-start'>
            <Link to="/user-profile"
             className='items-center font-bold text-xl ml-2 mr-7 decoration-0 text-white'
            >HOME</Link>

            <DropdownComponent
             id="user-books"
             className='hidden md:flex'
             content="Users&Books"
             links={userBooks}
            ></DropdownComponent>
            
            <DropdownComponent
              id="batteleship-modes"
              className='hidden md:flex'
              content="battelship"
              links={btspModes}
            ></DropdownComponent>

            <Link to="/render-text"
            className='items-center font-bold text-xl ml-2 mr-7 decoration-0 text-white max-md:hidden'
            >Render Text</Link>
            
            <Link to="/user-profile"
             className='hidden items-center justify-center h-8 w-8 text-xl ml-2 mr-7 bg-white
             decoration-0 border border-amber-100 rounded-3xl md:flex md:absolute md:right-0'
            ><img src={thImage}
              alt="AVATAR"
            ></img></Link>

            <DropdownComponent
             id = "breadth"
             className="flex md:hidden"
             content='&#9781;'
             links={breathItms}
            ></DropdownComponent>

          </nav>
          <Routes>
            <Route path="/" element={<BattleshipOnePlayer />} />
            <Route path="/user-profile" element={<UserProfileHomeComponent />} />
            <Route path="/battleship" element={<BattleshipMultiPlayer />} />
            <Route path="/render-text" element={<RenderTextComponent />} />
            <Route path="/show-books" element={<BookHomeComponent />} />
          </Routes>
        </div>
      </Router>
  )
}
export default App;


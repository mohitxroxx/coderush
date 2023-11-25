import { useState } from 'react'

import viteLogo from '/vite.svg'
import './App.css'
import Header from './component/Header'
import Leaderboard from './component/Leaderboard'
import Timer from './component/Timer'
import background from './assets/background.png'
import Login from './component/Login'


function App() {
  const [count, setCount] = useState(0)
  const containerStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover', // Adjust as needed
   
  };

  return (
    <div style={containerStyle}>
      <Header/>
  
      <Timer/>
      <Leaderboard/>
        
    </div>
  )
}

export default App

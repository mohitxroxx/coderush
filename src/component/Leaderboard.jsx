import React from 'react'
import { leaderboardData, deletedteams } from '../data';

function Leaderboard() {
  const sortedData = [...leaderboardData].sort((a, b) => b.points - a.points);
  const numberOfParticipants = leaderboardData.length;
  return (
    <div className='w-full flex h-auto  justify-center  bg-transparent'>
        
      <div className=' w-11/12 p-4 gap-4  rounded-md   bg-primary'>
      <div className="participant text-xl font-medium text-center text-secondary">
            <h1>No of participants left :  {numberOfParticipants}</h1>
        </div>
        <div className='justify-center w-full p-4 gap-4  flex flex-wrap'>
        <div className="right pt-2  h-auto text-xl text-primary font-bold flex text-center justify-center space-x-32 rounded-xl bg-secondary w-custom1 ">
        <div>
  <h1 className='text-2xl'>Ranks</h1>
  {sortedData.map((team, index) => (
          <div key={index}>
            <p>{index + 1}</p>
          </div>
        ))}
</div>


  <div>
    <h1 className='text-2xl'>Teams</h1>
    {sortedData.map((team, index) => (
          <div key={index}>
            <p>{team.team}</p>
          </div>
        ))}
  </div>

  <div>
    <h1 className='text-2xl'>Points</h1>
    {sortedData.map((team, index) => (
          <div key={index}>
            <p>{team.points}</p>
          </div>
        ))}
  </div>
           
        </div>
        
        <div className=" right pt-2 h-80 w-custom2 text-xl text-primary font-bold flex text-center justify-center space-x-6 rounded-xl bg-tertiary left">
            <div><h1 className='text-2xl'>Out At</h1>
            {deletedteams.map((team, index) => (
          <div key={index}>
            <p>{team.out}</p>
          </div>
        ))}
            </div>
            
           <div><h1 className='text-2xl'>Teams</h1>
           {deletedteams.map((team, index) => (
          <div key={index}>
            <p>{team.team}</p>
          </div>
        ))}
           </div>
           <div><h1 className='text-2xl'>Points</h1>
           {deletedteams.map((team, index) => (
          <div key={index}>
            <p>{team.points}</p>
          </div>
        ))}
           </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard

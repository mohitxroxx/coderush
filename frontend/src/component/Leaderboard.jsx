import React, {useState, useEffect} from 'react'
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [deletedTeams, setDeletedTeams] = useState([]);

  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/current`);
      setLeaderboardData(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  const fetchDeletedTeams = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/deleted`);
      setDeletedTeams(response.data);
    } catch (error) {
      console.error('Error fetching deleted teams data:', error);
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchLeaderboardData();

    // Set up interval to fetch data every 30 seconds
    const intervalId = setInterval(() => {
      fetchLeaderboardData();
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    // Fetch initial data
    fetchDeletedTeams();

    // Set up interval to fetch data every 30 seconds
    const intervalId = setInterval(() => {
      fetchDeletedTeams();
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once on mount
  
  
  const sortedData = [...leaderboardData].sort((a, b) => b.score - a.score);
  const sortedDeletedTeam = [...deletedTeams].sort((a, b) => b.score - a.score);
  const numberOfParticipants = leaderboardData.length;
  return (

    
    <div className='w-full flex h-auto  justify-center  bg-transparent'>
        
      <div className=' w-11/12 p-4 gap-4  rounded-md   bg-primary'>
      <div className="participant text-xl font-medium text-center text-secondary">
            <h1>No of participants left : {numberOfParticipants}</h1>
        </div>
        <div className='justify-center w-full p-4 gap-4  flex flex-wrap'>
        <div className="right pt-2 pb-2 h-auto  sm:text-xl text-primary font-bold flex text-center justify-center space-x-2 sm:space-x-32 rounded-xl bg-secondary w-full sm:w-custom1 ">
        <div>
        <h1 className=' text-xl sm:text-2xl'>Ranks</h1>
            {sortedData.map((team, index) => (
              <div key={index}>
                <p>{team.index+1}</p>
              </div>
            ))}
</div>


  <div>
  
    <h1 className='text-xl sm:text-2xl'>Teams</h1>
            {sortedData.map((team, index) => (
              <div key={index}>
                <p>{team.hacker}</p>
              </div>
            ))}
  </div>

  <div>
    <h1 className='text-xl sm:text-2xl'>Points</h1>
    {sortedData.map((team, index) => (
              <div key={index}>
                <p>{team.score}</p>
              </div>
            ))}
  </div>
           
        </div>
        
        <div className=" right pt-2 h-auto  text-sm sm:text-xl  w-full sm:w-custom2  text-primary font-bold flex text-center justify-center space-x-0 sm:space-x-2 rounded-xl bg-tertiary left">
            <div><h1 className='text-2xl'>Out At</h1>
            {sortedDeletedTeam.map((team, index) => (
          <div key={index}>
            <p>{team.index}</p>
          </div>
        ))}
            </div>
            
           <div><h1 className='text-2xl'>Teams</h1>
           {sortedDeletedTeam.map((team, index) => (
          <div key={index}>
            <p>{team.hacker}</p>
          </div>
        ))}
           </div>
           <div><h1 className='text-2xl'>Points</h1>
           {sortedDeletedTeam.map((team, index) => (
          <div key={index}>
            <p>{team.score}</p>
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

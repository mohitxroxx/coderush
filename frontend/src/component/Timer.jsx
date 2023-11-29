import React, { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Timer() {
  const initialDuration = (10*60 * 1000);
  const [time, setTime] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [showTimerBtn, setShowTimerBtn] = useState(true);
  const [showRemainingButtons, setShowRemainingButtons] = useState(false);
  const [deletedTeams, setDeletedTeams] = useState([]);
  const [eliminationNames, setEliminationNames] = useState(false)

  useEffect(() => {
    // let interval;
    let visibilityTimeout;

    if (isRunning && time > 0) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime-1000 );
      },1000);
      return () => clearInterval(interval);
    } else if (time <= 0) {
      setTime(initialDuration);
      setShowTimerBtn(true);
      setShowRemainingButtons(true);
      setEliminationNames(true);
      visibilityTimeout = setTimeout(() => {
        setShowTimerBtn(false);
        setShowRemainingButtons(false);
        
        setIsRunning(true);
      }, 5000);
      return ()=> clearTimeout(visibilityTimeout);
    }
  }, [isRunning, time, showRemainingButtons]);

  const handleToggle = () => {
    if (isRunning) {
      setIsRunning(false);
      setShowTimerBtn(false);
      setShowRemainingButtons(true);
      setTime(initialDuration);
    } else {
      setIsRunning(true);
      setShowTimerBtn(true);
      setShowRemainingButtons(false);
    }
  };

  useEffect(()=>{
    const timeout = setTimeout(()=>setEliminationNames(false), 10000);
    return () => clearTimeout(timeout);
  },[eliminationNames])

  const formatTime = (timeInMilliseconds) => {
    const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60); //ye wala only mins sec ke liye hai
    const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
  
    return `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  };
  
  // const formatTime = (timeInMilliseconds) => {
  //   const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60); //ye for teeno
  //   const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
  //   const milliseconds = Math.floor(timeInMilliseconds % 1000);

  //   return `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')} : ${String(milliseconds/10).padStart(3, '0')}`;
  // };

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
    fetchDeletedTeams();

    // Set up interval to fetch data every 30 seconds
    const fetchIntervalId = setInterval(() => {
      fetchDeletedTeams();
    }, 1000);

    // Clear intervals on component unmount
    return () => clearInterval(fetchIntervalId);
    ;
  }, []); // Empty dependency array to run only once on mount

  const targetHours = 18;
  const targetMinutes =43;

  // ... (rest of your component code

  // Custom target time
  useEffect(() => {
    console.log('Setting up custom target time effect');
    
    const now = new Date();
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHours, targetMinutes, 0, 0);
  
    console.log('Current time:', now);
    console.log('Target time:', targetTime);
  
    const timeUntilTarget = targetTime - now;
    console.log('Time until target:', timeUntilTarget);
  
    if (timeUntilTarget > 0 && timeUntilTarget <= 10000) {
      console.log('Triggering handleToggle immediately');
      // If within 10 seconds of the target time, trigger the toggle immediately
      handleToggle();
    }
  
    // Set up timeout to trigger the toggle when within 10 seconds of the target time
    const timeoutId = setTimeout(() => {
      console.log('Triggering handleToggle after timeout');
      handleToggle();
    }, timeUntilTarget - 10000); // Set timeout 10 seconds before the target time
  
    return () => {
      console.log('Cleaning up custom target time effect');
      clearTimeout(timeoutId);
    };
  }, []);

  // const sortedDeletedTeam = [...deletedTeams].sort((a, b) => b.score - a.score);

  return (
    <div className='w-full flex mt-2  pb-4 gap-28 justify-center'>
      <button className='border w-52 text-secondary text-3xl bg-primary px-3 py-2 rounded-md '>
        {isRunning ? formatTime(time) : 'Timer'}
      </button>
      {eliminationNames &&
        deletedTeams.slice(0, 3).map((team, index) => (
          <button key={index} className='border w-52 text-secondary text-2xl bg-primary px-3 py-2 rounded-md '>
            {team.hacker}
          </button>
        ))}
    </div>
  );
}

export default Timer;

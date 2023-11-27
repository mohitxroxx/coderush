import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Stopwatch() {
  const initialDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
  const [time, setTime] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [showTimerBtn, setShowTimerBtn] = useState(true);
  const [showRemainingButtons, setShowRemainingButtons] = useState(false);
  const [deletedTeams, setDeletedTeams] = useState([]);

  useEffect(() => {
    let interval;
    let visibilityTimeout;
   

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 10); // Decrease by 10 milliseconds for more accuracy
      }, 10);
    } else if ( time <= 0 ) {
      // If the timer has ended and remaining buttons are not yet shown, switch visibility
      setShowTimerBtn(true);
      setShowRemainingButtons(true);
      visibilityTimeout = setTimeout(() => {
        setShowTimerBtn(false);
        setShowRemainingButtons(false); // Reset to false after timeout
        setTime(initialDuration);
        
        setIsRunning(true);
      }, 5000); 
    }

    return () => {
      clearInterval(interval);
      clearTimeout(visibilityTimeout);
    };
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

  const formatTime = (timeInMilliseconds) => {
    const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60);
    const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
    const milliseconds = Math.floor(timeInMilliseconds % 1000);

    return `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')} : ${String(milliseconds).padStart(3, '0')}`;
  };

  const fetchDeletedTeams = async () => {
    try {
      const response = await axios.get('/api/deleted');
      setDeletedTeams(response.data);
    } catch (error) {
      console.error('Error fetching deleted teams data:', error);
    }
  };

  const deleteToggle = () => {
    axios
      .post('/api/removeteam', {
        time: '1',
        team: '1',
      })
      .then((response) => {
        // Handle the response if needed
        setIsRunning(true);
        setShowTimerBtn(true);
        setShowRemainingButtons(false);
      })
      .catch((error) => {
        console.error('Error making POST request:', error);
      });
  };

  useEffect(() => {
    // Fetch initial data
    fetchDeletedTeams();

    // Set up interval to fetch data every 30 seconds
    const fetchIntervalId = setInterval(() => {
      fetchDeletedTeams();
    }, 30000);

    // Set up interval to perform deleteToggle every 4.5 minutes (4.5 * 60 * 1000 milliseconds)
    const deleteToggleIntervalId = setInterval(() => {
      deleteToggle();
    }, 4.5 * 60 * 1000);

    // Clear intervals on component unmount
    return () => {
      clearInterval(fetchIntervalId);
      clearInterval(deleteToggleIntervalId);
    };
  }, []); // Empty dependency array to run only once on mount



  const sortedDeletedTeam = [...deletedTeams].sort((a, b) => b.score - a.score);


  const handleDeleteAndToggle = () => {
    deleteToggle();
    handleToggle();
  };

  return (
    <div className='w-full flex mt-2  pb-4 gap-28 justify-center'>
      <button className='border w-52 text-secondary text-3xl bg-primary px-3 py-2 rounded-md ' onClick={handleDeleteAndToggle}>
        {isRunning ? formatTime(time) : 'Start Timer'}
      </button>
       {showRemainingButtons && sortedDeletedTeam.slice(0, 3).map((team, index) => (
        <button key={index} className='border w-52 text-secondary text-2xl bg-primary px-3 py-2 rounded-md '>
          {team.hacker}
        </button>
      ))}
    </div>
  );
}

export default Stopwatch;

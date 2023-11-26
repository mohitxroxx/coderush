import React, { useState, useEffect } from 'react';

function Stopwatch() {
  const initialDuration = 1 * 10 * 1000; // 5 minutes in milliseconds
  const [time, setTime] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [showTimerBtn, setShowTimerBtn] = useState(true);
  const [showRemainingButtons, setShowRemainingButtons] = useState(false);

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

  return (
    <div className='w-full flex mt-2  pb-4 gap-28 justify-center'>
      <button className='border w-52 text-secondary text-3xl bg-primary px-3 py-2 rounded-md ' onClick={handleToggle}>
        {isRunning ? formatTime(time) : 'Start Timer'}
      </button>

      {showRemainingButtons && (
        <>
          <button className='border w-52 text-secondary text-3xl bg-primary px-3 py-2 rounded-md '>
            coders A
          </button>
          <button className='border w-52 text-secondary text-3xl bg-primary px-3 py-2 rounded-md '>
            coders B
          </button>
          <button className='border w-52 text-secondary text-3xl bg-primary px-3 py-2 rounded-md '>
            coders C
          </button>
        </>
      )}
    </div>
  );
}

export default Stopwatch;

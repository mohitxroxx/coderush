import React from 'react'
import rush from '../assets/rush.png'
import leaderboard from '../assets/learerboard.png'
import bdcoe from '../assets/bdcoe.png'

function Header() {
  return (
    <div className='Header flex justify-center gap-24 items-center w-full'>
    <img className='w-1/4  hidden sm:block pt-12' src={rush} alt="" />
    <img className='w-1/4  pt-8' src={leaderboard} alt="" />
    <img className='w-1/4  pt-16' src={bdcoe} alt="" />
</div>

  )
}

export default Header

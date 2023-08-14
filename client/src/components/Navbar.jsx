import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { BsChatLeftDots } from 'react-icons/bs'
import { AiOutlineBell } from 'react-icons/ai'
import { IoIosHelpCircleOutline } from 'react-icons/io'
import { RxHamburgerMenu } from 'react-icons/rx'

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const fullName = user ? `${user.firstName} ${user.lastName}` : ''

  const handleNav = () => {setNav(!nav)}

  return (
    <div className='w-full bg-primary flex items-center px-8'>
    
      <div className='flex justify-start items-center flex-1 '>
      <Link to='/' className='p-4 text-2xl text-primary font-bold'>
      <h1>uniVerse</h1>
      </Link>

      <div className='hidden sm:flex'>
      <input type="search" placeholder='Search...' className='bg-secondary p-1 rounded-md pl-4 ml-4' />
      </div>
      </div>
      
      <div className='hidden md:flex items-center'>
      <div className='flex text-2xl items-center'>
        <ThemeToggle className='mx-4'/>
        <BsChatLeftDots className='mx-4 text-[21px] mt-1'/>
        <AiOutlineBell className='mx-4' />
        <IoIosHelpCircleOutline className='mx-4' />
      </div>

      <div className='mx-10'>
          <Link to={user ? '/' : '/signup'}>
        <p className='font-medium text-accent'>{user ? fullName : 'Sign Up' }</p>
         </Link>
      </div>
      </div>
      
      {/* MOBILE */}
      <div className='md:hidden flex'>
       <div onClick={handleNav} className='cursor-pointer'>
          <RxHamburgerMenu size={25}/>
       </div>

       <div className={nav ? 'absolute top-20 right-8 bg-primary p-6 rounded-xl' : 'hidden'}>
        <Link to={user ? '' : '/signup'}>
        <p onClick={user ? () => dispatch(setLogout()) : undefined} className='pb-4 font-medium'>{user ? 'Log Out' : 'Sign Up'}</p>
        </Link>
        <div className='flex items-center pb-4 font-medium'>
        Change theme color: <ThemeToggle/>
       
        </div>
        <Link className='font-medium' to='/login'>
        <p>Log In</p>
        </Link>
       </div>
      </div>

    </div>
  )
}

export default Navbar
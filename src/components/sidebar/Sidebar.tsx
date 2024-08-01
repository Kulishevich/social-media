'use client'
import React from 'react'
import styles from './Sidebar.module.scss'
import { CgProfile } from "react-icons/cg";
import { FaUserFriends, FaPhoneAlt } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdWbSunny, MdDarkMode } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleTheme } from '@/redux/slices/themeSlice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useIsAuth } from '@/services/useIsAuth';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation'

const pathElems = [
  {
    path: '/friends',
    content: <FaUserFriends/>
  },
  {
    path: '/calls',
    content: <FaPhoneAlt/>
  },
  {
    path: '/messages',
    content: <AiOutlineMessage/>
  },
  {
    path: '/setting',
    content: <IoSettingsOutline/>
  }
]

const Sidebar = () => {
    const toggle = useSelector((state: RootState) => state.theme)
    const dispatch = useDispatch()
    const path = usePathname()
    const { user } = useIsAuth()
    const router = useRouter()

    //выход из аккаунта
    const signOutUser = () => {
      const auth = getAuth()
      signOut(auth)
      .then(() => {
        console.log(1)
        router.push('/')
      })
      .catch((error) => {
        console.log(2)
      })
    }
    if(!user?.email) return 
  return (
    <div className={styles.container}>
        <div className={styles.iconContainer}>
          <CgProfile className={styles.icons}/>
          {user && <PiSignOut className={styles.icons} onClick={signOutUser}/>}  
        </div>
        <nav className={styles.nav}>
            {pathElems.map((elem, index) => (
              <Link 
                href={elem.path} 
                className={`${styles.icons} ${pathElems[index].path == path && styles.active}`}
                key={index}
              >
                {elem.content}
              </Link>
            ))}
        </nav>
        {toggle ? 
          <MdWbSunny className={styles.icons} onClick={() => dispatch(toggleTheme())}/> 
          : 
          <MdDarkMode className={styles.icons} onClick={() => dispatch(toggleTheme())}/>
        }
    </div>
  )
}

export default Sidebar
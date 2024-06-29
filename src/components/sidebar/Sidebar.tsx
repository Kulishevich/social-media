'use client'
import React from 'react'
import styles from './Sidebar.module.scss'
import { CgProfile } from "react-icons/cg";
import { FaUserFriends, FaPhoneAlt } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdWbSunny, MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleTheme } from '@/redux/slices/themeSlice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const toggle = useSelector((state: RootState) => state.theme)
    const dispatch = useDispatch()
    const path = usePathname()
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


  return (
    <div className={styles.container}>
        <CgProfile className={styles.icons}/>
        <nav className={styles.nav}>
            {pathElems.map((elem, index) => (
              <Link href={elem.path} className={`${styles.icons} ${pathElems[index].path == path && styles.active}`}>
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
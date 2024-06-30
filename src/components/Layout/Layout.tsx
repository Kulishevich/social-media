'use client'
import { RootState } from '@/redux/store'
import React, { ReactNode } from 'react'
import styles from './Layout.module.scss'
import { useSelector } from 'react-redux'

export interface LayoutProps {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
    const themeToggle = useSelector((state: RootState) => state.theme)

  return (
    <body className={themeToggle ? styles.light : styles.dark}>
        {children}
    </body>

  )
}

export default Layout
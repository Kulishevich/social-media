'use client'
import React from 'react'
import styles from './Messages.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Chat from '../Chat/Chat'

const Messages = () => {
    const userEmail = useSelector((state: RootState) => state.user.email)
    const messages = [{
        id: 1,
        sender: 'maxim8992012@yandex.ru'
    }]




  return (
    <div className={styles.main}>
        <div className={styles.chats}>
            <div className={styles.profile}>
                <small>{userEmail}</small>
            </div>
            <div className={styles.chatsElems}>
                {messages ? 
                    messages.map((elem, index) => <p key={index}>{elem.sender}</p>)
                :
                <p>Messages not found</p>
                }
            </div>
        </div>
        
        <Chat/>
        
        <div className={styles.tools}>

        </div>
    </div>
  )
}

export default Messages
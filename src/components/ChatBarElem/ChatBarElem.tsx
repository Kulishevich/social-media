import React, { FC } from 'react'
import styles from './ChatBarElem.module.scss'
import { IChat } from '@/types/types'

const ChatBarElem: FC = ({chat}) => {
  return (
    <div className={styles.chat}>
        <h3 className={styles.chatTitle}>{chat.users[0].email}</h3>
        <p className={styles.lastMessage}>{chat.messages[0].text}</p>
    </div>
  )
}

export default ChatBarElem
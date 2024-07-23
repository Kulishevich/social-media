import React, { FC } from 'react'
import styles from './ChatBarElem.module.scss'
import { IChat } from '@/types/types'
import { useIsAuth } from '@/services/useIsAuth'

interface IChatBarElem {
  chat: IChat,
  handleActiveChat: (id: string) => void
}

const ChatBarElem: FC<IChatBarElem> = ({chat, handleActiveChat}) => {
  const { user } = useIsAuth()
  const indexLastMessage = chat.messages.length - 1

  return (
    <div className={styles.chat} onClick={() => handleActiveChat(chat.id)}>
        <h3 className={styles.chatTitle}>{user && chat.users.find(elem => elem !== user.email)}</h3>
        <p className={styles.lastMessage}>{chat.messages[indexLastMessage].text}</p>
    </div>
  )
}

export default ChatBarElem
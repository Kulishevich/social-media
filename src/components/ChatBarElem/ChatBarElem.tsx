import React, { FC } from 'react'
import styles from './ChatBarElem.module.scss'
import { IChat } from '@/types/types'
import { useIsAuth } from '@/services/useIsAuth'
import Image from 'next/image'

interface IChatBarElem {
  chat: IChat,
  handleActiveChat: (id: string) => void,
  activeChatId: string
}
  
const ChatBarElem: FC<IChatBarElem> = ({chat, handleActiveChat, activeChatId}) => {
  const { user } = useIsAuth()
  const indexLastMessage = chat.messages.length - 1

  return (
    <div className={`${styles.chat} ${chat.id === activeChatId && styles.activeChat}`} onClick={() => handleActiveChat(chat.id)}>
        <Image src='/profile.png' width={40} height={40} alt='image'/>
        <div className={styles.container}>
          <h3 className={styles.chatTitle}>{user && chat.users.find(elem => elem !== user.email)}</h3>
          <p className={styles.lastMessage}>{true ? 'Вы: ' : ''}{chat.messages[indexLastMessage].text}</p>
        </div>
    </div>
  )
}

export default ChatBarElem
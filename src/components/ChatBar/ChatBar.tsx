'use client'
import React, { useEffect, useState } from 'react'
import styles from './ChatBar.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Chat from '../Chat/Chat'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import { IChat } from '@/types/types'
import ChatBarElem from '../ChatBarElem/ChatBarElem'
import { getAuth } from 'firebase/auth'
import { useIsAuth } from '@/services/useIsAuth'

const ChatBar = () => {
    const userEmail = useSelector((state: RootState) => state.user.email)
    const [chats, setChats] = useState<IChat[]>([])
    const [activeChat, setActiveChat] = useState<number | null>(null)
    const { user } = useIsAuth()

    useEffect(() => {//получение списка чатов
      if(!user) return
      console.log(user.email)
        const chatsCollection = collection(db, "chats");
        //запрос который фильтрует входные данные со стороны сервера:
        //настроить правильно запрос на сервер!!!
        const q = query(chatsCollection, where("users", "array-contains", user.email)); 
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const chatsData: IChat[] = [];
          snapshot.forEach((doc) => {
            chatsData.push({
              id: doc.id,  // Используем id документа Firestore
              messages: doc.data().messages,
              users: doc.data().users
            });
          });
          console.log(chatsData)
          setChats(chatsData);
        });
    
        // Отписка от слушателя при размонтировании компонента
        return () => unsubscribe();
      }, [user]);


    const handleActiveChat = () => {
      
    }

  return (
    <div className={styles.main}>
        <div className={styles.chats}>
            <div className={styles.profile}>
                <small>{userEmail}</small>
            </div>
            <div className={styles.chatsElems}>
                {/* чаты */}
                {chats && chats.map((obj, index) => (
                  <ChatBarElem chat={obj} key={index}/>
                ))}
            </div>
        </div>
        
        <Chat/>
        
        <div className={styles.tools}>

        </div>
    </div>
  )
}

export default ChatBar
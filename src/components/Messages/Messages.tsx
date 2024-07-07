'use client'
import React, { useEffect, useState } from 'react'
import styles from './Messages.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Chat from '../Chat/Chat'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { IChat } from '@/types/types'

const Messages = () => {
    const userEmail = useSelector((state: RootState) => state.user.email)
    const [chats, setChats] = useState<IChat[]>([])

    useEffect(() => {//получение списка чатов
        const chatsCollection = collection(db, "chats");

        const unsubscribe = onSnapshot(chatsCollection, (snapshot) => {
          const chatsData: IChat[] = [];
          snapshot.forEach((doc) => {
            chatsData.push({
              id: doc.id,  // Используем id документа Firestore
              messages: doc.data().messages,
              users: doc.data().users
            });
          });
          setChats(chatsData);
        });
    
        // Отписка от слушателя при размонтировании компонента
        return () => unsubscribe();
      }, []);


  return (
    <div className={styles.main}>
        <div className={styles.chats}>
            <div className={styles.profile}>
                <small>{userEmail}</small>
            </div>
            <div className={styles.chatsElems}>
                {/* чаты */}
                {chats && chats.map((obj, index) => <p>{obj.id}</p>)}
            </div>
        </div>
        
        {/* <Chat/> */}
        
        <div className={styles.tools}>

        </div>
    </div>
  )
}

export default Messages
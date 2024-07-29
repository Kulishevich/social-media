'use client'
import React, { useEffect, useState } from 'react'
import styles from './ChatBar.module.scss'
import Chat from '../Chat/Chat'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import { IChat } from '@/types/types'
import ChatBarElem from '../ChatBarElem/ChatBarElem'
import { useIsAuth } from '@/services/useIsAuth'
import Image from 'next/image'
import ChatFilter from '../ChatFilter/ChatFilter'
import { SlEnvolopeLetter } from "react-icons/sl";
import Loader from '../Loader/Loader'

const ChatBar = () => {
    const [chats, setChats] = useState<IChat[]>([])
    const [activeChatId, setActiveChat] = useState<string>('') //убрал тут nul
    const { user } = useIsAuth()
    const [searchChat, setSearchChat] = useState('')
    const [loading, setLoading] = useState<boolean>(true)
    console.log(user)

    useEffect(() => {//получение списка чатов
      if(!user) return
      setLoading(true)
      console.log(user.email)
        const chatsCollection = collection(db, "chats");

        //запрос который фильтрует входные данные со стороны сервера:
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
        
      setLoading(false)
        // Отписка от слушателя при размонтировании компонента
        return () => unsubscribe();
      }, [user]);


    const handleActiveChat = (id: string) => {//выбор активного чата
      setActiveChat(id)
    }

  return (
    <div className={styles.main}>
        <div className={styles.chats}>
            <div className={styles.profile}>
              <Image src='/profile.png' width={50} height={50} alt='image'/>
              <h5>
                {user?.email}
              </h5>
            </div>
            <ChatFilter
              searchChat={searchChat}
              setSearchChat={setSearchChat}
            />
            {/* Вынести в отдельный компонент создание нового сообщения */}
            <div className={styles.createChat}>
              <SlEnvolopeLetter className={styles.createIcon}/>
              <h3>Новое сообщение: </h3>
            </div>
            <div className={styles.chatsElems}>
                {loading && <Loader/>}
                {/* чаты, фильтрация происходит по EMAIL пользователя, проверка идёт на то что-бы в поле ввода совпадало с EMAIL другого пользователя */}
                {chats && chats.filter(obj => obj.users.some(elem => elem !== user?.email && elem.includes(searchChat)))
                  .map((obj, index) => (
                    <ChatBarElem
                      chat={obj}
                      key={index}
                      handleActiveChat={handleActiveChat}
                      activeChatId={activeChatId}
                  />
                ))}
            </div>
        </div>
        
        <Chat chats={chats} activeChatId={activeChatId}/>
        
        <div className={styles.tools}>

        </div>
    </div>
  )
}

export default ChatBar
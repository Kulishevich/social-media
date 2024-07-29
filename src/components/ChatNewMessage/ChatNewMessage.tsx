'use client'
import React, { useEffect, useState } from 'react'
import styles from './ChatNewMessage.module.scss'
import { useIsAuth } from '@/services/useIsAuth'
import { User } from '@/types/types'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import Loader from '../Loader/Loader'
import Image from 'next/image'

const ChatNewMessage = ({chats}) => {
    const { user } = useIsAuth()
    const [usersList, setUsersList] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    
  useEffect(() => {//получение списка чатов
    if(!user) return
    setLoading(true)
    console.log(user.email)
      const usersCollection = collection(db, "users");

      //запрос который фильтрует входные данные со стороны сервера:
      // const q = query(usersCollection, where("users", "array-contains", user.email)); 
      const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
        const usersData: User[] = [];
        snapshot.forEach((doc) => { 
          if(user?.email !== doc.data().email){
            usersData.push({
                uid: doc.data().uid,
                email: doc.data().email
              });
          }
        });
        console.log(usersData)
        setUsersList(usersData)
        setLoading(false)
      });
      

      // Отписка от слушателя при размонтировании компонента
      return () => unsubscribe();
    }, [user]);

    const handleNewChat = async(email: string) => { //создание нового чата
        if(chats.some(obj => obj.users.includes(email))){
            alert('Чат с данным пользователем уже создан!')
            return
        }
            try {
                const docRef = await addDoc(collection(db, "chats"), {
                    messages: [],
                    users: [user?.email, email]
                });
          
                console.log("User added successfully:", docRef);
              }
              catch(e){
                console.error("Error adding new user: ", e);
              }
    }

  return (
    <div className={styles.main}>
        <div className={styles.chatName}>
            <h3>Выберите пользователя с которым хотите начать чат:</h3>
        </div>
        <div className={styles.users}>
        {loading && <Loader/>}
        {usersList.map((elem) => (
        <div key={elem.uid} className={styles.user}>
          <Image src='/profile.png' width={40} height={40} alt='image'/>
          <h3>{elem.email}</h3>
          <button onClick={() => handleNewChat(elem.email)}>Написать</button>
        </div>
        ))}
        </div>
    </div>
  )
}

export default ChatNewMessage
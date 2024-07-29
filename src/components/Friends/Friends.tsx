'use client'
import React, { useEffect, useState } from 'react'
import styles from './Friends.module.scss'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/firebase';
import { useIsAuth } from '@/services/useIsAuth'
import { User } from '@/types/types';
import Image from 'next/image';
import Loader from '../Loader/Loader';

const Friends = () => {
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
          usersData.push({
            uid: doc.data().uid,
            email: doc.data().email
          });
        });
        console.log(usersData)
        setUsersList(usersData)
        setLoading(false)
      });
      

      // Отписка от слушателя при размонтировании компонента
      return () => unsubscribe();
    }, [user]);

  return (
    <div className={styles.main}>
      {loading && <Loader/>}
      {usersList.map((elem) => (
        <div key={elem.uid} className={styles.user}>
          <Image src='/profile.png' width={140} height={140} alt='image'/>
          <p>{elem.email}</p>
          <small>{elem.uid}</small>
        </div>
        ))}
    </div>
  )
}

export default Friends
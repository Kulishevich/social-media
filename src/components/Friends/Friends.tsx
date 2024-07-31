'use client'
import React, { useEffect, useState } from 'react'
import styles from './Friends.module.scss'
import { arrayRemove, arrayUnion, collection, deleteField, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useIsAuth } from '@/services/useIsAuth'
import { User } from '@/types/types';
import Image from 'next/image';
import Loader from '../Loader/Loader';

const Friends = () => {
  const { user } = useIsAuth()
  const [usersList, setUsersList] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [friendsArr, setFriendsArr] = useState<string[]>([])
  const [mainUserId, setMainUserId] = useState<string>('')

  useEffect(() => {//получение списка чатов
    if(!user) return
    setLoading(true)
      const usersCollection = collection(db, "users");

      //запрос который фильтрует входные данные со стороны сервера:
      // const q = query(usersCollection, where("users", "array-contains", user.email)); 
      const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
        const usersData: User[] = [];
        snapshot.forEach((doc) => { 
          if(user?.email !== doc.data().email){
            usersData.push({
                uid: doc.id,
                email: doc.data().email,
                friends: doc.data().friends
              });
          }
          if(user?.email === doc.data().email){
            setFriendsArr(doc.data().friends)
            setMainUserId(doc.id)
          }
        });
        console.log(usersData)
        setUsersList(usersData)
        setLoading(false)
      });
      

      // Отписка от слушателя при размонтировании компонента
      return () => unsubscribe();
    }, [user]);

  const addFriend = async(email: string) => { //добавление в друзья
    console.log(email)
    // return
    try{
      const chatRef = doc(db, "users", mainUserId)
      await updateDoc(chatRef, {
        friends: arrayUnion(email)
      })

      console.log("Friend added successfully");
    }
    catch(e){
      console.error("Error adding friend: ", e);
    }
  }

  const removeFriend = async(email: string) => {//удаление из друзей
    console.log(email)

    const friendsRef = doc(db, 'users', mainUserId);

    // Remove the 'capital' field from the document
    await updateDoc(friendsRef, {
      friends: arrayRemove(email)
    });
  }

  return (
    <div className={styles.main}>
      <div className={styles.friendsContainer}>
        <h3>Список друзей</h3>
        {loading && <Loader/>}
        <div className={styles.friends}>
          {usersList.filter(obj => friendsArr.includes(obj.email)).map(elem => (
          <div key={elem.uid} className={styles.friend}>
            <Image src='/profile.png' width={50} height={50} alt='image'/>
            <div>
              <p>{elem.email}</p>
              <button onClick={() => removeFriend(elem.email)}>Удалить из друзей</button>
            </div>
          </div>
          ))}
        </div>
      </div>
      <div className={styles.usersContainer}>
        {loading && <Loader/>}
        {usersList.filter(obj => !friendsArr.includes(obj.email)).map((elem) => (
          <div key={elem.uid} className={styles.user}>
            <Image src='/profile.png' width={140} height={140} alt='image'/>
            <p>{elem.email}</p>
            <button onClick={() => addFriend(elem.email)}>Добавить в друзья</button>
          </div>
          ))}
      </div>
    </div>
  )
}

export default Friends
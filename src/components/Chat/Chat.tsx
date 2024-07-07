'use client'
import React, { useEffect, useState } from 'react'
import styles from './Chat.module.scss'
import { FaPaperclip, FaMicrophone } from "react-icons/fa";
import { BiSticker, BiSolidSend } from "react-icons/bi";
import { SubmitHandler, useForm } from 'react-hook-form';
import '../../firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase';
import { Message } from '@/types/types';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

type Input = {
  text: string
}

const Chat = () => {
  const { register, handleSubmit } = useForm<Input>()

  useEffect(() => {
    const fetchMessages = async() => {
      const querySnapshot = await getDocs(collection(db, "chats"));
      querySnapshot.forEach((doc) => {
        console.log(doc.data().messages);
      });
    }

    fetchMessages()
  }, [])

  // const auth = getAuth()

  // ПРОВЕРКА НА АВТОРИЗАЦИЮ, можно сделать без redux
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       console.log('User is not authenticated');
  //     }
  //   });
  // }, []);

  const onSubmit: SubmitHandler<Input> = async(data) => { //ИНПУТ, отправка сообщений
    //добавление нового сообщения
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        id: "dasdcxzc123",
        text: data.text,
        sender: 'maxim8992012@yandex.ru',
        createdAt: '12.05.2023'
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    //получения данных о чатах
    const querySnapshot = await getDocs(collection(db, "chats")); 
    querySnapshot.forEach((doc) => {
      console.log(doc.data())
    });

  }



  return (
    <div className={styles.main}>
      <div className={styles.chatName}>
        <h2>maxim8992012@gmail.com</h2>
      </div>
      <div className={styles.messages}>
    
      </div>
      <div className={styles.textarea}>
        <FaPaperclip className={styles.icon}/>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input 
            type="text" 
            placeholder='Enter message'
            {...register("text")}
          />
          <button type='submit'>
            <BiSolidSend className={styles.icon}/>
          </button>
        </form>
        <BiSticker className={styles.icon}/>
        <FaMicrophone className={styles.icon}/>
      </div>
    </div>
  )
}

export default Chat
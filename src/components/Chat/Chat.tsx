'use client'
import React, { useEffect } from 'react'
import styles from './Chat.module.scss'
import { FaPaperclip, FaMicrophone } from "react-icons/fa";
import { BiSticker, BiSolidSend } from "react-icons/bi";
import { SubmitHandler, useForm } from 'react-hook-form';
import '../../firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

type Input = {
  text: string
}

const Chat = () => {
  const { register, handleSubmit } = useForm<Input>()
  // const auth = getAuth()

  // ПРОВЕРКА НА АВТОРИЗАЦИЮ, можно сделать без redux
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       console.log('User is not authenticated');
  //     }
  //   });
  // }, []);

  const onSubmit: SubmitHandler<Input> = async(data) => {
    // console.log(data.text)

    const querySnapshot = await getDocs(collection(db, "messages"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data())
    });
  }

  return (
    <div className={styles.main}>
      <div className={styles.chatName}>
1
      </div>
      <div className={styles.messages}>
2
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
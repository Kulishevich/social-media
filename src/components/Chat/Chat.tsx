'use client'
import React from 'react'
import styles from './Chat.module.scss'
import { FaPaperclip, FaMicrophone } from "react-icons/fa";
import { BiSticker, BiSolidSend } from "react-icons/bi";
import { SubmitHandler, useForm } from 'react-hook-form';
import '../../firebase'
import { collection, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../firebase';
import { useIsAuth } from '@/services/useIsAuth';

type Input = {
  text: string
}

const Chat = ({chats, activeChatId}) => {
  const { register, handleSubmit } = useForm<Input>()
  const { user, loading } = useIsAuth()
  const activeChat = chats.find(obj => obj.id === activeChatId) 

  const onSubmit: SubmitHandler<Input> = async(data) => { //ИНПУТ, отправка сообщений
    
    try{
      const chatRef = doc(db, "chats", activeChatId)

      await updateDoc(chatRef, {
        messages: arrayUnion({
          text: data.text,
          sender: user?.email,
          createdAt: new Date() // добавляем дату создания сообщения
        })
      })

      console.log("Message added successfully");
    }
    catch(e){
      console.error("Error adding message: ", e);
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
        <h2>{activeChat && activeChat.users.find(elem => elem !== user.email)}</h2>
      </div>
      <div className={styles.messages}>
        {activeChat && activeChat.messages.map(elem => (
          <div className={styles.container} style={{justifyContent: `${elem.sender === user?.email ? 'right' : 'left'}`}}>
            <div className={styles.message}>
              <small>{elem.sender}</small>
              {/* <small>{elem.createdAt}</small> */}
              <p>{elem.text}</p>    
            </div>
          </div>
        ))}
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
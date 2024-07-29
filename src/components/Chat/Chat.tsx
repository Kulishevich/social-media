'use client'
import React from 'react'
import styles from './Chat.module.scss'
import { FaPaperclip, FaMicrophone } from "react-icons/fa";
import { BiSticker, BiSolidSend } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { SubmitHandler, useForm } from 'react-hook-form';
// import '../../firebase'
import { collection, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../firebase';
import { useIsAuth } from '@/services/useIsAuth';
import Image from 'next/image';

type Input = {
  text: string
}

const Chat = ({chats, activeChatId}) => {
  const { register, handleSubmit, reset } = useForm<Input>()
  const { user, loading } = useIsAuth()
  const activeChat = chats.find(obj => obj.id === activeChatId) 
  const participant = activeChat && activeChat.users.find(elem => elem !== user.email)

  const onSubmit: SubmitHandler<Input> = async(data) => { //ИНПУТ, отправка сообщений
    if(!data.text) {
      alert('Введите сообщение!')
      return 
    }
    if(!activeChatId) {
      alert('Выберете чат')
      return 
    }
    try{
      const chatRef = doc(db, "chats", activeChatId)
      const { text } = data
      reset() //очистка поля инпута
      await updateDoc(chatRef, {
        messages: arrayUnion({
          text: text,
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
        {activeChat && 
          <div className={styles.chatNameContainer}>
            <Image src='/profile.png' width={50} height={50} alt='image'/>
            <div>
              <h2>{participant}</h2>
              <small>{activeChat.messages.length} messages</small>
            </div>
          </div>
        }
      </div>
      <div className={styles.messages}> 
        {activeChat && activeChat.messages.map(elem => (
          <div className={styles.container} style={{justifyContent: `${elem.sender === user?.email ? 'right' : 'left'}`}}>
            {/* костыль: ниже две строки почти одинаковы, в которых мы проверяем отправителя, можно сделать было через css но мне лень */}
            {elem.sender !== user?.email && <Image src='/profile.png' width={30} height={30} alt='image'/>}
            <div 
              className={styles.message} 
              style={{
                backgroundColor: `${elem.sender === user?.email ? '#6D3AFD' : '#1A2332'}`, 
                color: `${elem.sender === user?.email ? 'white' : ''}` }}
            >
              <small>от : {elem.sender}</small><br/>
              <p>{elem.text}</p>
              <small>{elem.createdAt && new Date(elem.createdAt.seconds * 1000).toLocaleString()}</small>
            </div>
            {elem.sender === user?.email && <Image src='/profile.png' width={30} height={30} alt='image'/>}
          </div>
        ))}
      </div>
      {activeChat && <div className={styles.textarea}>
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
      </div>}
    </div>
  )
}

export default Chat

// список друзей [ ]
// добавить аватарки [+-]
// debounce в поиске [ ]
// верстка + анимации + стили - сделать красоту [ ]
// рефакторинг [ ]
// типизация [ ] 
//колесо чата! [ ]
//разнести ко компонентам! [ ]
//сохранение юзеров в БД надо сделать
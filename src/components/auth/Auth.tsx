'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styles from './Auth.module.scss'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import '../../firebase'
import { useRouter } from 'next/navigation'
import { useIsAuth } from '@/services/useIsAuth'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import Loader from '../Loader/Loader'

const Auth = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { user, loading } = useIsAuth()
    
    if(user){
        router.push('/messages')
    }

    const signIn = (data: any) => { // вход
        console.log('sighIn')
        const auth = getAuth()
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then(({user}) => {
            alert('Вход выполнен успешно!')
            // dispatch(setUser({
            //     id: user.uid,
            //     token: user.accessToken,
            //     email: user.email,
            // }))
            router.push('/messages')
            console.log(11)
        })
        .catch(() => alert('Неверный логин или пароль!'))
    }

    const signUp = (data: any) => { //регистрация
        console.log('sighUp')
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(({user}) => {
            console.log(user)
            alert('Регистрация прошла успешно')
            //тут нужно записывать user'а в коллекцию
            
            const addNewUser = async() => {
                try {
                    const docRef = await addDoc(collection(db, "users"), {
                        email: user.email,
                        uid: user.uid
                    });
              
                    console.log("User added successfully:", docRef);
                  }
                  catch(e){
                    console.error("Error adding new user: ", e);
                  }
            }

            addNewUser()
        })
        .catch(error => {
            console.log(error)
            alert('Ошибка регистрации')
        })
    }

  return (
        <div className={styles.container}>
             {loading ? <Loader/> : <form className={styles.form}>
                <h1 className={styles.title}>Log in</h1>
                <input placeholder='Email' type="email" {...register("email")}/>
                <input placeholder='Password' type="password" {...register("password")}/>
                <div className={styles.buttons}>
                    <button 
                        type='submit' 
                        className={styles.btn1}
                        onClick={handleSubmit(signIn)}
                    >
                        Войти
                    </button>
                    <button 
                        type='button' 
                        className={styles.btn2}
                        onClick={handleSubmit(signUp)}
                    >
                        Зарегистрироваться
                    </button>
                </div>
            </form>}
        </div>
  )
}

export default Auth
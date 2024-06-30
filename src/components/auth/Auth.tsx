'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './Auth.module.scss'
import { setUser } from '@/redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import '../../firebase'

const Auth = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const signIn = (data: any) => {
        console.log('sighIn')
        const auth = getAuth()
        console.log(auth)
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then(console.log)
        .catch(console.error)
    }

    const signUp = (data: any) => {
        console.log('sighUp')
        const auth = getAuth()
        console.log(auth)
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(console.log)
        .catch(console.error)
    }

  return (
        <div className={styles.container}>
            <form className={styles.form}>
                <input placeholder='Email' type="email" {...register("email")}/>
                <input placeholder='Password' type="password" {...register("password")}/>
                <div>
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
            </form>
        </div>
  )
}

export default Auth
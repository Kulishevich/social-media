'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './Auth.module.scss'
import { setUser } from '@/redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import '../../firebase'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'

const Auth = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const userElem = useSelector((state: RootState) => state.user)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const signIn = (data: any) => { // вход
        console.log('sighIn')
        const auth = getAuth()
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then(({user}) => {
            alert('Вход выполнен успешно!')
            dispatch(setUser({
                id: user.uid,
                //@ts-ignore
                token: user.accessToken,
                email: user.email,
            }))
            router.push('/messages')
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
        })
        .catch(error => {
            console.log(error)
            alert('Ошибка регистрации')
        })
    }

  return (
        <div className={styles.container}>
            <form className={styles.form}>
                <h1 className={styles.title}>Login</h1>
            <small>{userElem.email}</small><br/>
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
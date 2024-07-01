'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './Auth.module.scss'
import { setUser } from '@/redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import '../../firebase'
import { RootState } from '@/redux/store'

const Auth = () => {
    const dispatch = useDispatch()
    const userElem = useSelector((state: RootState) => state.user)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const signIn = (data: any) => {
        console.log('sighIn')
        const auth = getAuth()
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then(console.log)
        .catch(() => alert('Неправильный логин или пароль!'))
        console.log(userElem)
    }
//суть в том, что нужно сделать так чтобы при регистрации мы ничего и никуда не добавляли, тк всё добавляется на firebase, но при 
// при sing in должна происходить проверка, а если не ошибаюсь там просто должен вернуться user в случае успешной авторизации
// и соотвтетсвенно мы user который возвращается записываем в redux! и входим в аккаунт! пока так
    const signUp = (data: any) => {
        console.log('sighUp')
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(({user}) => {
            dispatch(setUser({
                id: user.uid,
                token: user.accessToken,
                email: user.email,
            }))
        })
        .catch(console.error)
    }

  return (
        <div className={styles.container}>
            <form className={styles.form}>
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
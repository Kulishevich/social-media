import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

export const useIsAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // console.log(user) 
            // console.log('User email:' + user?.email)
            // console.log('User id:' + user?.uid)
            setUser(user)
        });
        setLoading(false)
        return () => unsubscribe()
    }, [])

    return { user, loading }
}

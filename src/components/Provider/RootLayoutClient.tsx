'use client'
import { store } from '@/redux/store'
import React, { Children } from 'react'
import { Provider } from 'react-redux'
import { LayoutProps } from '../Layout/Layout'



const RootLayoutClient = ({children}: LayoutProps) => {
  return (
        <Provider store={store}>
            {children}
        </Provider>
  )
}

export default RootLayoutClient
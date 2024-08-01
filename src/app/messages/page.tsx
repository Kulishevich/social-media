import React from 'react'
import styles from './page.module.scss'
import ChatBar from '@/components/ChatBar/ChatBar'
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader/Loader';

const Messages = dynamic(() => import('../../components/ChatBar/ChatBar'), {
  loading: () => <Loader/>, // Компонент-заполнитель, отображаемый во время загрузки
  ssr: false, // Отключение серверного рендеринга для этого компонента (опционально)
});

const page = () => {
  return (
    <Messages/>
  )
}

export default page
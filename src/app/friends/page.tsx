import Friends from '@/components/Friends/Friends'
import Loader from '@/components/Loader/Loader';
import dynamic from 'next/dynamic';
import React from 'react'

const FriendsPage = dynamic(() => import('../../components/Friends/Friends'), {
  loading: () => <Loader/>, // Компонент-заполнитель, отображаемый во время загрузки
  ssr: false, // Отключение серверного рендеринга для этого компонента (опционально)
});

const page = () => {
  return (
    <FriendsPage/>
  )
}

export default page
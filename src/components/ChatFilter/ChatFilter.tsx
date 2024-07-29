import React from 'react'
import styles from './ChatFilter.module.scss'
import { FaMagnifyingGlass } from "react-icons/fa6";
import debounce from "lodash.debounce"

const ChatFilter = ({searchChat, setSearchChat}) => {
    // const handleSearchValue = (e) => {
    //     const inputValue = e.target.value
    //     debounce(() => {
    //         console.log(1)
    //         setSearchChat(inputValue)
    //     }, 1000)()
    //     console.log(searchChat)
    // }

  return (
    <div className={styles.filter}>
        <FaMagnifyingGlass className={styles.glassIcon}/>
        <input
          placeholder='Поиск по чатам'
          value={searchChat}
          onChange={(e) => setSearchChat(e.target.value)}
        />
    </div>
  )
}

export default ChatFilter
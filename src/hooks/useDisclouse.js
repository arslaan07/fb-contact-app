import React, { useRef, useState } from 'react'

const useDisclouse = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const isNewUserRef = useRef();
  const onOpen = () => {
    setIsOpen(true)
  }
  const onClose = () => {
    setIsOpen(false)
  }
  return { isOpen, onOpen, onClose, isNewUser, setIsNewUser, isNewUserRef }
}

export default useDisclouse

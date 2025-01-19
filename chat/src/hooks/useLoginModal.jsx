import { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { userService } from '../user.service.local'

export function useLoginModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    // const navigate = useNavigate()
    // const loggedinUser = userService.getLoggedinUser()

    // useEffect(() => {
    //     if (loggedinUser) {
    //         navigate('/')
    //     }
    // }, [loggedinUser, navigate])

    function LoginModal() {
        if (!isOpen) return null

        return (
            <div className="login-modal-overlay" onClick={(ev) => {
                if (ev.target === ev.currentTarget) closeLoginModal()
            }}>
                <div className="login-modal-container">
                    <button className="close-button" onClick={closeLoginModal}>
                        <IoMdClose />
                    </button>
                    {modalContent}
                </div>
            </div>
        )
    }

    function openLoginModal(content) {
        setModalContent(content)
        setIsOpen(true)
    }

    function closeLoginModal() {
        setIsOpen(false)
        setModalContent(null)
    }

    return { LoginModal, openLoginModal, closeLoginModal }
}
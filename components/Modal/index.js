import styled from 'styled-components'
import { Close } from '@material-ui/icons'
import { useRef, useEffect, useCallback } from 'react'

const Background = styled.div`
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;  
`

const ModalWrapper = styled.div`
    width: 800px;
    height: 800px:
    box-shadow 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    z-index: 10;
    border-radius: 10px;
`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: #141414;
    p {
    margin-bottom: 1rem;
    }
`

const CloseModalButton = styled(Close)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
`

const Divider = styled.div`
    border-top: 3px solid #bbb;
`

const Modal = ({ showModal, setShowModal }) => {
    const modalRef = useRef()

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowModal(false)
        }
    }

    const keyPress = useCallback((e) => {
        if (e.key === 'Escape' && showModal) {
            setShowModal(false)
        }
    }, [setShowModal, showModal])

    useEffect(() => {
        document.addEventListener('keydown', keyPress)
        return () => document.removeEventListener('kaydown', keyPress)
    }, [keyPress])

    return (
        <>
            { showModal ? (
                <Background ref={modalRef} onClick={closeModal}>
                    <div style={{
                        border: '1px solid lightgrey', height: 600, overflowY: 'scroll'
                    }}
                    >
                        <ModalWrapper showModal={showModal}>
                            <ModalContent>
                                <h1>Preferências</h1>
                                <Divider />
                                <p>Teste again</p>
                                <Divider />
                                <p>Teste again</p>
                                <p>Teste again</p>
                                <p>Teste again</p>
                                <p>Teste again</p>
                                <p>Teste again</p>
                                <p>Teste again</p>
                                <p>Teste again</p>
                                <p>Teste again</p>
                                <p>Teste again</p>
                                <p>Teste again</p>
                                <p>Teste again</p>
                                <p>Teste again</p>
                                <p>Teste again</p>
                                <p>Teste again</p>
                                <p>Teste again</p>
                                <p>Teste again</p>
                                <p>Teste again</p>
                                <p>Teste again</p>
                            </ModalContent>
                            <CloseModalButton aria-label="Close modal" onClick={() => setShowModal((prev) => !prev)} />
                        </ModalWrapper>
                    </div>
                </Background>
            ) : null}
        </>
    )
}

export default Modal

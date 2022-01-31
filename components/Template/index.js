import Head from 'next/head'
import styled from 'styled-components'
import UserThumb from 'components/UserThumb'
import Image from 'next/image'
import logo from 'public/logo_unifesp_2.png'
import MenuButton from './MenuButton'

const InnerBox = styled.div`
    flex: 1;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
`

const TopBar = styled.div`
    z-index: 1000;
    min-width: 100%;
    background-color: white;
    border-bottom: 1px solid lightgray;
    align-items: center;
    padding: 10px;
    display: flex;
    justify-content: space-between;
`

const Content = styled.div`
    padding: 10px;
    margin: 5px;
    background-color: white;
    border: 1px solid lightgray;
    min-height: 100%;
    flex: 1;
    position: relative;
`

const Template = ({ children, selected, title }) => (
    <>
        {title && <Head><title>{title}</title></Head>}
        <div style={{
            position: 'absolute', display: 'flex', minWidth: '100%', minHeight: '100%', flexDirection: 'column'
        }}
        >
            <TopBar>
                <div style={{ display: 'flex', flex: 1 }}>
                    <MenuButton selected={selected === 'Histórico'} goto="/historico">Histórico</MenuButton>
                    <MenuButton selected={selected === 'Matriz'} goto="/matriz">Matriz</MenuButton>
                    <MenuButton selected={selected === 'Amigos'} goto="/amigos">Amigos</MenuButton>
                </div>
                <div style={{ maxWidth: 150 }}><Image src={logo} /></div>
                <div style={{ flex: 1 }}><UserThumb /></div>
            </TopBar>
            <InnerBox>
                <Content>
                    {children}
                </Content>
            </InnerBox>
        </div>
    </>
)

export default Template

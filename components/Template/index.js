import Menu from 'components/Menu'
import styled from 'styled-components'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { useState } from 'react'
import Button from '@material-ui/core/Button'

const Sidebar = styled.div`
    width: ${(props) => (props.visible ? '10%' : '24px')};
    min-width: ${(props) => (props.visible ? '125px' : '0px')};
    min-height: 100%;
    background-color: white;
    z-index: 1;
    border-right: 1px solid rgba(59, 74, 122, 0.3);
    transition: 0.3s;
`

const InnerBox = styled.div`
    flex: 1;
`

const TopBar = styled.div`
    width: 100%;
    height: 50px;
    background-color: white;
    border-bottom: 1px solid rgba(59, 74, 122, 0.3);
`

const Content = styled.div`
    padding: 10px;
    margin: 15px;
    background-color: white;
    border: 1px solid rgba(59, 74, 122, 0.3);
`

const Template = ({ children, selected }) => {
    const [menuVisible, setMenuVisible] = useState(true)

    const hideMenu = (event) => {
        event.preventDefault()
        setMenuVisible(!menuVisible)
    }

    return (
        <>
            <div style={{
                position: 'absolute', display: 'flex', minWidth: '100%', minHeight: '100%'
            }}
            >
                <Sidebar visible={menuVisible}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ flex: 1 }}>{menuVisible ? <Menu selected={selected} /> : ''}</div>
                        <Button fullWidth style={{ justifyContent: 'flex-end', minWidth: 0, paddingRight: !menuVisible && 0 }} onClick={hideMenu}>{ menuVisible ? <ChevronLeft /> : <ChevronRight /> }</Button>
                    </div>
                </Sidebar>
                <InnerBox>
                    <TopBar />
                    <Content>
                        {children}
                    </Content>
                </InnerBox>
            </div>
        </>
    )
}

export default Template

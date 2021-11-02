import { Avatar } from '@material-ui/core'
import { KeyboardArrowDown } from '@material-ui/icons'
import { useEffect, useState } from 'react'

const UserThumb = () => {
    const [username, setUsername] = useState('')

    useEffect(() => {
        setUsername(localStorage.getItem('username') || 'Nome do usuário')
    }, [])

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            {username}
            <div style={{ marginLeft: 5 }}><Avatar src="/logo_unifesp.png" /></div>
            <KeyboardArrowDown />
        </div>
    )
}

export default UserThumb

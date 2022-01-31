import { Avatar } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'

const UserThumb = () => {
    const router = useRouter()
    const [username, setUsername] = useState('')

    useEffect(() => {
        setUsername(localStorage.getItem('username') || 'Nome do usuário')
    }, [])

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            {username}
            <div style={{ marginLeft: 5 }}><Avatar src="/logo_unifesp.png" /></div>
            <ExitToApp
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    router.push('/')
                }}
            />
        </div>
    )
}

export default UserThumb

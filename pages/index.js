import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core'
import request from 'utils/request'
import { prop } from 'lodash/fp'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import Image from 'next/image'
import logo from 'public/logo_unifesp.png'

const Login = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    return (
        <div style={{
            margin: 'auto', textAlign: 'center', width: 360, backgroundColor: 'white', padding: 40, borderRadius: 20, border: '1px solid lightgray'
        }}
        >
            <div style={{ width: '100%', padding: 20 }}><Image alt="BID Gerenciamento" src={logo} /></div>
            <form
                onSubmit={async (event) => {
                    event.preventDefault()

                    setLoading(true)

                    const username = prop('target.username.value', event)
                    const password = prop('target.password.value', event)
                    try {
                        const response = await request.post('/authentication', { username, password })
                        const token = prop('data.token', response)

                        // request.defaults.headers.common.Authorization = `Bearer ${token}`
                        localStorage.setItem('token', token)

                        localStorage.setItem('username', username)

                        router.push('/inicio')
                    } catch (err) {
                        // eslint-disable-next-line no-alert
                        alert(err)
                    }
                    setLoading(false)
                }}
            >
                <TextField
                    id="username"
                    label="Usuário"
                    variant="outlined"
                    size="small"
                    style={{
                        width: '100%',
                        marginBottom: 20
                    }}
                />
                <TextField
                    id="password"
                    label="Senha"
                    type="password"
                    variant="outlined"
                    size="small"
                    style={{
                        width: '100%',
                        marginBottom: 20
                    }}
                />
                <Button variant="contained" color="primary" type="submit">{loading ? 'Entrando...' : 'Entrar'}</Button>
            </form>
        </div>
    )
}

export default Login

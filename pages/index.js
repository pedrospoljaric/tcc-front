import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core'
import request from 'utils/request'
import { prop } from 'lodash/fp'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'

const Login = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    return (
        <div style={{ margin: 'auto', textAlign: 'center', width: 300 }}>
            <form
                onSubmit={async (event) => {
                    event.preventDefault()

                    setLoading(true)

                    const username = prop('target.username.value', event)
                    const password = prop('target.password.value', event)
                    try {
                        const response = await request.post('/authentication', { username, password })

                        request.defaults.headers.common.Authorization = `Bearer ${prop('data.token', response)}`

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
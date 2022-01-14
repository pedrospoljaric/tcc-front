import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { useState } from 'react'
import Template from 'components/Template'
import request from 'utils/request'
import { prop } from 'lodash/fp'
import { useRouter } from 'next/dist/client/router'

const Card = styled.div`
    margin: 'auto',
    textAlign: 'center',
    width: 360, 
    backgroundColor: 'white', 
    padding: 40, 
    borderRadius: 20, 
    border: '1px solid lightgray'
`

const Preferencias = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    return (

        <Template selected="Preferencias">

            <div style={{
                display: 'flex', textAlign: 'center', backgroundColor: 'white', padding: 40, borderRadius: 20, border: '1px solid lightgray', alignItems: 'center', justifyContent: 'space-between'
            }}
            >

                <form
                    onSubmit={async (event) => {
                        event.preventDefault()

                        setLoading(true)

                        const username = prop('target.username.value', event)
                        const password = prop('target.password.value', event)

                        await request.post('/preferences', {
                            username,
                            password
                        })

                        router.push('/preferences')

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
                </form>
            </div>
            <div style={{
                display: 'flex', textAlign: 'center', backgroundColor: 'white', padding: 5, alignItems: 'center', justifyContent: 'space-between'
            }}
            />

            <div style={{
                display: 'flex', textAlign: 'center', backgroundColor: 'white', padding: 40, borderRadius: 20, border: '1px solid lightgray', alignItems: 'center', justifyContent: 'space-between'
            }}
            />
            <div style={{
                display: 'flex', textAlign: 'center', backgroundColor: 'white', padding: 5, alignItems: 'center', justifyContent: 'space-between'
            }}
            />
            <div style={{
                display: 'flex', textAlign: 'center', backgroundColor: 'white', padding: 5, alignItems: 'center', justifyContent: 'space-between'
            }}
            >
                <Button variant="contained" color="primary" type="submit">{loading ? 'Enviando...' : 'Enviar'}</Button>
            </div>
        </Template>
    )
}

export default Preferencias

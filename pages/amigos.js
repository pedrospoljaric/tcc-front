/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, TextField } from '@material-ui/core'
import Template from 'components/Template'
import FriendCard from 'components/FriendCard'
import { prop } from 'lodash/fp'
import { useEffect, useState } from 'react'
import request from 'utils/request'

const Amigos = () => {
    const [usernameToFind, setUsernameToFind] = useState()
    const [friendshipRequests, setFriendshipRequests] = useState([])
    const [friends, setFriends] = useState([])

    useEffect(async () => {
        const responseFriendshipRequests = await request.get('/friendships/requests')
        const gottenFriendshipRequests = prop('data.requests', responseFriendshipRequests) || []
        setFriendshipRequests(gottenFriendshipRequests)

        const responseFriends = await request.get('/friendships/friends')
        const gottenFriends = prop('data.friends', responseFriends) || []
        setFriends(gottenFriends)
    }, [])

    return (
        <Template selected="Amigos">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    label="Adicionar amigo"
                    size="small"
                    variant="outlined"
                    value={usernameToFind}
                    onChange={(event) => { setUsernameToFind(event.target.value) }}
                    style={{
                        width: '100%', marginBottom: 5, flex: 1, marginRight: 10, marginTop: 5
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={async (event) => {
                        event.preventDefault()

                        try {
                            await request.post('/friendships/requests', { destinationUsername: usernameToFind })
                            alert('Solicitação enviada')
                            setUsernameToFind('')
                        } catch (err) {
                            alert(err)
                        }
                    }}
                >
                    Adicionar
                </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                <div style={{ width: '48%' }}>
                    <div style={{ textAlign: 'center' }}>Solicitações pendentes</div>
                    <div style={{
                        border: '1px solid lightgray',
                        borderRadius: 5,
                        padding: 5,
                        marginTop: 5
                    }}
                    >
                        {friendshipRequests.length === 0
                            ? (
                                <div style={{
                                    fontSize: 12, color: 'gray', textAlign: 'center', marginTop: 5, marginBottom: 5
                                }}
                                >
                                    Não há solicitações pendentes
                                </div>
                            )
                            : friendshipRequests.map((friendshipRequest) => (
                                <FriendCard
                                    user={prop('user', friendshipRequest)}
                                    replyRequest={async (accept) => {
                                        const requestId = prop('id', friendshipRequest)
                                        await request.put(`/friendships/requests/${requestId}`, { accept })

                                        const currentFriendshipRequests = [...friendshipRequests].filter((req) => prop('id', req) !== requestId)
                                        setFriendshipRequests(currentFriendshipRequests)

                                        if (accept) setFriends([...friends, prop('user', friendshipRequest)])
                                    }}
                                />
                            ))}
                    </div>
                </div>
                <div style={{ width: '48%' }}>
                    <div style={{ textAlign: 'center' }}>Amigos</div>
                    <div style={{
                        border: '1px solid lightgray',
                        borderRadius: 5,
                        padding: 5,
                        marginTop: 5
                    }}
                    >
                        {friends.length === 0
                            ? (
                                <div style={{
                                    fontSize: 12, color: 'gray', textAlign: 'center', marginTop: 5, marginBottom: 5
                                }}
                                >
                                    Nenhum amigo adicionado
                                </div>
                            )
                            : friends.map((friend) => (
                                <FriendCard user={friend} />
                            ))}
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default Amigos

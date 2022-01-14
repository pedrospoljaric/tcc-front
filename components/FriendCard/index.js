/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { prop } from 'lodash/fp'
import { Tooltip, Button } from '@material-ui/core'
import { Person } from '@material-ui/icons'

const FriendCard = ({ user, replyRequest }) => {
    const { username } = user

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid lightgray',
                padding: 5,
                borderRadius: 5,
                fontSize: '10pt',
                cursor: 'default',
                alignItems: 'flex-start'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Tooltip key={prop('id', user)} enterDelay={500} disableFocusListener arrow placement="top" title={<div style={{ fontSize: 14, padding: 2 }}>{username}</div>}>
                    <div style={{
                        maxWidth: '100%', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflowX: 'hidden'
                    }}
                    >
                        <Person style={{ fill: 'rgba(33, 90, 54, 0.45)' }} />
                        {username}
                    </div>
                </Tooltip>
                {replyRequest && (
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={(event) => {
                                event.preventDefault()
                                replyRequest(true)
                            }}
                            style={{ marginRight: 5 }}
                        >
                            Aceitar
                        </Button>
                        <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            onClick={(event) => {
                                event.preventDefault()
                                replyRequest(false)
                            }}
                        >
                            Recusar
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FriendCard

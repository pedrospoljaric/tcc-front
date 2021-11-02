import { prop } from 'lodash/fp'
import styled from 'styled-components'
import { Tooltip } from '@material-ui/core'
import { Person } from '@material-ui/icons'

const Chip = styled.div`
    padding: 5px;
    border-radius: 10px;
    background-color: rgba(33, 90, 54, 0.3);
    font-size: 9pt;
    text-align: center;
`

const dayOfTheWeekName = {
    0: 'DOM',
    1: 'SEG',
    2: 'TER',
    3: 'QUA',
    4: 'QUI',
    5: 'SEX',
    6: 'SAB'
}

const ClassCard = ({ classroom = {} }) => {
    const { discipline, teachers, meetingTimes } = classroom

    return (
        <div style={{
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
            <Tooltip enterDelay={500} disableFocusListener arrow placement="top" title={<div style={{ fontSize: 14, padding: 2 }}>{`${prop('name', classroom)} - ${prop('name', discipline)}`}</div>}>
                <div style={{
                    width: '100%',
                    maxWidth: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
                >
                    <div style={{ flex: 1, whiteSpace: 'nowrap', overflowX: 'hidden' }}>{prop('name', discipline)}</div>
                    <Chip style={{ marginLeft: 5 }}>{prop('name', classroom)}</Chip>
                </div>
            </Tooltip>
            {teachers && teachers.map((teacher) => (
                <Tooltip key={prop('id', teacher)} enterDelay={500} disableFocusListener arrow placement="top" title={<div style={{ fontSize: 14, padding: 2 }}>{prop('name', teacher)}</div>}>
                    <div style={{
                        maxWidth: '100%', marginBottom: 5, display: 'flex', alignItems: 'center'
                    }}
                    >
                        <Person style={{ fill: 'rgba(33, 90, 54, 0.45)' }} />
                        {prop('name', teacher)}
                    </div>
                </Tooltip>
            ))}
            <div style={{ display: 'flex' }}>
                {meetingTimes && meetingTimes.map((meetingTime, index) => (
                    <Chip key={prop('id', meetingTime)} style={{ marginLeft: index !== 0 ? 5 : 0 }}>
                        {`${dayOfTheWeekName[prop('dayOfTheWeek', meetingTime)]} ${prop('startTime', meetingTime).slice(0, -3)}`}
                    </Chip>
                ))}
            </div>
        </div>
    )
}

export default ClassCard

import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem, Select, TextField
} from '@material-ui/core'
import { prop } from 'lodash/fp'
import { useState } from 'react'
import styled from 'styled-components'

const Row = styled.div`
    display: flex;
    align-items: center;
`

const daysNames = {
    0: 'DOM',
    1: 'SEG',
    2: 'TER',
    3: 'QUA',
    4: 'QUI',
    5: 'SEX',
    6: 'SAB'
}

const formatMeetingTime = (meetingTime) => {
    const day = daysNames[prop('dayOfTheWeek', meetingTime)]
    const startTime = prop('startTime', meetingTime).slice(0, -3)
    const endTime = prop('endTime', meetingTime).slice(0, -3)
    return `${day} ${startTime}-${endTime}`
}

const CreateClassCard = ({
    classInfo, disciplines, meetingTimes, teachers
}) => {
    const [selectedDisciplineId, setSelectedDisciplineId] = useState(prop('discipline.id', classInfo) || '')
    const [selectedMeetingTimeId, setSelectedMeetingTimeId] = useState(prop('meetingTime.id', classInfo) || '')
    const [selectedTeachersIds, setSelectedTeachersIds] = useState((prop('teachers', classInfo) || []).map(prop('id')))
    const [classroomName, setClassroomName] = useState(prop('className', classInfo))

    return (
        <>
            <input readOnly id={`disciplineId_${classInfo.customId}`} value={selectedDisciplineId} style={{ display: 'none' }} />
            <input readOnly id={`teachersIds_${classInfo.customId}`} value={selectedTeachersIds} style={{ display: 'none' }} />
            <input readOnly id={`name_${classInfo.customId}`} value={classroomName} style={{ display: 'none' }} />
            <input readOnly id={`meetingTimeId_${classInfo.customId}`} value={selectedMeetingTimeId} style={{ display: 'none' }} />
            <div style={{
                borderBottom: '1px solid lightgrey', padding: 10
            }}
            >
                <Row>
                    <TextField
                        select
                        label="Disciplina"
                        style={{ flex: 1 }}
                        size="small"
                        error={!selectedDisciplineId}
                        helperText={!selectedDisciplineId ? prop('discipline.raw', classInfo) : ''}
                        variant="outlined"
                        value={selectedDisciplineId}
                        onChange={(event) => setSelectedDisciplineId(event.target.value)}
                    >
                        {disciplines.map((discipline) => <MenuItem value={prop('id', discipline)}>{prop('name', discipline)}</MenuItem>)}
                    </TextField>
                </Row>
                <Row style={{ marginTop: 10 }}>
                    <FormControl
                        style={{ width: '100%' }}
                        size="small"
                        error={!selectedTeachersIds[0]}
                        variant="outlined"
                    >
                        <InputLabel id="fea7v43v">Professores</InputLabel>
                        <Select
                            labelId="fea7v43v"
                            label="Professores"
                            multiple
                            value={selectedTeachersIds}
                            onChange={(event) => setSelectedTeachersIds(event.target.value)}
                        >
                            {teachers.map((teacher) => <MenuItem value={prop('id', teacher)}>{prop('name', teacher)}</MenuItem>)}
                        </Select>
                        <FormHelperText id="my-helper-text">{!selectedTeachersIds[0] ? (prop('teachers', classInfo) || []).map(prop('raw')) : ''}</FormHelperText>
                    </FormControl>
                </Row>
                <Row style={{ marginTop: 10 }}>
                    <TextField
                        label="Nome"
                        style={{ flex: 1, marginRight: 5 }}
                        size="small"
                        error={!classroomName}
                        variant="outlined"
                        value={classroomName}
                        onChange={(event) => { setClassroomName(event.target.value) }}
                    />
                    <TextField
                        select
                        label="Horário"
                        style={{ flex: 2 }}
                        size="small"
                        error={!selectedMeetingTimeId}
                        variant="outlined"
                        value={selectedMeetingTimeId}
                        onChange={(event) => setSelectedMeetingTimeId(event.target.value)}
                    >
                        {meetingTimes.map((meetingTime) => <MenuItem value={prop('id', meetingTime)}>{formatMeetingTime(meetingTime)}</MenuItem>)}
                    </TextField>
                </Row>
            </div>
        </>
    )
}

export default CreateClassCard

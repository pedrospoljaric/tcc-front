import { Button, TextField, MenuItem } from '@material-ui/core'
import CreateClassCard from 'components/CreateClassCard'
import Template from 'components/Template'
import { prop, split } from 'lodash/fp'
import { useEffect, useState } from 'react'
import request from 'utils/request'

const MatrizesCadastrar = () => {
    const [file, setFile] = useState(null)
    const [classes, setClasses] = useState([])
    const [disciplines, setDisciplines] = useState([])
    const [meetingTimes, setMeetingTimes] = useState([])
    const [teachers, setTeachers] = useState([])
    const [year, setYear] = useState('')
    const [half, setHalf] = useState('')

    useEffect(async () => {
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            const result = await request.post('/grids/import', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            const newClasses = prop('data.classes', result) || []
            setClasses(newClasses.map((newClass, index) => ({ ...newClass, customId: index })))
        }
    }, [file])

    useEffect(async () => {
        const responseDisciplines = await request.get('/disciplines')
        setDisciplines(prop('data.disciplines', responseDisciplines))

        const responseMeetingTimes = await request.get('/meeting-times')
        setMeetingTimes(prop('data.meetingTimes', responseMeetingTimes))

        const responseTeachers = await request.get('/teachers')
        setTeachers(prop('data.teachers', responseTeachers))
    }, [])

    return (
        <Template selected="Matrizes">
            <form
                onSubmit={async (event) => {
                    event.preventDefault()

                    const newClasses = classes.filter((classInfo) => !!prop('name', classInfo)).map((classInfo) => ({
                        name: prop(`target[name_${classInfo.customId}].value`, event),
                        disciplineId: Number(prop(`target[disciplineId_${classInfo.customId}].value`, event)),
                        meetingTimeId: Number(prop(`target[meetingTimeId_${classInfo.customId}].value`, event)),
                        teachersIds: split(',', prop(`target[teachersIds_${classInfo.customId}].value`, event)).map(Number)
                    }))

                    await request.post('/classes', {
                        year,
                        half,
                        classes: newClasses
                    })

                    setClasses([])
                    setFile(null)
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <input
                        type="file"
                        onChange={(event) => { setFile(prop('target.files.0', event)) }}
                    />
                    <TextField
                        label="Ano"
                        size="small"
                        variant="outlined"
                        value={year}
                        error={!year}
                        onChange={(event) => { setYear(event.target.value) }}
                        style={{ width: 150, margin: 10 }}
                    />
                    <TextField
                        select
                        label="Semestre"
                        size="small"
                        variant="outlined"
                        value={half}
                        error={!half}
                        onChange={(event) => setHalf(event.target.value)}
                        style={{ width: 150, margin: 10 }}
                    >
                        <MenuItem value={1}>01</MenuItem>
                        <MenuItem value={2}>02</MenuItem>
                    </TextField>
                    <Button variant="contained" color="primary" type="submit">Cadastrar</Button>
                </div>
                <div>
                    {/* <pre>{JSON.stringify(classes, null, 2)}</pre> */}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '20% 20% 20% 20% 20%' }}>
                    <div>
                        <div style={{ textAlign: 'center' }}>Segunda</div>
                        <div style={{
                            border: '1px solid lightgrey', height: 600, overflowY: 'scroll'
                        }}
                        >
                            {classes.filter((classInfo) => prop('meetingTime.dayOfTheWeek', classInfo) === 1).map((classInfo) => <CreateClassCard disciplines={disciplines} meetingTimes={meetingTimes} teachers={teachers} classInfo={classInfo} />)}
                        </div>
                    </div>
                    <div>
                        <div style={{ textAlign: 'center' }}>Terça</div>
                        <div style={{
                            border: '1px solid lightgrey', height: 600, overflowY: 'scroll'
                        }}
                        >
                            {classes.filter((classInfo) => prop('meetingTime.dayOfTheWeek', classInfo) === 2).map((classInfo) => <CreateClassCard disciplines={disciplines} meetingTimes={meetingTimes} teachers={teachers} classInfo={classInfo} />)}
                        </div>
                    </div>
                    <div>
                        <div style={{ textAlign: 'center' }}>Quarta</div>
                        <div style={{
                            border: '1px solid lightgrey', height: 600, overflowY: 'scroll'
                        }}
                        >
                            {classes.filter((classInfo) => prop('meetingTime.dayOfTheWeek', classInfo) === 3).map((classInfo) => <CreateClassCard disciplines={disciplines} meetingTimes={meetingTimes} teachers={teachers} classInfo={classInfo} />)}
                        </div>
                    </div>
                    <div>
                        <div style={{ textAlign: 'center' }}>Quinta</div>
                        <div style={{
                            border: '1px solid lightgrey', height: 600, overflowY: 'scroll'
                        }}
                        >
                            {classes.filter((classInfo) => prop('meetingTime.dayOfTheWeek', classInfo) === 4).map((classInfo) => <CreateClassCard disciplines={disciplines} meetingTimes={meetingTimes} teachers={teachers} classInfo={classInfo} />)}
                        </div>
                    </div>
                    <div>
                        <div style={{ textAlign: 'center' }}>Sexta</div>
                        <div style={{
                            border: '1px solid lightgrey', height: 600, overflowY: 'scroll'
                        }}
                        >
                            {classes.filter((classInfo) => prop('meetingTime.dayOfTheWeek', classInfo) === 5).map((classInfo) => <CreateClassCard disciplines={disciplines} meetingTimes={meetingTimes} teachers={teachers} classInfo={classInfo} />)}
                        </div>
                    </div>
                </div>
            </form>
        </Template>
    )
}

export default MatrizesCadastrar

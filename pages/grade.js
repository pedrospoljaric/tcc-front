/* eslint-disable no-alert */
import Template from 'components/Template'
import ClassList from 'components/ClassList'
import ClassGrid from 'components/ClassGrid'
import { TextField, MenuItem, Button } from '@material-ui/core'
import { useState, useEffect } from 'react'
import request from 'utils/request'
import { prop } from 'lodash/fp'

const Grade = () => {
    const [courses, setCourses] = useState([])
    const [selectedCourseId, setSelectedCourseId] = useState()
    const [semesterClasses, setSemesterClasses] = useState([])
    const [selectedClasses, setSelectedClasses] = useState([])

    useEffect(async () => {
        const responseCourses = await request.get('/courses')
        const coursesGotten = prop('data.courses', responseCourses) || []
        setCourses(coursesGotten)

        const responseRegisteredCourse = await request.get('/courses/registered')
        const registeredCourseGotten = prop('data.course', responseRegisteredCourse) || []
        if (registeredCourseGotten) setSelectedCourseId(prop('id', registeredCourseGotten))

        const responseClasses = await request.get('/semesters/current/classes')
        const newClasses = prop('data.classes', responseClasses)
        setSemesterClasses(newClasses)

        const responseSelectedClasses = await request.get('/classes/selected')
        const selectedClassesGotten = prop('data.classes', responseSelectedClasses) || []
        console.log(selectedClassesGotten)
        setSelectedClasses(selectedClassesGotten)
    }, [])

    return (
        <Template selected="Grade">
            <ClassList
                addClass={(classInfo) => {
                    const currentSelectedClasses = [...selectedClasses]

                    const previousDisciplinesIds = selectedClasses.map(prop('discipline.id'))
                    const classDisciplineId = prop('discipline.id', classInfo)
                    const disciplineAvailable = !previousDisciplinesIds.includes(classDisciplineId)

                    const previousMeetingTimes = selectedClasses.reduce((meetingTimesList, selectedClass) => [...meetingTimesList, ...prop('meetingTimes', selectedClass)], [])
                    const previousMeetingTimesIds = previousMeetingTimes.map(prop('id'))
                    const classMeetingTimesIds = (prop('meetingTimes', classInfo) || []).map(prop('id'))
                    const meetingTimesAvailable = classMeetingTimesIds.reduce((canAdd, meetingTimeId) => canAdd && !previousMeetingTimesIds.includes(meetingTimeId), true)

                    const canAddClass = disciplineAvailable && meetingTimesAvailable

                    if (canAddClass) currentSelectedClasses.push(classInfo)
                    setSelectedClasses(currentSelectedClasses)
                }}
                classes={semesterClasses}
            />
            <div style={{ marginLeft: 'calc(20% + 10px)' }}>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
                >
                    <TextField
                        select
                        label="Curso"
                        size="small"
                        variant="outlined"
                        value={selectedCourseId}
                        error={!selectedCourseId}
                        onChange={(event) => setSelectedCourseId(event.target.value)}
                        style={{
                            width: 150,
                            margin: 10
                            // visibility: (!loadingRegisteredCourse || !selectedCourseId) ? 'hidden' : 'visible'
                        }}
                    >
                        {courses.map((course) => <MenuItem value={prop('id', course)}>{prop('name', course)}</MenuItem>)}
                    </TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!selectedCourseId}
                        onClick={async (event) => {
                            event.preventDefault()

                            if (selectedCourseId) {
                                const responseClasses = await request.get('/recommendation', {
                                    params: {
                                        courseId: selectedCourseId
                                    }
                                })
                                const recommendedClasses = prop('data.classes', responseClasses)
                                setSelectedClasses(recommendedClasses)
                            }
                        }}
                    >
                        Preencher com recomendações
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={async (event) => {
                            event.preventDefault()

                            try {
                                await request.post('/classes/selected', { classesIds: selectedClasses.map(prop('id')) })
                                alert('Seleção salva com sucesso')
                            } catch (err) {
                                alert('Erro ao salvar seleção')
                            }
                        }}
                    >
                        Salvar
                    </Button>
                </div>
                <ClassGrid
                    classes={selectedClasses}
                    removeClass={(classId) => {
                        const currentSelectedClasses = [...selectedClasses].filter((selectedClass) => prop('id', selectedClass) !== classId)
                        setSelectedClasses(currentSelectedClasses)
                    }}
                />
            </div>
        </Template>
    )
}

export default Grade

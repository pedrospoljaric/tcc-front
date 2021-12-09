import Template from 'components/Template'
import ClassList from 'components/ClassList'
import ClassGrid from 'components/ClassGrid'
import { TextField, MenuItem } from '@material-ui/core'
import { useState, useEffect } from 'react'
import request from 'utils/request'
import { prop } from 'lodash/fp'

const Grade = () => {
    const [courses, setCourses] = useState([])
    const [semesters, setSemesters] = useState([])
    const [selectedCourseId, setSelectedCourseId] = useState()
    const [selectedSemesterId, setSelectedSemesterId] = useState()
    const [selectedSemesterNumber, setSelectedSemesterNumber] = useState()
    const [semesterClasses, setSemesterClasses] = useState([])
    const [recommendedClasses, setRecommendedClasses] = useState([])

    useEffect(async () => {
        const responseSemesters = await request.get('/semesters')
        const semestersGotten = prop('data.semesters', responseSemesters) || []
        setSemesters(semestersGotten)

        const responseCourses = await request.get('/courses')
        const coursesGotten = prop('data.courses', responseCourses) || []
        setCourses(coursesGotten)
    }, [])

    useEffect(async () => {
        if (selectedSemesterId) {
            const responseClasses = await request.get(`/semesters/${selectedSemesterId}/classes`)
            const newClasses = prop('data.classes', responseClasses)
            setSemesterClasses(newClasses)
        }
    }, [selectedSemesterId])

    useEffect(async () => {
        if (selectedSemesterId && selectedCourseId && selectedSemesterNumber) {
            const responseClasses = await request.get('/recommendation', {
                params: {
                    semesterId: selectedSemesterId,
                    semesterNumber: selectedSemesterNumber,
                    courseId: selectedCourseId
                }
            })
            const newClasses = prop('data.classes', responseClasses)
            setRecommendedClasses(newClasses)
        }
    }, [selectedSemesterId, selectedCourseId, selectedSemesterNumber])

    return (
        <Template selected="Grade">
            <TextField
                select
                label="Curso"
                size="small"
                variant="outlined"
                value={selectedCourseId}
                error={!selectedCourseId}
                onChange={(event) => setSelectedCourseId(event.target.value)}
                style={{ width: 150, margin: 10 }}
            >
                {courses.map((course) => <MenuItem value={prop('id', course)}>{prop('name', course)}</MenuItem>)}
            </TextField>
            <TextField
                select
                label="Semestre"
                size="small"
                variant="outlined"
                value={selectedSemesterId}
                error={!selectedSemesterId}
                onChange={(event) => setSelectedSemesterId(event.target.value)}
                style={{ width: 150, margin: 10 }}
            >
                {semesters.map((semester) => (
                    <MenuItem value={prop('id', semester)}>
                        {prop('year', semester)}
                        -
                        {prop('half', semester)}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                label="Termo"
                size="small"
                variant="outlined"
                value={selectedSemesterNumber}
                error={!selectedSemesterNumber}
                onChange={(event) => setSelectedSemesterNumber(event.target.value)}
                style={{ width: 150, margin: 10 }}
            >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
            </TextField>
            <ClassList classes={semesterClasses} />
            {/* <div style={{ marginLeft: 'calc(20% + 10px)' }}><ClassList classes={recommendedClasses} /></div> */}
            <div style={{ marginLeft: 'calc(20% + 10px)' }}>
                <ClassGrid classes={recommendedClasses} />
            </div>
        </Template>
    )
}

export default Grade

import { isEmpty, prop } from 'lodash/fp'
import { useEffect, useState } from 'react'
import ClassCard from 'components/ClassCard'
import request from 'utils/request'
import { InputAdornment, TextField } from '@material-ui/core'
import { Search } from '@material-ui/icons'

let filterDebouncer

const ClassList = ({ semesterId }) => {
    const [classes, setClasses] = useState([])
    const [shownClasses, setShownClasses] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(async () => {
        if (semesterId) {
            const responseClasses = await request.get(`/semesters/${undefined}/classes`)
            const newClasses = prop('data.classes', responseClasses)
            setClasses(newClasses)
            setShownClasses(newClasses)
            setFilter('')
        }
    }, [semesterId])

    useEffect(async () => {
        clearTimeout(filterDebouncer)
        if (isEmpty(classes)) return
        if (!filter) setShownClasses(classes)
        filterDebouncer = setTimeout(() => {
            setShownClasses(classes.filter((classroom) => prop('discipline.name', classroom).toUpperCase().includes(filter.toUpperCase())))
        }, 500)
    }, [filter])

    return (
        <div style={{
            position: 'absolute',
            minWidth: 200,
            width: '20%',
            height: 'calc(100% - 20px)',
            display: 'flex',
            flexDirection: 'column'
        }}
        >
            <TextField
                size="small"
                variant="outlined"
                value={filter}
                onChange={(event) => { setFilter(event.target.value) }}
                style={{ width: '100%', marginBottom: 5 }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Search />
                        </InputAdornment>
                    )
                }}
            />
            <div style={{ overflowY: 'scroll' }}>
                {shownClasses.map((classroom) => <div key={prop('id', classroom)} style={{ marginBottom: 2 }}><ClassCard classroom={classroom} /></div>)}
            </div>
        </div>
    )
}

export default ClassList

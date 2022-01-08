import { isEmpty, prop } from 'lodash/fp'
import { useEffect, useState } from 'react'
import ClassCard from 'components/ClassCard'
import { InputAdornment, TextField } from '@material-ui/core'
import { Search } from '@material-ui/icons'

let filterDebouncer

const ClassList = ({ classes = [], addClass }) => {
    const [shownClasses, setShownClasses] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(async () => {
        if (classes) {
            setShownClasses(classes)
            setFilter('')
        }
    }, [classes])

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
                {shownClasses.map((classroom) => (
                    <div key={prop('id', classroom)} style={{ marginBottom: 2 }}>
                        <ClassCard
                            classroom={classroom}
                            onClick={() => {
                                addClass(classroom)
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClassList

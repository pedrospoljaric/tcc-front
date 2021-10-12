import { TextField } from '@material-ui/core'
import { useState } from 'react'

const Input = ({
    id, label, type, initialValue = ''
}) => {
    const [value, setValue] = useState(initialValue)

    return (
        <TextField
            id={id}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            label={label}
            type={type}
            variant="outlined"
            size="small"
        />
    )
}

export default Input

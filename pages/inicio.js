/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Input } from '@material-ui/core'
import Template from 'components/Template'
import { prop } from 'lodash/fp'
import { useEffect, useState } from 'react'
import request from 'utils/request'

const Inicio = () => {
    const [file, setFile] = useState(null)
    const [classes, setClasses] = useState([])

    useEffect(async () => {
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            const response = await request.post('/records', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            setClasses(prop('data.classes', response))
        }
    }, [file])

    return (
        <Template>
            <label htmlFor="contained-button-file">
                <Input
                    id="contained-button-file"
                    type="file"
                    onChange={(event) => { setFile(prop('target.files.0', event)) }}
                    style={{ display: 'none' }}
                />
                <Button variant="contained" color="primary" component="span">
                    Upload
                </Button>
            </label>
            <pre>{JSON.stringify(classes, null, 2)}</pre>
        </Template>
    )
}

export default Inicio

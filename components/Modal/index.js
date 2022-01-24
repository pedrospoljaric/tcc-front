import {
    MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions, FormGroup, FormControlLabel, Checkbox, Select, OutlinedInput
} from '@material-ui/core'
import { useState } from 'react'

const Modal = ({ showModal, setShowModal }) => {
    const [segPosso, setSegPosso] = useState(false)
    const [terPosso, setTerPosso] = useState(false)
    const [quaPosso, setQuaPosso] = useState(false)
    const [quiPosso, setQuiPosso] = useState(false)
    const [sexPosso, setSexPosso] = useState(false)

    const [segPossoHorarios, setSegPossoHorarios] = useState([])
    const [terPossoHorarios, setTerPossoHorarios] = useState([])
    const [quaPossoHorarios, setQuaPossoHorarios] = useState([])
    const [quiPossoHorarios, setQuiPossoHorarios] = useState([])
    const [sexPossoHorarios, setSexPossoHorarios] = useState([])

    const [segPrefiro, setSegPrefiro] = useState(false)
    const [terPrefiro, setTerPrefiro] = useState(false)
    const [quaPrefiro, setQuaPrefiro] = useState(false)
    const [quiPrefiro, setQuiPrefiro] = useState(false)
    const [sexPrefiro, setSexPrefiro] = useState(false)

    const [segPrefiroHorarios, setSegPrefiroHorarios] = useState([])
    const [terPrefiroHorarios, setTerPrefiroHorarios] = useState([])
    const [quaPrefiroHorarios, setQuaPrefiroHorarios] = useState([])
    const [quiPrefiroHorarios, setQuiPrefiroHorarios] = useState([])
    const [sexPrefiroHorarios, setSexPrefiroHorarios] = useState([])

    const handleChangePosso = (event) => {
        const {
            target: { value, name }
        } = event

        console.log('name', name)
        console.log('value', value)

        const newValue = typeof value === 'string' ? value.split(',') : value
        if (name === 'segunda') setSegPossoHorarios(newValue)
        else if (name === 'terca') setTerPossoHorarios(newValue)
        else if (name === 'quarta') setQuaPossoHorarios(newValue)
        else if (name === 'quinta') setQuiPossoHorarios(newValue)
        else if (name === 'sexta') setSexPossoHorarios(newValue)

        console.log('segposso', segPossoHorarios)
        console.log('segposso2', segPossoHorarios)
        console.log('segposso3', segPossoHorarios)
    }

    const handleChangePrefiro = (event) => {
        const {
            target: { value, name }
        } = event

        const newValue = typeof value === 'string' ? value.split(',') : value
        if (name === 'segunda') setSegPrefiroHorarios(newValue)
        else if (name === 'terca') setTerPrefiroHorarios(newValue)
        else if (name === 'quarta') setQuaPrefiroHorarios(newValue)
        else if (name === 'quinta') setQuiPrefiroHorarios(newValue)
        else if (name === 'sexta') setSexPrefiroHorarios(newValue)
    }

    const resetValues = () => {
        try {
            setSegPosso(false)
            setTerPosso(false)
            setQuaPosso(false)
            setQuiPosso(false)
            setSexPosso(false)

            setSegPossoHorarios([])
            setTerPossoHorarios([])
            setQuaPossoHorarios([])
            setQuiPossoHorarios([])
            setSexPossoHorarios([])

            setSegPrefiro(false)
            setTerPrefiro(false)
            setQuaPrefiro(false)
            setQuiPrefiro(false)
            setSexPrefiro(false)

            setSegPrefiroHorarios([])
            setTerPrefiroHorarios([])
            setQuaPrefiroHorarios([])
            setQuiPrefiroHorarios([])
            setSexPrefiroHorarios([])
        } catch (err) {
            alert('DEU RUIM no reset')
        }
    }

    const savePreferences = async () => {
        try {
            const objetao = {} // montar object
            // const result = await adicionarPrefs(objectao)
            alert('deu certo!')
            resetValues()
            setShowModal(false)
        } catch (err) {
            alert('DEU RUIM')
        }
    }

    return (
        <Dialog
            open={showModal}
            onClose={() => setShowModal(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="lg"
        >
            <DialogTitle id="alert-dialog-title">Configurações - Datas e Turnos</DialogTitle>
            <DialogContent style={{ width: '900px' }}>
                <DialogContentText id="alert-dialog-description" style={{ marginBottom: '24px' }}>
                    A recomendação da matriz horária deve se basear nas escolhas a seguir:
                    <br />
                    - Selecione em "Posso" todos os dias os quais você tem disponível para ter aulas, e o mesmo para seus respectivos turnos.
                    <br />
                    - Em "Prefiro", selecione dias e turnos nos quais você prefere ter aulas, mas que podem ser realizados em outras opções!
                </DialogContentText>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 2fr'
                }}
                >
                    <div style={{
                        display: 'flex', flexDirection: 'column'
                    }}
                    >
                        <div style={{ marginBottom: '16px' }}>Posso</div>
                        <hr />
                        <br />

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormControlLabel
                                control={<Checkbox checked={segPosso} onChange={() => setSegPosso(!segPosso)} name="checkedA" />}
                                label="Segunda"
                            />
                            {segPosso && (
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    name="segunda"
                                    value={segPossoHorarios}
                                    onChange={handleChangePosso}
                                    input={<OutlinedInput />}
                                >
                                    <MenuItem
                                        value="manha"
                                    >
                                        Manhã
                                    </MenuItem>
                                    <MenuItem
                                        value="tarde"
                                    >
                                        Tarde
                                    </MenuItem>
                                    <MenuItem
                                        value="noite"
                                    >
                                        Noite
                                    </MenuItem>
                                </Select>
                            )}
                        </div>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormControlLabel
                                control={<Checkbox checked={terPosso} onChange={() => setTerPosso(!terPosso)} name="checkedA" />}
                                label="Terça"
                            />
                            {terPosso && (
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    name="terca"
                                    value={terPossoHorarios}
                                    onChange={handleChangePosso}
                                    input={<OutlinedInput />}
                                >
                                    <MenuItem
                                        value="manha"
                                    >
                                        Manhã
                                    </MenuItem>
                                    <MenuItem
                                        value="tarde"
                                    >
                                        Tarde
                                    </MenuItem>
                                    <MenuItem
                                        value="noite"
                                    >
                                        Noite
                                    </MenuItem>
                                </Select>
                            )}
                        </div>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormControlLabel
                                control={<Checkbox checked={quaPosso} onChange={() => setQuaPosso(!quaPosso)} name="checkedA" />}
                                label="Quarta"
                            />
                            {quaPosso && (
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    name="quarta"
                                    value={quaPossoHorarios}
                                    onChange={handleChangePosso}
                                    input={<OutlinedInput />}
                                >
                                    <MenuItem
                                        value="manha"
                                    >
                                        Manhã
                                    </MenuItem>
                                    <MenuItem
                                        value="tarde"
                                    >
                                        Tarde
                                    </MenuItem>
                                    <MenuItem
                                        value="noite"
                                    >
                                        Noite
                                    </MenuItem>
                                </Select>
                            )}
                        </div>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormControlLabel
                                control={<Checkbox checked={quiPosso} onChange={() => setQuiPosso(!quiPosso)} name="checkedA" />}
                                label="Quinta"
                            />
                            {quiPosso && (
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    name="quinta"
                                    value={quiPossoHorarios}
                                    onChange={handleChangePosso}
                                    input={<OutlinedInput />}
                                >
                                    <MenuItem
                                        value="manha"
                                    >
                                        Manhã
                                    </MenuItem>
                                    <MenuItem
                                        value="tarde"
                                    >
                                        Tarde
                                    </MenuItem>
                                    <MenuItem
                                        value="noite"
                                    >
                                        Noite
                                    </MenuItem>
                                </Select>
                            )}
                        </div>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormControlLabel
                                control={<Checkbox checked={sexPosso} onChange={() => setSexPosso(!sexPosso)} name="checkedA" />}
                                label="Sexta"
                            />
                            {sexPosso && (
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    name="sexta"
                                    value={sexPossoHorarios}
                                    onChange={handleChangePosso}
                                    input={<OutlinedInput />}
                                >
                                    <MenuItem
                                        value="manha"
                                    >
                                        Manhã
                                    </MenuItem>
                                    <MenuItem
                                        value="tarde"
                                    >
                                        Tarde
                                    </MenuItem>
                                    <MenuItem
                                        value="noite"
                                    >
                                        Noite
                                    </MenuItem>
                                </Select>
                            )}
                        </div>
                        <br />

                    </div>
                    <div style={{
                        flexDirection: 'column'
                    }}
                    />

                    <div style={{
                        display: 'flex', flexDirection: 'column'
                    }}
                    >

                        <div style={{ marginBottom: '16px' }}>Prefiro</div>
                        <hr />
                        <br />

                        {segPosso && (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormControlLabel
                                    control={<Checkbox checked={segPrefiro} onChange={() => setSegPrefiro(!segPrefiro)} name="checkedA" />}
                                    label="Segunda"
                                />
                                {segPrefiro && (
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        name="segunda"
                                        value={segPrefiroHorarios}
                                        onChange={handleChangePrefiro}
                                        input={<OutlinedInput />}
                                    >
                                        {segPossoHorarios && (
                                            <MenuItem
                                                value="manha"
                                            >
                                                Manhã
                                            </MenuItem>
                                        )}
                                        <MenuItem
                                            value="tarde"
                                        >
                                            Tarde
                                        </MenuItem>
                                        <MenuItem
                                            value="noite"
                                        >
                                            Noite
                                        </MenuItem>
                                    </Select>
                                )}
                            </div>
                        ) }
                        <br />
                        {terPosso && (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormControlLabel
                                    control={<Checkbox checked={terPrefiro} onChange={() => setTerPrefiro(!terPrefiro)} name="checkedA" />}
                                    label="Terça"
                                />
                                {terPrefiro && (
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        name="terca"
                                        value={terPrefiroHorarios}
                                        onChange={handleChangePrefiro}
                                        input={<OutlinedInput />}
                                    >
                                        <MenuItem
                                            value="manha"
                                        >
                                            Manhã
                                        </MenuItem>
                                        <MenuItem
                                            value="tarde"
                                        >
                                            Tarde
                                        </MenuItem>
                                        <MenuItem
                                            value="noite"
                                        >
                                            Noite
                                        </MenuItem>
                                    </Select>
                                )}
                            </div>
                        ) }
                        <br />
                        {quaPosso && (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormControlLabel
                                    control={<Checkbox checked={quaPrefiro} onChange={() => setQuaPrefiro(!quaPrefiro)} name="checkedA" />}
                                    label="Quarta"
                                />
                                {quaPrefiro && (
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        name="quarta"
                                        value={quaPrefiroHorarios}
                                        onChange={handleChangePrefiro}
                                        input={<OutlinedInput />}
                                    >
                                        <MenuItem
                                            value="manha"
                                        >
                                            Manhã
                                        </MenuItem>
                                        <MenuItem
                                            value="tarde"
                                        >
                                            Tarde
                                        </MenuItem>
                                        <MenuItem
                                            value="noite"
                                        >
                                            Noite
                                        </MenuItem>
                                    </Select>
                                )}
                            </div>
                        ) }
                        <br />
                        {quiPosso && (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormControlLabel
                                    control={<Checkbox checked={quiPrefiro} onChange={() => setQuiPrefiro(!quiPrefiro)} name="checkedA" />}
                                    label="Quinta"
                                />
                                {quiPrefiro && (
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        name="quinta"
                                        value={quiPrefiroHorarios}
                                        onChange={handleChangePrefiro}
                                        input={<OutlinedInput />}
                                    >
                                        <MenuItem
                                            value="manha"
                                        >
                                            Manhã
                                        </MenuItem>
                                        <MenuItem
                                            value="tarde"
                                        >
                                            Tarde
                                        </MenuItem>
                                        <MenuItem
                                            value="noite"
                                        >
                                            Noite
                                        </MenuItem>
                                    </Select>
                                )}
                            </div>
                        ) }
                        <br />
                        {sexPosso && (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormControlLabel
                                    control={<Checkbox checked={sexPrefiro} onChange={() => setSexPrefiro(!sexPrefiro)} name="checkedA" />}
                                    label="Sexta"
                                />
                                {sexPrefiro && (
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        name="sexta"
                                        value={sexPrefiroHorarios}
                                        onChange={handleChangePrefiro}
                                        input={<OutlinedInput />}
                                    >
                                        <MenuItem
                                            value="manha"
                                        >
                                            Manhã
                                        </MenuItem>
                                        <MenuItem
                                            value="tarde"
                                        >
                                            Tarde
                                        </MenuItem>
                                        <MenuItem
                                            value="noite"
                                        >
                                            Noite
                                        </MenuItem>
                                    </Select>
                                )}
                            </div>
                        ) }
                        <br />

                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setShowModal(false)
                        resetValues()
                    }}
                    color="primary"
                >
                    Cancelar
                </Button>

                <Button
                    onClick={() => {
                        resetValues()
                    }}
                    color="primary"
                >
                    Limpar
                </Button>

                <Button
                    onClick={() => {
                        setShowModal(false)
                        savePreferences()
                    }}
                    color="primary"
                    autoFocus
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Modal

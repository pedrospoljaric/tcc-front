/* eslint-disable no-alert */
import {
    TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions, FormControlLabel, Checkbox, Select, OutlinedInput
} from '@material-ui/core'
import { useState } from 'react'
import request from 'utils/request'

const Modal = ({ showModal, setShowModal }) => {
    const [segPosso, setSegPosso] = useState(false)
    const [terPosso, setTerPosso] = useState(false)
    const [quaPosso, setQuaPosso] = useState(false)
    const [quiPosso, setQuiPosso] = useState(false)
    const [sexPosso, setSexPosso] = useState(false)

    const [segPossoHorarios, setSegPossoHorarios] = useState(['manha', 'tarde', 'noite'])
    const [terPossoHorarios, setTerPossoHorarios] = useState(['manha', 'tarde', 'noite'])
    const [quaPossoHorarios, setQuaPossoHorarios] = useState(['manha', 'tarde', 'noite'])
    const [quiPossoHorarios, setQuiPossoHorarios] = useState(['manha', 'tarde', 'noite'])
    const [sexPossoHorarios, setSexPossoHorarios] = useState(['manha', 'tarde', 'noite'])

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

    const [qtdDisciplinas, setQtdDisciplinas] = useState(5)

    const handleChangePosso = (event) => {
        const {
            target: { value, name }
        } = event

        const newValue = typeof value === 'string' ? value.split(',') : value
        if (name === 'segunda') setSegPossoHorarios(newValue)
        else if (name === 'terca') setTerPossoHorarios(newValue)
        else if (name === 'quarta') setQuaPossoHorarios(newValue)
        else if (name === 'quinta') setQuiPossoHorarios(newValue)
        else if (name === 'sexta') setSexPossoHorarios(newValue)
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
        setSegPosso(false)
        setTerPosso(false)
        setQuaPosso(false)
        setQuiPosso(false)
        setSexPosso(false)

        setSegPossoHorarios(['manha', 'tarde', 'noite'])
        setTerPossoHorarios(['manha', 'tarde', 'noite'])
        setQuaPossoHorarios(['manha', 'tarde', 'noite'])
        setQuiPossoHorarios(['manha', 'tarde', 'noite'])
        setSexPossoHorarios(['manha', 'tarde', 'noite'])

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

        setQtdDisciplinas(5)
    }

    const savePreferences = async () => {
        const segCan = segPosso ? segPossoHorarios : []
        const terCan = segPosso ? terPossoHorarios : []
        const quaCan = segPosso ? quaPossoHorarios : []
        const quiCan = segPosso ? quiPossoHorarios : []
        const sexCan = segPosso ? sexPossoHorarios : []

        const segPrefer = segPrefiro ? segPrefiroHorarios : []
        const terPrefer = terPrefiro ? terPrefiroHorarios : []
        const quaPrefer = quaPrefiro ? quaPrefiroHorarios : []
        const quiPrefer = quiPrefiro ? quiPrefiroHorarios : []
        const sexPrefer = sexPrefiro ? sexPrefiroHorarios : []

        const preferences = {
            amount: qtdDisciplinas,
            can: {
                1: segCan,
                2: terCan,
                3: quaCan,
                4: quiCan,
                5: sexCan
            },
            prefer: {
                1: segPrefer,
                2: terPrefer,
                3: quaPrefer,
                4: quiPrefer,
                5: sexPrefer
            }
        }

        try {
            await request.put('/preferences', { preferences })
            alert('Preferências salvas com sucesso')
            setShowModal(false)
        } catch (err) {
            alert('Erro ao salvar preferências')
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
                <DialogContentText id="alert-dialog-description" style={{ marginBottom: '24px', fontSize: 15 }}>
                    A recomendação da matriz horária deve se basear nas escolhas a seguir:
                    <br />

                    - Informe em &ldquo;Quantidade de Unidade Curriculares&rdquo;, o número máximo de disciplinas que deseja cursar;
                    <br />

                    - Selecione em &ldquo;Posso&rdquo;, todos os dias os quais você tem disponível para ter aulas, e o mesmo para seus respectivos turnos;
                    <br />

                    - Em &ldquo;Prefiro&rdquo;, selecione dias e turnos nos quais você prefere ter aulas, mas que podem ser realizadas em outras opções;
                </DialogContentText>
                <hr />
                <br />

                <TextField
                    label="Quantidade de UCs"
                    size="small"
                    variant="outlined"
                    value={qtdDisciplinas}
                    error={!qtdDisciplinas}
                    onChange={(event) => { setQtdDisciplinas(event.target.value) }}
                    style={{ width: 200, margin: 10 }}
                />
                <br />
                <br />
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

                        {segPosso && segPossoHorarios && !!segPossoHorarios.length && (
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
                                        {segPossoHorarios && segPossoHorarios.indexOf('manha') !== -1 && (
                                            <MenuItem
                                                value="manha"
                                            >
                                                Manhã
                                            </MenuItem>
                                        )}
                                        {segPossoHorarios && segPossoHorarios.indexOf('tarde') !== -1 && (
                                            <MenuItem
                                                value="tarde"
                                            >
                                                Tarde
                                            </MenuItem>
                                        )}
                                        {segPossoHorarios && segPossoHorarios.indexOf('noite') !== -1 && (
                                            <MenuItem
                                                value="noite"
                                            >
                                                Noite
                                            </MenuItem>
                                        )}
                                    </Select>
                                )}
                            </div>
                        ) }
                        <br />
                        {terPosso && terPossoHorarios && !!terPossoHorarios.length && (
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
                                        {terPossoHorarios && terPossoHorarios.indexOf('manha') !== -1 && (
                                            <MenuItem
                                                value="manha"
                                            >
                                                Manhã
                                            </MenuItem>
                                        )}
                                        {terPossoHorarios && terPossoHorarios.indexOf('tarde') !== -1 && (
                                            <MenuItem
                                                value="tarde"
                                            >
                                                Tarde
                                            </MenuItem>
                                        )}
                                        {terPossoHorarios && terPossoHorarios.indexOf('noite') !== -1 && (
                                            <MenuItem
                                                value="noite"
                                            >
                                                Noite
                                            </MenuItem>
                                        )}
                                    </Select>
                                )}
                            </div>
                        ) }
                        <br />
                        {quaPosso && quaPossoHorarios && !!quaPossoHorarios.length && (
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
                                        {quaPossoHorarios && quaPossoHorarios.indexOf('manha') !== -1 && (
                                            <MenuItem
                                                value="manha"
                                            >
                                                Manhã
                                            </MenuItem>
                                        )}
                                        {quaPossoHorarios && quaPossoHorarios.indexOf('tarde') !== -1 && (
                                            <MenuItem
                                                value="tarde"
                                            >
                                                Tarde
                                            </MenuItem>
                                        )}
                                        {quaPossoHorarios && quaPossoHorarios.indexOf('noite') !== -1 && (
                                            <MenuItem
                                                value="noite"
                                            >
                                                Noite
                                            </MenuItem>
                                        )}
                                    </Select>
                                )}
                            </div>
                        ) }
                        <br />
                        {quiPosso && quiPossoHorarios && !!quiPossoHorarios.length && (
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
                                        {quiPossoHorarios && quiPossoHorarios.indexOf('manha') !== -1 && (
                                            <MenuItem
                                                value="manha"
                                            >
                                                Manhã
                                            </MenuItem>
                                        )}
                                        {quiPossoHorarios && quiPossoHorarios.indexOf('tarde') !== -1 && (
                                            <MenuItem
                                                value="tarde"
                                            >
                                                Tarde
                                            </MenuItem>
                                        )}
                                        {quiPossoHorarios && quiPossoHorarios.indexOf('noite') !== -1 && (
                                            <MenuItem
                                                value="noite"
                                            >
                                                Noite
                                            </MenuItem>
                                        )}
                                    </Select>
                                )}
                            </div>
                        ) }
                        <br />
                        {sexPosso && sexPossoHorarios && !!sexPossoHorarios.length && (
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
                                        {sexPossoHorarios && sexPossoHorarios.indexOf('manha') !== -1 && (
                                            <MenuItem
                                                value="manha"
                                            >
                                                Manhã
                                            </MenuItem>
                                        )}
                                        {sexPossoHorarios && sexPossoHorarios.indexOf('tarde') !== -1 && (
                                            <MenuItem
                                                value="tarde"
                                            >
                                                Tarde
                                            </MenuItem>
                                        )}
                                        {sexPossoHorarios && sexPossoHorarios.indexOf('noite') !== -1 && (
                                            <MenuItem
                                                value="noite"
                                            >
                                                Noite
                                            </MenuItem>
                                        )}
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

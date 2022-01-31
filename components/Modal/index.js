/* eslint-disable no-alert */
import {
    TextField, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions
} from '@material-ui/core'
import { useState, useEffect } from 'react'
import request from 'utils/request'
import DaySelector from 'components/DaySelector'
import { prop } from 'lodash/fp'

const Modal = ({ showModal, setShowModal }) => {
    const [selectedPeriodsMon, setSelectedPeriodsMon] = useState([])
    const [selectedPeriodsTue, setSelectedPeriodsTue] = useState([])
    const [selectedPeriodsWed, setSelectedPeriodsWed] = useState([])
    const [selectedPeriodsThi, setSelectedPeriodsThi] = useState([])
    const [selectedPeriodsFri, setSelectedPeriodsFri] = useState([])
    const [selectedPeriodsSat, setSelectedPeriodsSat] = useState([])

    const [selectedPeriodsPrefMon, setSelectedPeriodsPrefMon] = useState([])
    const [selectedPeriodsPrefTue, setSelectedPeriodsPrefTue] = useState([])
    const [selectedPeriodsPrefWed, setSelectedPeriodsPrefWed] = useState([])
    const [selectedPeriodsPrefThi, setSelectedPeriodsPrefThi] = useState([])
    const [selectedPeriodsPrefFri, setSelectedPeriodsPrefFri] = useState([])
    const [selectedPeriodsPrefSat, setSelectedPeriodsPrefSat] = useState([])

    const [maxDisciplineAmount, setMaxDisciplineAmount] = useState(5)

    const savePreferences = async () => {
        const preferences = {
            amount: maxDisciplineAmount,
            cant: {
                1: selectedPeriodsMon,
                2: selectedPeriodsTue,
                3: selectedPeriodsWed,
                4: selectedPeriodsThi,
                5: selectedPeriodsFri,
                6: selectedPeriodsSat
            },
            prefer: {
                1: selectedPeriodsPrefMon,
                2: selectedPeriodsPrefTue,
                3: selectedPeriodsPrefWed,
                4: selectedPeriodsPrefThi,
                5: selectedPeriodsPrefFri,
                6: selectedPeriodsPrefSat
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

    useEffect(async () => {
        if (showModal) {
            const responsePreferences = await request.get('/preferences')
            const userPreferences = prop('data.preferences', responsePreferences)

            setSelectedPeriodsMon(prop('cant.1', userPreferences) || [])
            setSelectedPeriodsTue(prop('cant.2', userPreferences) || [])
            setSelectedPeriodsWed(prop('cant.3', userPreferences) || [])
            setSelectedPeriodsThi(prop('cant.4', userPreferences) || [])
            setSelectedPeriodsFri(prop('cant.5', userPreferences) || [])
            setSelectedPeriodsSat(prop('cant.6', userPreferences) || [])

            setSelectedPeriodsPrefMon(prop('prefer.1', userPreferences) || [])
            setSelectedPeriodsPrefTue(prop('prefer.2', userPreferences) || [])
            setSelectedPeriodsPrefWed(prop('prefer.3', userPreferences) || [])
            setSelectedPeriodsPrefThi(prop('prefer.4', userPreferences) || [])
            setSelectedPeriodsPrefFri(prop('prefer.5', userPreferences) || [])
            setSelectedPeriodsPrefSat(prop('prefer.6', userPreferences) || [])

            setMaxDisciplineAmount(prop('amount', userPreferences) || 5)
        }
    }, [showModal])

    return (
        <Dialog
            open={showModal}
            onClose={() => setShowModal(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="lg"
        >
            <DialogTitle id="alert-dialog-title">Preferências</DialogTitle>
            <DialogContent style={{ width: '900px' }}>
                <DialogContentText id="alert-dialog-description" style={{ marginBottom: '24px', fontSize: 15 }}>
                    A recomendação da matriz horária deve se basear nas escolhas a seguir:
                    <br />
                    - Informe em &ldquo;Quantidade máxima de UCs&rdquo;, o número máximo de disciplinas que deseja cursar;
                    <br />
                    - Selecione em &ldquo;Bloquear períodos&rdquo;, todos os dias da semana e períodos nos quais você está indisponível para ter aulas;
                    <br />
                    - Em &ldquo;Dar preferência por períodos&rdquo;, selecione dias da semana e períodos nos quais você prefere ter aulas, mas não possui restrição de disponibilidade.
                </DialogContentText>
                <hr />
                <br />

                <div><b>Quantidade máxima de UCs</b></div>
                <TextField
                    size="small"
                    variant="outlined"
                    value={maxDisciplineAmount}
                    error={!maxDisciplineAmount}
                    onChange={(event) => { setMaxDisciplineAmount(event.target.value) }}
                    style={{ marginTop: 16, marginBottom: 16 }}
                />
                <br />
                <br />
                <div style={{ display: 'flex', gap: 20 }}>
                    <div style={{ flex: 1, borderRight: '1px solid black' }}>
                        <div style={{ marginBottom: '16px' }}><b>Bloquear períodos</b></div>
                        <DaySelector day="Segunda" blockedPeriods={selectedPeriodsPrefMon} selectedPeriods={selectedPeriodsMon} setSelectedPeriods={setSelectedPeriodsMon} />
                        <DaySelector day="Terça" blockedPeriods={selectedPeriodsPrefTue} selectedPeriods={selectedPeriodsTue} setSelectedPeriods={setSelectedPeriodsTue} />
                        <DaySelector day="Quarta" blockedPeriods={selectedPeriodsPrefWed} selectedPeriods={selectedPeriodsWed} setSelectedPeriods={setSelectedPeriodsWed} />
                        <DaySelector day="Quinta" blockedPeriods={selectedPeriodsPrefThi} selectedPeriods={selectedPeriodsThi} setSelectedPeriods={setSelectedPeriodsThi} />
                        <DaySelector day="Sexta" blockedPeriods={selectedPeriodsPrefFri} selectedPeriods={selectedPeriodsFri} setSelectedPeriods={setSelectedPeriodsFri} />
                        <DaySelector day="Sábado" blockedPeriods={selectedPeriodsPrefSat} selectedPeriods={selectedPeriodsSat} setSelectedPeriods={setSelectedPeriodsSat} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: '16px' }}><b>Dar preferência por períodos</b></div>
                        <DaySelector day="Segunda" blockedPeriods={selectedPeriodsMon} selectedPeriods={selectedPeriodsPrefMon} setSelectedPeriods={setSelectedPeriodsPrefMon} />
                        <DaySelector day="Terça" blockedPeriods={selectedPeriodsTue} selectedPeriods={selectedPeriodsPrefTue} setSelectedPeriods={setSelectedPeriodsPrefTue} />
                        <DaySelector day="Quarta" blockedPeriods={selectedPeriodsWed} selectedPeriods={selectedPeriodsPrefWed} setSelectedPeriods={setSelectedPeriodsPrefWed} />
                        <DaySelector day="Quinta" blockedPeriods={selectedPeriodsThi} selectedPeriods={selectedPeriodsPrefThi} setSelectedPeriods={setSelectedPeriodsPrefThi} />
                        <DaySelector day="Sexta" blockedPeriods={selectedPeriodsFri} selectedPeriods={selectedPeriodsPrefFri} setSelectedPeriods={setSelectedPeriodsPrefFri} />
                        <DaySelector day="Sábado" blockedPeriods={selectedPeriodsSat} selectedPeriods={selectedPeriodsPrefSat} setSelectedPeriods={setSelectedPeriodsPrefSat} />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setShowModal(false) }} color="primary">Cancelar</Button>
                <Button onClick={() => { setShowModal(false); savePreferences() }} color="primary" autoFocus>Confirmar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Modal

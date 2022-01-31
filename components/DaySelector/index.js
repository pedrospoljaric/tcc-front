/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import {
    FormControlLabel, Checkbox
} from '@material-ui/core'

const DaySelector = ({
    day, blockedPeriods = [], selectedPeriods, setSelectedPeriods
}) => {
    const addOrRemovePeriod = (period, shouldAdd) => {
        const newSelectedPeriods = new Set(selectedPeriods)
        if (shouldAdd) newSelectedPeriods.add(period)
        else newSelectedPeriods.delete(period)
        setSelectedPeriods(Array.from(newSelectedPeriods))
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>{day}</div>
            <div style={{ display: 'flex' }}>
                <FormControlLabel
                    control={(
                        <Checkbox
                            disabled={blockedPeriods.includes('manha')}
                            color="primary"
                            checked={selectedPeriods.includes('manha')}
                            onChange={(event) => { addOrRemovePeriod('manha', event.target.checked) }}
                        />
                    )}
                    label="Manhã"
                />
                <FormControlLabel
                    control={(
                        <Checkbox
                            disabled={blockedPeriods.includes('tarde')}
                            color="primary"
                            checked={selectedPeriods.includes('tarde')}
                            onChange={(event) => { addOrRemovePeriod('tarde', event.target.checked) }}
                        />
                    )}
                    label="Tarde"
                />
                <FormControlLabel
                    control={(
                        <Checkbox
                            disabled={blockedPeriods.includes('noite')}
                            color="primary"
                            checked={selectedPeriods.includes('noite')}
                            onChange={(event) => { addOrRemovePeriod('noite', event.target.checked) }}
                        />
                    )}
                    label="Noite"
                />
            </div>
        </div>
    )
}

export default DaySelector

import ClassCard from 'components/ClassCard'
import { prop } from 'lodash/fp'
import styled from 'styled-components'

const MeetingTimeTag = styled.div`
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 55px 1fr 55px 1fr 55px 1fr;
    border-top: 1px solid black;
    border-left: 1px solid black;

    > div {
        border-bottom: 1px solid black;
        border-right: 1px solid black;
    }
`

const ClassItem = ({
    dayOfTheWeek, startTime, classes = [], removeClass
}) => {
    const [slotClass] = classes.filter((classItem) => {
        const classmeetingTimes = prop('meetingTimes', classItem) || []
        const meetingTimesStartTime = classmeetingTimes.map(prop('startTime'))
        const meetingTimesDayOfTheWeek = classmeetingTimes.map(prop('dayOfTheWeek'))
        const isOfCorrectDay = meetingTimesDayOfTheWeek.includes(dayOfTheWeek)
        const isOfCorrectTime = meetingTimesStartTime.includes(startTime)
        return isOfCorrectDay && isOfCorrectTime
    })

    return (
        <div style={{ backgroundColor: slotClass ? 'rgba(33, 90, 54, 0.15)' : 'transparent' }}>
            {slotClass && (
                <ClassCard
                    classroom={slotClass}
                    showMeetingTimes={false}
                    showBorder={false}
                    onClick={() => {
                        removeClass(prop('id', slotClass))
                    }}
                />
            )}
        </div>
    )
}

const ClassGrid = ({ classes, removeClass }) => (
    <div>
        <Grid>
            <div style={{ textAlign: 'center', gridColumnStart: 1, gridColumnEnd: 3 }}>Segunda</div>
            <div style={{ textAlign: 'center', gridColumnStart: 3, gridColumnEnd: 5 }}>Quarta</div>
            <div style={{ textAlign: 'center', gridColumnStart: 5, gridColumnEnd: 7 }}>Sexta</div>
            <MeetingTimeTag>08h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={1} startTime="08:00:00" />
            <MeetingTimeTag>08h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={3} startTime="08:00:00" />
            <MeetingTimeTag>08h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={5} startTime="08:00:00" />
            <MeetingTimeTag>10h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={1} startTime="10:00:00" />
            <MeetingTimeTag>10h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={3} startTime="10:00:00" />
            <MeetingTimeTag>10h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={5} startTime="10:00:00" />
            <MeetingTimeTag>13h30</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={1} startTime="13:30:00" />
            <MeetingTimeTag>13h30</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={3} startTime="13:30:00" />
            <MeetingTimeTag>13h30</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={5} startTime="13:30:00" />
            <MeetingTimeTag>15h30</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={1} startTime="15:30:00" />
            <MeetingTimeTag>15h30</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={3} startTime="15:30:00" />
            <MeetingTimeTag>15h30</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={5} startTime="15:30:00" />
            <MeetingTimeTag>19h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={1} startTime="19:00:00" />
            <MeetingTimeTag>19h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={3} startTime="19:00:00" />
            <MeetingTimeTag>19h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={5} startTime="19:00:00" />
            <MeetingTimeTag>21h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={1} startTime="21:00:00" />
            <MeetingTimeTag>21h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={3} startTime="21:00:00" />
            <MeetingTimeTag>21h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={5} startTime="21:00:00" />
            <div style={{ textAlign: 'center', gridColumnStart: 1, gridColumnEnd: 3 }}>Terça</div>
            <div style={{ textAlign: 'center', gridColumnStart: 3, gridColumnEnd: 5 }}>Quinta</div>
            <div style={{ textAlign: 'center', gridColumnStart: 5, gridColumnEnd: 7 }}>Sábado</div>
            <MeetingTimeTag>08h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={2} startTime="08:00:00" />
            <MeetingTimeTag>08h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={4} startTime="08:00:00" />
            <MeetingTimeTag>08h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={6} startTime="08:00:00" />
            {/* <div>oi</div> */}
            <MeetingTimeTag>10h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={2} startTime="10:00:00" />
            <MeetingTimeTag>10h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={4} startTime="10:00:00" />
            <MeetingTimeTag>10h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={6} startTime="10:00:00" />
            <MeetingTimeTag>13h30</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={2} startTime="13:30:00" />
            <MeetingTimeTag>13h30</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={4} startTime="13:30:00" />
            <MeetingTimeTag>13h30</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={6} startTime="13:30:00" />
            <MeetingTimeTag>15h30</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={2} startTime="15:30:00" />
            <MeetingTimeTag>15h30</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={4} startTime="15:30:00" />
            <MeetingTimeTag>15h30</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={6} startTime="15:30:00" />
            <MeetingTimeTag>19h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={2} startTime="19:00:00" />
            <MeetingTimeTag>19h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={4} startTime="19:00:00" />
            <MeetingTimeTag>19h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={6} startTime="19:00:00" />
            <MeetingTimeTag>21h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={2} startTime="21:00:00" />
            <MeetingTimeTag>21h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={4} startTime="21:00:00" />
            <MeetingTimeTag>21h00</MeetingTimeTag>
            <ClassItem removeClass={removeClass} classes={classes} dayOfTheWeek={6} startTime="21:00:00" />
        </Grid>
    </div>
)

export default ClassGrid

import ClassCard from 'components/ClassCard'
import { prop } from 'lodash/fp'

const { default: styled } = require('styled-components')

const DayHeader = styled.div`
    width: 100%;
    text-align: center;
    border-bottom: 1px solid black;
`
const DayBox = styled.div`
    width: 30%;
    margin-right: 3%;
`

const MeetingTimeTag = styled.div`
    min-width: 55px;
    max-width: 55px;
    text-align: right;
    padding: 5px;
    margin: auto;
`

const ClassSlot = styled.div`
    width: 100%;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    display: flex;
`

const ClassItem = ({ dayOfTheWeek, startTime, classes = [] }) => {
    const [slotClass] = classes.filter((classItem) => {
        const classmeetingTimes = prop('meetingTimes', classItem) || []
        const meetingTimesStartTime = classmeetingTimes.map(prop('startTime'))
        const meetingTimesDayOfTheWeek = classmeetingTimes.map(prop('dayOfTheWeek'))
        const isOfCorrectDay = meetingTimesDayOfTheWeek.includes(dayOfTheWeek)
        const isOfCorrectTime = meetingTimesStartTime.includes(startTime)
        return isOfCorrectDay && isOfCorrectTime
    })

    return (
        <div style={{ width: 'calc(100% - 55px)', borderLeft: '1px solid black', backgroundColor: slotClass ? 'rgba(33, 90, 54, 0.15)' : 'transparent' }}>
            {slotClass && <ClassCard classroom={slotClass} showMeetingTimes={false} showBorder={false} />}
        </div>
    )
}

const ClassGrid = ({ classes }) => (
    <div>
        <div style={{ display: 'flex' }}>
            <DayBox>
                <DayHeader>Segunda</DayHeader>
                <ClassSlot>
                    <MeetingTimeTag>8h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={1} startTime="8:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>10h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={1} startTime="10:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>13h30</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={1} startTime="13:33:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>15h30</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={1} startTime="15:30:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>19h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={1} startTime="19:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>21h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={1} startTime="21:00:00" />
                </ClassSlot>
            </DayBox>
            <DayBox>
                <DayHeader>Terça</DayHeader>
                <ClassSlot>
                    <MeetingTimeTag>8h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={2} startTime="8:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>10h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={2} startTime="10:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>13h30</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={2} startTime="13:30:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>15h30</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={2} startTime="15:30:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>19h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={2} startTime="19:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>21h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={2} startTime="21:00:00" />
                </ClassSlot>
            </DayBox>
            <DayBox>
                <DayHeader>Quarta</DayHeader>
                <ClassSlot>
                    <MeetingTimeTag>8h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={3} startTime="8:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>10h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={3} startTime="10:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>13h30</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={3} startTime="13:30:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>15h30</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={3} startTime="15:30:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>19h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={3} startTime="19:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>21h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={3} startTime="21:00:00" />
                </ClassSlot>
            </DayBox>
        </div>
        <div style={{ display: 'flex' }}>
            <DayBox>
                <DayHeader>Quinta</DayHeader>
                <ClassSlot>
                    <MeetingTimeTag>8h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={4} startTime="8:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>10h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={4} startTime="10:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>13h30</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={4} startTime="13:30:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>15h30</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={4} startTime="15:30:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>19h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={4} startTime="19:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>21h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={4} startTime="21:00:00" />
                </ClassSlot>
            </DayBox>
            <DayBox>
                <DayHeader>Sexta</DayHeader>
                <ClassSlot>
                    <MeetingTimeTag>8h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={5} startTime="8:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>10h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={5} startTime="10:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>13h30</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={5} startTime="13:30:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>15h30</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={5} startTime="15:30:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>19h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={5} startTime="19:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>21h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={5} startTime="21:00:00" />
                </ClassSlot>
            </DayBox>
            <DayBox>
                <DayHeader>Sábado</DayHeader>
                <ClassSlot>
                    <MeetingTimeTag>8h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={6} startTime="8:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>10h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={6} startTime="10:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>13h30</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={6} startTime="13:30:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>15h30</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={6} startTime="15:30:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>19h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={6} startTime="19:00:00" />
                </ClassSlot>
                <ClassSlot>
                    <MeetingTimeTag>21h00</MeetingTimeTag>
                    <ClassItem classes={classes} dayOfTheWeek={6} startTime="21:00:00" />
                </ClassSlot>
            </DayBox>
        </div>
    </div>
)

export default ClassGrid

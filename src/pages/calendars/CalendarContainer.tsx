import React, { FC, useEffect, useRef, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import { toDate } from "date-fns-tz"
import { useGoogleLogin } from "@react-oauth/google"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { ModalBasic } from "../../components/Modal/CalendarModal"
import DatePicker from "react-datepicker"
import { Portal } from "react-overlays"
import { format, addHours, addMinutes, isPast } from "date-fns"
import { EventStatus, ICalendarEvent } from "../../types/event"
import { useDispatch, useSelector } from "react-redux"
import { IRootState } from "../../config/reducers"
import { LoginModal } from "../../components/Modal/LoginModal"
import { Google } from "react-bootstrap-icons"
import { AuthActions } from "../../reducers/auth-slice"
import { EventBackground } from "../../constants"
import viLocale from "@fullcalendar/core/locales/vi"

export type DateRange = {
  startDate?: Date | null
  endDate?: Date | null
}

export const yyyyMMdd = "yyyyMMdd"

const CalendarContainer: FC = () => {
  const { settings } = useSelector((state: IRootState) => state.settingsReducer)
  const [maxTime, setMaxTime] = useState<Date | undefined>()
  const [minTime, setMinTime] = useState<Date | undefined>()
  const calendarRef = useRef(null)
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: IRootState) => state.authReducer)
  const [count, setCount] = useState(0)
  const [addModalTitle, setAddModalTitle] = useState("")
  const [selected, setSelected] = useState(new Date())
  const [addEventTitle, setAddEventTitle] = useState("")
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [eventId, setEventId] = useState("")
  const [showAddEventModal, setShowAddEventModal] = useState(false)
  const [showModalLogin, setShowModalLogin] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showEditEventModal, setShowEditEventModal] = useState(false)
  const [events, setEvents] = useState<ICalendarEvent[]>([])
  // eslint-disable-next-line react/prop-types, @typescript-eslint/no-explicit-any
  const CalendarContainer = ({ children }: any) => {
    const el = document.getElementById("date-popup")

    return <Portal container={el}>{children}</Portal>
  }
  const [open, setOpen] = useState(false)

  const handleColor = (currentTime: Date) => {
    return startDate && currentTime >= startDate && (!endDate || currentTime <= endDate)
      ? "text-success fw-1"
      : ""
  }

  useEffect(() => {
    dispatch(AuthActions.getAccessTokenGoogle())
  }, [dispatch])

  useEffect(() => {
    if (settings) {
      const max = toDate(new Date(selected).setHours(0, 0, 0, 0), { timeZone: "Asia/Ho_Chi_Minh" })
      const min = toDate(new Date(selected).setHours(0, 0, 0, 0), { timeZone: "Asia/Ho_Chi_Minh" })
      const settingsMaxTimeArr = settings.workingTimeEnd?.toString().split(":")
      const settingsMinTimeArr = settings.workingTimeStart?.toString().split(":")

      if (settingsMaxTimeArr && settingsMaxTimeArr?.length > 0) {
        let maxDate = addHours(max, parseInt(settingsMaxTimeArr[0], 10))
        maxDate = addMinutes(maxDate, parseInt(settingsMaxTimeArr[1], 10))
        setMaxTime(maxDate)
      }

      if (settingsMinTimeArr && settingsMinTimeArr?.length > 0) {
        let minDate = addHours(min, parseInt(settingsMinTimeArr[0], 10))
        minDate = addMinutes(minDate, parseInt(settingsMinTimeArr[1], 10))
        if (isPast(minDate)) {
          const currentDate = new Date()
          setMinTime(
            toDate(
              new Date(selected).setHours(
                currentDate.getHours(),
                currentDate.getMinutes(),
                currentDate.getSeconds(),
                currentDate.getMilliseconds(),
              ),
              { timeZone: "Asia/Ho_Chi_Minh" },
            ),
          )
        } else {
          setMinTime(minDate)
        }
      }
    }
  }, [settings, selected])

  const closeModal = () => {
    setShowAddEventModal(false)
    setAddEventTitle("")
    setAddModalTitle("")
    setStartDate(null)
    setEndDate(null)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderEventContent = (eventInfo: any) => {
    return (
      <span
        className="text-nowrap text-truncate"
        style={{
          background: eventInfo.backgroundColor,
          width: "100%",
          display: "inline-block",
        }}
      >
        <small className="px-1" style={{ color: eventInfo.textColor }}>
          {eventInfo.timeText}
        </small>
        <span className="font-weight-bold" style={{ color: eventInfo.textColor }}>
          {eventInfo.event.title}
        </span>
      </span>
    )
  }

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      if (tokenResponse) {
        // get expires date
        const { expires_in } = tokenResponse
        const hour = Math.ceil(expires_in / 60) / 60
        const dateExpired = addHours(toDate(new Date(), { timeZone: "Asia/Ho_Chi_Minh" }), hour)
        localStorage.setItem(
          "google_cre",
          JSON.stringify({
            ...tokenResponse,
            dateExpired,
          }),
        )
        dispatch(AuthActions.authenticated())
        setShowModalLogin(false)
      }
    },
    onError: () => {
      dispatch(AuthActions.clear())
    },
  })

  const loginGoogle = () => {
    return (
      <>
        {showModalLogin && (
          <LoginModal
            show={showModalLogin}
            close={() => {
              setShowModalLogin(false)
            }}
          >
            <>
              <button className="btn btn-light flex-center" onClick={() => login()}>
                <Google color="blue" /> Login with google
              </button>
            </>
          </LoginModal>
        )}
      </>
    )
  }

  return (
    <div className="row">
      {loginGoogle()}
      {showAddEventModal && (
        <ModalBasic
          title={addModalTitle}
          show={showAddEventModal}
          close={() => {
            closeModal()
          }}
          handle={() => {
            if (!isAuthenticated) {
              setShowModalLogin(true)
              return
            }
            if (addEventTitle && startDate && endDate) {
              const current = [...events]
              current.push({
                id: new Date().toISOString(),
                title: addEventTitle,
                start: startDate,
                end: endDate,
                backgroundColor: EventBackground.PENDING,
                borderColor: EventBackground.PENDING_BORDER,
                textColor: EventBackground.PENDING_COLOR,
                status: EventStatus.PENDING,
              })
              setEvents(current)
              closeModal()
            }
          }}
        >
          <>
            <div className="form">
              <div className="form-input">
                <input
                  type="text"
                  onChange={(e) => setAddEventTitle(e.target.value)}
                  value={addEventTitle}
                  className="form-control"
                />
              </div>
              <div className="form-input">
                <DatePicker
                  onChange={(date) => {
                    const datePickerDate = new Date(date as unknown as Date)
                    const selectedEventDate = new Date(selected)
                    selectedEventDate.setHours(datePickerDate.getHours())
                    selectedEventDate.setMinutes(datePickerDate.getMinutes())
                    selectedEventDate.setSeconds(datePickerDate.getSeconds())
                    if (count === 0) {
                      setStartDate(selectedEventDate)
                    } else {
                      setEndDate(selectedEventDate)
                    }

                    setCount((count + 1) % 2)

                    if ((count + 1) % 2 === 0) {
                      setOpen(false)
                    } else {
                      setOpen(true)
                    }
                  }}
                  showTimeSelect
                  onInputClick={() => {
                    setOpen(true)
                  }}
                  open={count === 1 || open}
                  showTimeSelectOnly
                  showPopperArrow={false}
                  className="form-control"
                  timeIntervals={15}
                  dateFormat="HH:mm"
                  maxTime={maxTime}
                  minTime={minTime}
                  selectsRange
                  startDate={startDate}
                  timeClassName={handleColor}
                  endDate={endDate}
                  popperContainer={CalendarContainer}
                />
              </div>
            </div>
          </>
        </ModalBasic>
      )}
      <div className="col-md-12 ">
        <div className="calendar-container card p-3">
          <FullCalendar
            ref={calendarRef}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            events={events as any}
            eventClick={(ev) => {
              setEventId(ev.event.id)
              setShowEditEventModal(true)
            }}
            // titleFormat={{ year: "numeric", month: "short", day: "numeric" }}
            dayHeaderFormat={{ weekday: "long" }}
            buttonText={{
              today: "Hôm Nay",
            }}
            dateClick={(arg) => {
              setSelected(new Date(arg.date))
              setAddModalTitle(`Add new Event - ${format(new Date(arg.date), "MM/dd/yyyy")}`)
              setShowAddEventModal(true)
            }}
            editable
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            displayEventEnd={true}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            locale={viLocale}
            timeZone="local"
            eventContent={renderEventContent}
          />
        </div>
      </div>
    </div>
  )
}

export default CalendarContainer

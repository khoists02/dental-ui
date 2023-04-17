export interface ICalendarEvent {
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  classNames?: string[]
  start?: Date | null
  end?: Date | null
  title?: string
  id?: string
  status: EventStatus
  allDay?: boolean;
}

export enum EventStatus {
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
  APPROVE = "APPROVE"
}

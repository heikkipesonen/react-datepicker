import * as React from 'react'
import { Month, LocalDate, Year, DateTimeFormatter, DayOfWeek } from 'js-joda'

interface DatepickerContext {
  confirmLabel: string
  cancelLabel: string
  titleFormatter: (x: string, y: LocalDate) => string
  yearFormatter: (x: Year) => React.ReactNode
  monthFormatter: (x: Month) => React.ReactNode
  monthDayFormatter: (x: LocalDate | false) => React.ReactNode
  weekDayFormatter: (x: DayOfWeek) => React.ReactNode
  dateFormatter: (x: LocalDate) => string
}

const monthDateFormatter = DateTimeFormatter.ofPattern('d')
const dateFormatter = DateTimeFormatter.ofPattern('d.M.y')


export const DatepickerContext = React.createContext<DatepickerContext>({
  confirmLabel: 'OK',
  cancelLabel: 'Cancel',
  titleFormatter: (x, y) => `${x} ${y.format(dateFormatter)}`,
  yearFormatter: x => x.value(),
  monthFormatter: x => x.name(),
  monthDayFormatter: x => x ? monthDateFormatter.format(x) : '',
  weekDayFormatter: x => x.name().slice(0, 3),
  dateFormatter: x => x.format(dateFormatter)
})

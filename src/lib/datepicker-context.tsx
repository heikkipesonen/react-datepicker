import * as React from 'react'
import { Month, LocalDate, Year, DateTimeFormatter, DayOfWeek } from 'js-joda'

export interface DatepickerContext {
  confirmLabel: string
  cancelLabel: string

  yearPlusLabel: React.ReactNode
  yearMinusLabel: React.ReactNode

  titleFormatter: (x: string, y: LocalDate) => string
  yearFormatter: (x: Year) => React.ReactNode
  monthFormatter: (x: Month) => React.ReactNode
  monthDayFormatter: (x: LocalDate | false) => React.ReactNode
  weekDayFormatter: (x: DayOfWeek) => React.ReactNode
  dateFormatter: (x: LocalDate) => string
}

export const defaultConfig: DatepickerContext = {
  confirmLabel: 'OK',
  cancelLabel: 'Cancel',

  yearMinusLabel: '-',
  yearPlusLabel: '+',

  titleFormatter: (x, y) => `${x} ${y.format(DateTimeFormatter.ofPattern('d.M.y'))}`,
  yearFormatter: x => x.value(),
  monthFormatter: x => x.name(),
  monthDayFormatter: x => x ? DateTimeFormatter.ofPattern('d').format(x) : '',
  weekDayFormatter: x => x.name().slice(0, 3),
  dateFormatter: x => x.format(DateTimeFormatter.ofPattern('d.M.y'))
}

export const setConfig = (x: Partial<DatepickerContext>): DatepickerContext => ({
  ...defaultConfig,
  ...x
})

export const DatepickerContext = React.createContext<DatepickerContext>({...defaultConfig})

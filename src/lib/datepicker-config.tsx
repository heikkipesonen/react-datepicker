import { DateTimeFormatter, LocalDate } from 'js-joda'
import * as React from 'react'

export const defaultFormatter = DateTimeFormatter.ofPattern('d.M.yyyy')

export interface DatePickerConfig {
  valueFormatter: DateTimeFormatter,
  formatWeekday: (value: number) => React.ReactNode
  formatMonth: (value: LocalDate) => React.ReactNode
  formatYear: (value: LocalDate) => React.ReactNode
  formatDay: (value: LocalDate) => React.ReactNode

  monthSelectPrevBtnLabel: (value: LocalDate) => React.ReactNode
  monthSelectNextBtnLabel: (value: LocalDate) => React.ReactNode

  yearSelectPrevBtnLabel: (value: LocalDate) => React.ReactNode
  yearSelectNextBtnLabel: (value: LocalDate) => React.ReactNode


  closeAfterClick: boolean
}
export const defaultDatePickerConfig: DatePickerConfig = {
  valueFormatter: defaultFormatter,
  formatWeekday: (x) => {
    const days = [
      'Ma',
      'Ti',
      'Ke',
      'To',
      'Pe',
      'La',
      'Su',
    ]

    return days[x - 1] || ''
  },
  formatMonth: (x) => x.monthValue(),
  formatYear: (x) => x.year(),
  formatDay: (x) => x.dayOfMonth(),

  monthSelectPrevBtnLabel: () => '<',
  monthSelectNextBtnLabel: () => '>',

  yearSelectPrevBtnLabel: () => '<',
  yearSelectNextBtnLabel: () => '>',

  closeAfterClick: true,
}

export const datePickerConfig = React.createContext<Partial<DatePickerConfig>>(defaultDatePickerConfig)

export const useDatePickerConfig = (): DatePickerConfig => {
  const ctx = React.useContext(datePickerConfig)
  return {
    ...defaultDatePickerConfig,
    ...ctx
  }
}
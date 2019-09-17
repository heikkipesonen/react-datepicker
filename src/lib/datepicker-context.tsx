import * as React from 'react'
import * as O from 'fp-ts/lib/Option'
import { Month, LocalDate, Year, DateTimeFormatter, DayOfWeek } from 'js-joda'
import { pipe } from 'fp-ts/lib/pipeable';

export interface DatepickerContext {
  confirmLabel: string
  cancelLabel: string

  yearPlusLabel: React.ReactNode
  yearMinusLabel: React.ReactNode

  titleFormatter: (x: string, y: LocalDate | null) => string
  yearFormatter: (x: Year | null) => React.ReactNode
  monthFormatter: (x: Month | null) => React.ReactNode
  monthDayFormatter: (x: LocalDate | null) => React.ReactNode
  weekDayFormatter: (x: DayOfWeek | null) => React.ReactNode
  inputValueFormatter: (x: LocalDate | null) => string
}

export const defaultConfig: DatepickerContext = {
  confirmLabel: 'OK',
  cancelLabel: 'Cancel',

  yearMinusLabel: '-',
  yearPlusLabel: '+',

  titleFormatter: (x, y) => y ? `${x} ${y.format(DateTimeFormatter.ofPattern('d.M.y'))}` : `${x}`,
  yearFormatter: x => pipe(
    O.fromNullable(x),
    O.map(d => d.value()),
    O.toNullable
  ),
  monthFormatter: x => pipe(
    O.fromNullable(x),
    O.map(d => d.name()),
    O.toNullable
  ),
  monthDayFormatter: x => pipe(
    O.fromNullable(x),
    O.map(d => DateTimeFormatter.ofPattern('d').format(d)),
    O.toNullable
  ),
  weekDayFormatter: x => pipe(
    O.fromNullable(x),
    O.map(d => d.name().slice(0, 3)),
    O.toNullable
  ),
  inputValueFormatter: x => pipe(
    O.fromNullable(x),
    O.map(d => d.format(DateTimeFormatter.ofPattern('d.M.y'))),
    O.getOrElse(() => '')
  )
}

export const setConfig = (x: Partial<DatepickerContext>): DatepickerContext => ({
  ...defaultConfig,
  ...x
})

export const DatepickerContext = React.createContext<DatepickerContext>({ ...defaultConfig })

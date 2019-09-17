import * as O from 'fp-ts/lib/Option'
import {  LocalDate, YearMonth } from 'js-joda'

const createWeek = (): CalendarDateType[] => Array(7).fill(O.none)

const getLastEntry = <T extends Array<any>>(m: T) => m[m.length - 1]

export type CalendarDateType = O.Option<LocalDate>
export type WeekArrayType = Array<Array<CalendarDateType>>

const setToMonth = (m: WeekArrayType, d: LocalDate): WeekArrayType => {  
  const w = getLastEntry(m)  
  const wd = d.dayOfWeek()
  
  w[wd.value() - 1] = O.some(d)

  if (wd.value() === 7) {
    m.push(createWeek())    
  }

  return m
}

export const generateMonthCal = (m: YearMonth) => {  
  const days = m.lengthOfMonth()
  
  const cal: LocalDate[] = new Array(days)
  .fill(false)
  .map((_, i) => LocalDate.of(m.year(), m.month(), i + 1))

  const monthCal: WeekArrayType = [createWeek()]
  
  cal.forEach(x => {
    setToMonth(monthCal, x)
  })
  
  return monthCal
}


import {  LocalDate, YearMonth } from 'js-joda'

const createWeek = () => Array(7).fill(false)

const getLastEntry = <T extends Array<any>>(m: T) => m[m.length - 1]

type WeekArrayType = Array<Array<LocalDate | false>>

const setToMonth = (m: WeekArrayType, d: LocalDate) => {  
  const w = getLastEntry(m)
  const wd = d.dayOfWeek()
  
  w[wd.value() - 1] = d

  if (wd.value() === 7) {
    m.push(createWeek())    
  }

  return m
}

export const generateMonthCal = (m: YearMonth) => {  
  const days = m.lengthOfMonth()
  const cal = new Array(days).fill(false).map((_, i) => LocalDate.of(m.year(), m.month(), i + 1))  
  const monthCal: WeekArrayType = [createWeek()]
  
  cal.forEach(x => {
    setToMonth(monthCal, x)
  })
  
  return monthCal
}


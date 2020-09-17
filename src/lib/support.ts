import * as O from 'fp-ts/lib/Option'
import { LocalDate, YearMonth } from 'js-joda'

const createWeek = (): O.Option<LocalDate>[] => Array(7)
  .fill(false)
  .map(() => O.none)

export type Calendar = O.Option<LocalDate>[][]
export const getCalendar = (month: YearMonth): Calendar  => {
  const r: Record<string, O.Option<LocalDate>[]> = {}
  const days = month.lengthOfMonth()

  Array(days)
    .fill(false)
    .map((_, index) => LocalDate.of(month.year(), month.month(), index + 1))
    .forEach(x => {
      const weekNumber = x.isoWeekOfWeekyear()
      if (!r[weekNumber]) {
        r[weekNumber] = createWeek()
      }
      r[weekNumber][x.dayOfWeek().value() - 1] = O.some(x)
    })

  return Object.keys(r).map(key => r[key])
}
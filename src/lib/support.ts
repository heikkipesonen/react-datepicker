import * as O from 'fp-ts/lib/Option'
import { LocalDate, YearMonth } from 'js-joda'

const createWeek = (): O.Option<LocalDate>[] => Array(7)
  .fill(false)
  .map(() => O.none)

export type Calendar = O.Option<LocalDate>[][]
export const getCalendar = (month: YearMonth): Calendar  => {
  const r: O.Option<LocalDate>[][] = [createWeek()]
  const days = month.lengthOfMonth()

  Array(days)
    .fill(false)
    .map((_, index) => LocalDate.of(month.year(), month.month(), index + 1))
    .forEach(x => {
      const d = x.dayOfWeek().value()

      if (O.isSome(r[r.length-1][6])) {
        r.push(createWeek())
      }

      r[r.length - 1][d - 1] = O.some(x)
    })

  return r
}
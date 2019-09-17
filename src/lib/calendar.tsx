import * as React from 'react'
import classNames from 'classnames'
import { pipe } from 'fp-ts/lib/pipeable'
import * as O from 'fp-ts/lib/Option'

import * as C from './utils'
import { YearMonth, DayOfWeek, LocalDate} from 'js-joda'
import { baseClassName } from './classname'
import { DatepickerContext } from './datepicker-context'

interface Props {
  model: LocalDate    
  onClick: (d: LocalDate) => void
}

const className = baseClassName.extend('calendar')
const headingClassName = className.extend('header')
const weekClassName = className.extend('week')
const dayClassName = weekClassName.extend('day')

const headings = Array(7).fill(false).map((_, i) => DayOfWeek.of(i + 1))

export const Calendar = (props: Props) => {    
  const ctx = React.useContext(DatepickerContext)
  const cal = C.generateMonthCal(
    YearMonth.of(props.model.year(), props.model.month())
  )
  
  const handleClick = (d: LocalDate) => () => props.onClick(d)

  return (
    <table data-test-id="calendar" className={className.value}>
      <thead>
        <tr data-test-id="heading" className={headingClassName.value}>
          {headings.map(x => (
            <th data-test-id="heading-cell" key={x.name()} className={headingClassName.extend('item').value}>
              {ctx.weekDayFormatter(x)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
      {cal.map((week, index) => (
        <tr data-test-id="value-row" key={index} className={weekClassName.value}>
          {week.map((d, dindex) => pipe(
            d,
            O.map(x => (
            <td 
              data-test-id="value-cell"
              onClick={handleClick(x)}
              key={dindex} 
              className={classNames(
                dayClassName.value,
                {
                  [dayClassName.modify('selected').value]: x.equals(props.model)
                }                
              )}
            >
              {ctx.monthDayFormatter(x)}
            </td>
          )),
          O.getOrElse(() => (
              <td 
                data-test-id="value-cell"
                key={dindex} 
                className={classNames(
                  dayClassName.value,
                  dayClassName.modify('disabled').value,
                )}
              >
                {ctx.monthDayFormatter(null)}
              </td>            
          ))))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}

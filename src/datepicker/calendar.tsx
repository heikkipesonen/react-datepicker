import * as React from 'react'
import classNames from 'classnames'
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
  
  const handleClick = (d: LocalDate | false) => () => d && props.onClick(d)

  return (
    <table className={className.value}>
      <thead>
        <tr className={headingClassName.value}>
          {headings.map(x => (
            <th key={x.name()} className={headingClassName.extend('item').value}>
              {ctx.weekDayFormatter(x)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
      {cal.map((week, index) => (
        <tr key={index} className={weekClassName.value}>
          {week.map((x, dindex) => (
            <td 
              onClick={handleClick(x)}
              key={dindex} 
              className={classNames(
                dayClassName.value,
                {
                  [dayClassName.modify('disabled').value]: x === false,
                  [dayClassName.modify('selected').value]: x && x.equals(props.model)
                }                
              )}
            >
              {ctx.monthDayFormatter(x)}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}

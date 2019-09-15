import * as React from 'react'
import { Month, YearMonth } from 'js-joda'

import classNames from 'classnames'
import { baseClassName } from './classname'
import { DatepickerContext } from './datepicker-context'

const monthList = Array(12).fill(false).map((_, i) => Month.of(i + 1))

interface Props {
  yearMonth: YearMonth
  onClick: (d: YearMonth) => void  
}

const className = baseClassName.extend('monthselector')
const listClassName = className.extend('list')
const listItemClassName = listClassName.extend('item')

export const MonthSelector = (props: Props) => {
  const hanldeClick = (m: Month) => () => props.onClick(YearMonth.of(props.yearMonth.year(), m.value()))
  const ctx = React.useContext(DatepickerContext)

  return (
    <div className={className.value}>
      <div className={listClassName.value}>
        {monthList.map(x => (
          <div className={classNames(
            listItemClassName
              .value,
            {
              [listItemClassName
                .modify('selected')
                .value]: x.value() === props.yearMonth.monthValue()
            }
          )}
            key={x.name()}
            onClick={hanldeClick(x)}
          >
            {ctx.monthFormatter(x)}
          </div>
        ))}
      </div>
    </div>
  )
}
import { LocalDate } from 'js-joda'
import * as React from 'react'
import { useDatePickerConfig } from './datepicker-config'

import './month-selector.css'

interface Props {
  value: LocalDate
  onChange: (x: LocalDate) => void
}

export const MonthSelector: React.FC<Props> = (p) => {
  const cfg = useDatePickerConfig()
  const handleChange = (value: number) => () => p.onChange(p.value.plusMonths(value))

  return (
    <div className="calendar__monthselector__container">
      <button className="calendar__monthselector__control--prev" onClick={handleChange(-1)} data-test-id="monthselector__control--prev">
        {cfg.monthSelectPrevBtnLabel(p.value)}
      </button>
      <div className="calendar__monthselector__display" data-test-id="monthselector__display">
        {cfg.formatMonth(p.value)}
      </div>
      <button className="calendar__monthselector__control--next" onClick={handleChange(1)} data-test-id="monthselector__control--next">
        {cfg.monthSelectNextBtnLabel(p.value)}
      </button>
    </div>
  )
}

import { LocalDate } from 'js-joda'
import * as React from 'react'
import { useDatePickerConfig } from './datepicker-config'

interface Props {
  value: LocalDate
  onChange: (x: LocalDate) => void
}

export const YearSelector: React.FC<Props> = (p) => {
  const cfg = useDatePickerConfig()
  const handleChange = (value: number) => () => p.onChange(
    p.value.plusYears(value)
  )
  return (
    <div className="datepicker__yearselector__container">
      <button className="datepicker__yearselector__control datepicker__yearselector__control--prev" onClick={handleChange(-1)} data-testid="yearselector__control--prev">
        {cfg.yearSelectPrevBtnLabel(p.value)}
      </button>
      <div className="datepicker__yearselector__display" data-testid="datepicker__yearselector__display">
        {cfg.formatYear(p.value)}
      </div>
      <button className="datepicker__yearselector__control datepicker__yearselector__control--next" onClick={handleChange(1)} data-testid="yearselector__control--next">
        {cfg.yearSelectNextBtnLabel(p.value)}
      </button>
    </div>
  )
}

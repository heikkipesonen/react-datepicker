import { LocalDate } from 'js-joda'
import * as React from 'react'

import { Calendar } from './calendar-view'
import { MonthSelector } from './month-selector'

import './datepicker.scss'
import { YearSelector } from './year-selector'
import { DatePickerOverlay } from './overlay'
import { useDatePickerConfig } from './datepicker-config'

interface Props {
  onClose: () => void
  onChange: (x: LocalDate) => void
  value: LocalDate | null
}

export const DatePicker: React.FC<Props> = (p) => {
  const config = useDatePickerConfig()
  // state is here because prop might be null
  // picker does not display null value and does not care,
  // defaults to current day
  const [state, setState] = React.useState<LocalDate>(p.value ? p.value : LocalDate.now())

  React.useEffect(() => {
    setState(p.value ? p.value : LocalDate.now())
  }, [p.value])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  const handleDayChange = (x: LocalDate) => {
    p.onChange(x)
    if (config.closeAfterClick) {
      p.onClose()
    }
  }

  return (
    <div className="datepicker__container">
      <DatePickerOverlay onClick={p.onClose} />
      <div className="datepicker__inner-container" onClick={handleClick} data-testid="datepicker">
        <YearSelector value={state} onChange={p.onChange} />
        <MonthSelector value={state} onChange={p.onChange} />
        <Calendar value={state} onChange={handleDayChange} />
      </div>
    </div>
  )
}

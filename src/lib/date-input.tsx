import * as React from 'react'
import { LocalDate } from 'js-joda'
import { DatePicker } from './datepicker'
import { useDatePickerConfig } from './datepicker-config'

import './date-input.scss'

// const parseValue = (formatter: DateTimeFormatter) => (x: string) => O.fromNullable(LocalDate.parse(x, formatter))
interface DateInputProps{
  value: LocalDate | null
  onChange: (x: LocalDate) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  className?: string,
}

export const DateInput: React.FC<DateInputProps> = (p) => {
  const config = useDatePickerConfig()
  const [state, setState] = React.useState<LocalDate | null>(null)
  const [visible, setVisible] = React.useState<boolean>(false)

  const formatedValue = state == null ? '' : state.format(config.valueFormatter)

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setVisible(true)
    if (p.onFocus) {
      p.onFocus(e)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (p.onBlur) {
      p.onBlur(e)
    }
  }

  const handleClose = () => {
    setVisible(false)
  }

  const handleChange = (x: LocalDate) => {
    p.onChange(x)
  }
  // prevent typing into input
  // TODO: allow typing
  const toVoid = () => { }

  React.useEffect(() => {
    setState(p.value)
  }, [p.value])

  const classNames = [
    'datepicker-input',
    visible ? 'datepicker-active' : false,
    p.className ? p.className : false,
  ].filter(x => x)

  return (
    <div className="datepicker-input__container">
      <input className={classNames.join(' ')} type="text" value={formatedValue} onFocus={handleFocus} onBlur={handleBlur} onChange={toVoid} />
      {visible ? <DatePicker value={state} onChange={handleChange} onClose={handleClose}  /> : null}
    </div>
  )
}
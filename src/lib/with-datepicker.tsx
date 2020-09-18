import * as React from 'react'
import * as O from 'fp-ts/lib/Option'

import { DateTimeFormatter, LocalDate } from 'js-joda'
import { DatePicker } from './datepicker'
import { useDatePickerConfig } from './datepicker-config'

import { pipe } from 'fp-ts/lib/pipeable'

const parseValue = (formatter: DateTimeFormatter) => (x: string) =>
  pipe(
    x,
    O.fromNullable,
    O.chain(v => {
      try {
        const value = LocalDate.parse(v, formatter)
        return O.some(value)
      } catch (e) {
        return O.none
      }
    })

  )

interface WithDatepickerProps {
  value: LocalDate | null
  onChange: (value: LocalDate | null) => void,
  children: (props: InputProps) => React.ReactNode
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
}

interface InputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

const getFormattedValue = (x: LocalDate | null, formatter: DateTimeFormatter) => pipe(
  x,
  O.fromNullable,
  O.map(v => v.format(formatter)),
  O.getOrElse(() => '')
)

export const WithDatepicker: React.FC<WithDatepickerProps> = (p: WithDatepickerProps) => {
  const cfg = useDatePickerConfig()
  const [inputValue, setInputValue] = React.useState<string>(getFormattedValue(p.value, cfg.valueFormatter))
  const [focused, setFocused] = React.useState<boolean>(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value)

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const displayValue = pipe(
      inputValue,
      parseValue(cfg.valueFormatter),
      O.getOrElse(() => p.value)
    )

    if (p.onBlur) { p.onBlur(e) }
    setFocused(false)
    p.onChange(displayValue)
    setInputValue(getFormattedValue(displayValue, cfg.valueFormatter))
  }

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (p.onFocus){ p.onFocus(e) }
    setFocused(true)
  }
  const handleDatepickerClose = () => setFocused(false)

  React.useEffect(() => {
    setInputValue(getFormattedValue(p.value, cfg.valueFormatter))
  }, [p.value, cfg.valueFormatter])

  const inputProps: InputProps = {
    value: inputValue,
    onBlur: handleInputBlur,
    onFocus: handleInputFocus,
    onChange: handleInputChange
  }

  return (
    <>
      {p.children(inputProps)}
      {focused ? <DatePicker value={p.value} onChange={p.onChange} onClose={handleDatepickerClose} /> : null}
    </>
  )
}
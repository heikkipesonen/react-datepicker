import * as React from 'react'
import { baseClassName } from './classname'
import { LocalDate } from 'js-joda'
import { DatePicker } from './datepicker'
import { DatepickerContext } from './datepicker-context'

const className = baseClassName.extend('input')

interface Props {
  name: string
  onChange: (x: LocalDate) => void

  value: LocalDate | null
}

export const DatepickerInput = (props: Props) => {

  const [focused, setFocused] = React.useState<boolean>(false)
  const ctx = React.useContext(DatepickerContext)

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {    
    setFocused(true)    
    e.target.blur()
  }

  const handleBlur = () => {
    setFocused(false)
  }

  const handleCancel = () => {
    handleBlur()
  }

  const hanldeComplete = (x: LocalDate) => {
    props.onChange(x)
    handleBlur()
  }

  const handleInputChange = () => {
    // do nothing
  }

  return (
    <>
      <input
        data-test-id="datepicker-input"
        type="text"
        className={className.value}
        onFocus={handleFocus}
        value={ctx.inputValueFormatter(props.value)}
        onChange={handleInputChange}
      />      
      {focused && (
        <DatePicker
          title={props.name}
          model={props.value}
          onCancel={handleCancel}
          onComplete={hanldeComplete}
        />
      )}
    </>
  )
}
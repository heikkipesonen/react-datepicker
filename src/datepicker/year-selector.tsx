import * as React from 'react'
import { Year } from 'js-joda'
import { baseClassName, buttonClassName } from './classname'
import { DatepickerContext } from './datepicker-context'

interface Props {
  model: Year
  onChange: (x: Year) => void
}

const className = baseClassName.extend('yearselector')
const labelClassName = className.extend('label')

export const YearSelector = (props: Props) => {
  const ctx = React.useContext(DatepickerContext)
  const hanldeChange = (x: number) => () => props.onChange(
    Year.of(props.model.value() + x)
  )
  
  return (
    <div data-test-id="year-selector" className={className.value}>
      <div className={labelClassName.value}>
        <button
          data-test-id="btn-subtract"
          onClick={hanldeChange(-1)}
          className={buttonClassName.join(
            className.extend('control')
          ).value()}>
          {ctx.yearMinusLabel}
      </button>
        <h2 className={className.extend('title').value}>
          {ctx.yearFormatter(props.model)}
        </h2>
        <button
          data-test-id="btn-add"
          onClick={hanldeChange(1)}
          className={buttonClassName.join(
            className.extend('control')
          ).value()}>
          {ctx.yearPlusLabel}
      </button>
      </div>
    </div>
  )
}
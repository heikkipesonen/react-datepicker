import * as React from 'react'
import { Year } from 'js-joda'
import { baseClassName } from './classname'
import { DatepickerContext } from './datepicker-context'

interface Props {
  model: Year
}

const className = baseClassName.extend('yearselector')
const labelClassName = className.extend('label')

export const YearSelector = (props: Props) => {
  const ctx = React.useContext(DatepickerContext)
  
  return (
  <div className={className.value}>
    <div className={labelClassName.value}>
      <h2 className={className.extend('title').value}>
        {ctx.yearFormatter(props.model)}
      </h2>      
    </div>
  </div>
)}
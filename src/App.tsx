import { DateTimeFormatter, LocalDate } from 'js-joda'
import React, { useState } from 'react'
import { WithDatepicker } from './lib'
import { datePickerConfig } from './lib/datepicker-config'

export function App() {
  const [state, setState] = useState<LocalDate | null>(LocalDate.now())
  return (
    <datePickerConfig.Provider value={{}}>
      <WithDatepicker value={state} onChange={setState} >
      {input => <input {...input} />}
      </WithDatepicker>
    </datePickerConfig.Provider>
  )
}

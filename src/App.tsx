import { DateTimeFormatter, LocalDate } from 'js-joda'
import React, { useState } from 'react'
import { DateInput } from './lib/date-input'
import { datePickerConfig } from './lib/datepicker-config'

export function App() {
  const [state, setState] = useState(LocalDate.now())

  return (
    <datePickerConfig.Provider value={{}}>
      {state.format(DateTimeFormatter.ofPattern('dd.MM.yyyy'))}
      <DateInput value={state} onChange={setState} />
    </datePickerConfig.Provider>
  )
}

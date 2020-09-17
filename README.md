# oh wow, picker of much dates

![OH WOW](./doge.png)

a datepicker that does not suck (most of the time) for react. uses js-joda for date models.

## running locally
```
> yarn
> yarn start
```

## building lib
```
> yarn
> yarn build:lib
```

## much typescript

written in typescript. almost.

## such usage, oh wow

```javascript
import React, { useState } from 'react'

import { LocalDate } from 'js-joda'
import { WithDatepicker } from './lib'
import { datePickerConfig } from './lib/datepicker-config'

export function App() {
  const [state, setState] = useState<LocalDate | null>(LocalDate.now())
  return (
    <datePickerConfig.Provider value={{
      valueFormatter: DateTimeFormatter
      formatWeekday: (value: number) => React.ReactNode
      formatMonth: (value: LocalDate) => React.ReactNode
      formatYear: (value: LocalDate) => React.ReactNode
      formatDay: (value: LocalDate) => React.ReactNode

      monthSelectPrevBtnLabel: (value: LocalDate) => React.ReactNode
      monthSelectNextBtnLabel: (value: LocalDate) => React.ReactNode

      yearSelectPrevBtnLabel: (value: LocalDate) => React.ReactNode
      yearSelectNextBtnLabel: (value: LocalDate) => React.ReactNode


      closeAfterClick: boolean
    }}>
      <WithDatepicker value={state} onChange={setState} >
      {input => <input {...input} />}
      </WithDatepicker>
    </datePickerConfig.Provider>
  )
}

  ```
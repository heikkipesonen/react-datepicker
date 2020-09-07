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
  ```
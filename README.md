# oh wow, picker of much dates

![OH WOW](./doge.png)

a datepicker that does not suck ass (most of the time) for react. uses js-joda for date models.

## running locally
```
> yarn
> yarn start
```

## building for prod
```
> yarn
> yarn build
```

## much typescript

written in typescript. almost.

## such usage, oh wow

```javascript
import { LocalDate } from 'js-joda'

const View = () => {
  const [state, useState] = React.useState<LocalDate>(LocalDate.now)

  return (
    <DatepickerInput
      name={'datepicker-input'}
      onChange={setState}
      value={state}
    />
  )
}

  ```
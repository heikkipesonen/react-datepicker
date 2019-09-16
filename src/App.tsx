import React from 'react'
import { LocalDate } from 'js-joda'

import './app.scss'
import './lib/datepicker.scss'
import { DatepickerInput } from './lib'

const App: React.FC = () => {
  const [state, setState] = React.useState<LocalDate>(LocalDate.now())

  return (
    <DatepickerInput 
      name={'datepicker-input'}
      onChange={setState}
      value={state}
    />
  );
}

export default App;

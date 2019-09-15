import React from 'react'
import { LocalDate } from 'js-joda'

import './App.scss'
import { DatepickerInput } from './datepicker'

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

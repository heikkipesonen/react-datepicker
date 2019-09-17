import React from 'react'
import { LocalDate } from 'js-joda'

import './app.scss'
import './lib/datepicker.scss'
import { DatepickerInput, DatepickerContext, setConfig } from './lib'

const App: React.FC = () => {
  const [state, setState] = React.useState<LocalDate>(LocalDate.now())
  const [stateNull, setStateNull] = React.useState<LocalDate | null>(null)

  return (
    <DatepickerContext.Provider value={setConfig({
      yearMinusLabel: '<',
      yearPlusLabel: '>'
    })}>
      <DatepickerInput 
        name={'datepicker-input'}
        onChange={setState}
        value={state}
      />
      <DatepickerInput 
        name={'datepicker-input'}
        onChange={setStateNull}
        value={stateNull}
      />      
    </DatepickerContext.Provider>
  );
}

export default App;

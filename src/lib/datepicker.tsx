import * as React from 'react'
import { YearMonth, LocalDate, Year } from 'js-joda'

import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

import { Calendar } from './calendar'
import { MonthSelector } from './month-selector'
import { baseClassName, buttonClassName } from './classname'
import { YearSelector } from './year-selector'
import { DatepickerContext } from './datepicker-context'

const className = baseClassName.extend('modal')
const container = className.extend('container')
const containerTitle = container.extend('titlecontainer')
const containerControl = container.extend('controls')

interface PickerProps {
  title: string
  model: LocalDate | null
  onComplete: (x: LocalDate) => void
  onCancel: () => void
}


export const DatePicker = (props: PickerProps) => {
  const [state, setState] = React.useState<LocalDate>(
    pipe(
      O.fromNullable(
        props.model
      ),
      O.getOrElse(() => LocalDate.now())
    )

  )

  const yearMonth = YearMonth.of(state.year(), state.month())
  const ctx = React.useContext(DatepickerContext)

  const setMonth = (x: YearMonth) =>
    setState(
      LocalDate.of(
        state.year(),
        x.month(),
        state.dayOfMonth()
      )
    )

  const setYear = (x: Year) =>
    setState(
      LocalDate.of(
        x.value(),
        state.month(),
        state.dayOfMonth()
      )
    )

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation()
  const handleOnComplete = () => props.onComplete(state)
  const handleOnCancel = () => props.onCancel()

  return (
    <div data-test-id="datepicker-wrapper" className={className.extend('wrapper').value} onClick={handleOnCancel}>
      <div data-test-id="datepicker-body" className={container.value} onClick={stopPropagation}>
        <div className={containerTitle.value}>
          <div data-test-id="title" className={containerTitle.extend('title').value}>
            {ctx.titleFormatter(props.title, state)}
          </div>
          <YearSelector
            onChange={setYear}
            model={Year.of(yearMonth.year())}
          />
        </div>
        <div className={container.extend('inner').value}>
          <MonthSelector
            yearMonth={yearMonth}
            onClick={setMonth}
          />
          <div className={className.extend('content').value}>
            <Calendar
              model={state}
              onClick={setState}
            />
          </div>
        </div>
        <div className={containerControl.value}>
          <button
            data-test-id="btn-cancel"
            onClick={handleOnCancel}
            className={
              buttonClassName.join(
                containerControl.modify('cancel')
              ).value()
            }
          >
            {ctx.cancelLabel}
          </button>
          <button
            data-test-id="btn-ok"
            onClick={handleOnComplete}
            className={
              buttonClassName.join(
                containerControl.modify('accept')
              ).value()
            }
          >
            {ctx.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
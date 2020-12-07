import * as React from 'react'

import '@testing-library/jest-dom'

import { render } from '@testing-library/react'
import { LocalDate } from 'js-joda'

import { WithDatepicker } from '../with-datepicker'
import { defaultFormatter } from '../datepicker-config'


import * as PG from '../page-objects'

describe('with datepicker', () => {
  test('render empty on null value', () => {
    const view = PG.Datepicker.from(render(
      <WithDatepicker value={null} onChange={jest.fn}>
        {field => <input data-testid="field" {...field} />}
      </WithDatepicker>
    ))

    expect(view.fieldValue()).toEqual('')
  })

  test('render initial value', () => {
    const view = PG.Datepicker.from(render(
      <WithDatepicker value={LocalDate.now()} onChange={jest.fn}>
        {field => <input data-testid="field" {...field} />}
      </WithDatepicker>
    ))
    expect(view.fieldValue()).toEqual(LocalDate.now().format(defaultFormatter))
  })

  test('open datepicker when input is focused', async () => {
    const view = PG.Datepicker.from(render(
      <WithDatepicker value={null} onChange={jest.fn}>
        {field => <input data-testid="field" {...field} />}
      </WithDatepicker>
    ))

    expect(view.isDatepickerOpen()).toBeFalsy()
    view.focusInput()
    expect(view.isDatepickerOpen()).toBeTruthy()
    expect(view.fieldValue()).toEqual('')
  })

  test('select date', () => {
    const onChange = jest.fn()
    const model = LocalDate.now().withDayOfMonth(1)

    const view = PG.Datepicker.from(render(
      <WithDatepicker value={model} onChange={onChange}>
        {field => <input data-testid="field" {...field} />}
      </WithDatepicker>
    ))

    view.focusInput()
    expect(onChange).not.toHaveBeenCalled()
    view.selectDay(model.plusDays(1).dayOfMonth())
    expect(onChange).toHaveBeenCalledWith(model.plusDays(1))

    expect(view.isDatepickerOpen()).toBeFalsy()
  })

  test('next month', () => {
    const onChange = jest.fn()
    const model = LocalDate.now().withDayOfMonth(1)

    const view = PG.Datepicker.from(render(
      <WithDatepicker value={model} onChange={onChange}>
        {field => <input data-testid="field" {...field} />}
      </WithDatepicker>
    ))

    view.focusInput()
    view.nextMonth()
    expect(onChange).toHaveBeenCalledWith(model.plusMonths(1))
    expect(view.isDatepickerOpen()).toBeTruthy()
  })

  test('prev month', () => {
    const onChange = jest.fn()
    const model = LocalDate.now().withDayOfMonth(1)

    const view = PG.Datepicker.from(render(
      <WithDatepicker value={model} onChange={onChange}>
        {field => <input data-testid="field" {...field} />}
      </WithDatepicker>
    ))

    view.focusInput()
    view.prevMonth()
    expect(onChange).toHaveBeenCalledWith(model.plusMonths(-1))
    expect(view.isDatepickerOpen()).toBeTruthy()
  })

  test('next year', () => {
    const onChange = jest.fn()
    const model = LocalDate.now().withDayOfMonth(1)

    const view = PG.Datepicker.from(render(
      <WithDatepicker value={model} onChange={onChange}>
        {field => <input data-testid="field" {...field} />}
      </WithDatepicker>
    ))

    view.focusInput()
    view.nextYear()
    expect(onChange).toHaveBeenCalledWith(model.plusYears(1))
    expect(view.isDatepickerOpen()).toBeTruthy()
  })

  test('prev year', () => {
    const onChange = jest.fn()
    const model = LocalDate.now().withDayOfMonth(1)

    const view = PG.Datepicker.from(render(
      <WithDatepicker value={model} onChange={onChange}>
        {field => <input data-testid="field" {...field} />}
      </WithDatepicker>
    ))

    view.focusInput()
    view.prevYear()
    expect(onChange).toHaveBeenCalledWith(model.plusYears(-1))
    expect(view.isDatepickerOpen()).toBeTruthy()
  })

  describe('typing into input', () => {
    test('valid', async () => {
      const onChange = jest.fn()
      const view = PG.Datepicker.from(render(
        <WithDatepicker value={null} onChange={onChange}>
          {field => <input data-testid="field" {...field} />}
        </WithDatepicker>
      ))

      await view.setFieldValue(LocalDate.now().format(defaultFormatter))
      expect(onChange).toHaveBeenCalledWith(LocalDate.now())
    })

    test('invalid', async () => {
      const onChange = jest.fn()
      const view = PG.Datepicker.from(render(
        <WithDatepicker value={null} onChange={onChange}>
          {field => <input data-testid="field" {...field} />}
        </WithDatepicker>
      ))

      await view.setFieldValue('kissa')
      expect(onChange).toHaveBeenCalledWith(null)
    })
  })
})
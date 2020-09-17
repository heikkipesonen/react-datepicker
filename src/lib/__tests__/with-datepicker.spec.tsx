import * as React from 'react'

import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { fireEvent, render } from '@testing-library/react'
import { LocalDate } from 'js-joda'

import { WithDatepicker } from '../with-datepicker'
import { defaultFormatter } from '../datepicker-config'

describe('with datepicker', () => {
  test('render empty on null value', () => {
    const view = render(
      <WithDatepicker value={null} onChange={jest.fn}>
        {field => <input data-testid="field" {...field} />}
      </WithDatepicker>

    )
    expect(view.getByTestId('field').getAttribute('value')).toEqual('')
  })

  test('render initial value', () => {
    const view = render(
      <WithDatepicker value={LocalDate.now()} onChange={jest.fn}>
        {field => <input data-testid="field" {...field} />}
      </WithDatepicker>
    )
    expect(view.getByTestId('field').getAttribute('value')).toEqual(LocalDate.now().format(defaultFormatter))
  })

  test('open datepicker when input is focused', async () => {
    const view = render(
      <WithDatepicker value={null} onChange={jest.fn}>
        {field => <input data-testid="field" {...field} />}
      </WithDatepicker>
    )

    expect(view.queryByTestId('datepicker')).toBeNull()
    userEvent.click(view.getByTestId('field'))
    expect(view.getByTestId('datepicker')).toBeDefined()
    expect(view.getByTestId('field').getAttribute('value')).toEqual('')
  })

  test('close datepicker when backdrop is clicked', async () => {
    const view = render(
      <WithDatepicker value={null} onChange={jest.fn}>
        {field => <input data-testid="field" {...field} />}
      </WithDatepicker>
    )

    expect(view.queryByTestId('datepicker')).toBeNull()
    userEvent.click(view.getByTestId('field'))
    expect(view.getByTestId('datepicker')).toBeDefined()

    userEvent.click(view.getByTestId('datepicker__overlay'))
    expect(view.queryByTestId('datepicker')).toBeNull()
  })

  test('select date', () => {
    const onChange = jest.fn()
    const model = LocalDate.now().withDayOfMonth(1)

    const view = render(
      <WithDatepicker value={model} onChange={onChange}>
        {field => <input data-testid="field" {...field} />}
      </WithDatepicker>
    )

    userEvent.click(view.getByTestId('field'))

    expect(view.getByTestId('datepicker')).toBeDefined()
    expect(onChange).not.toHaveBeenCalled()

    userEvent.click(view.getByTestId(`calendar__day--${model.plusDays(1).dayOfMonth()}`))
    expect(onChange).toHaveBeenCalledWith(model.plusDays(1))
    expect(view.queryByTestId('datepicker')).toBeNull()
  })

  describe('typing into input', () => {
    test('valid', async () => {
      const onChange = jest.fn()
      const view = render(
        <WithDatepicker value={null} onChange={onChange}>
          {field => <input data-testid="field" {...field} />}
        </WithDatepicker>
      )

      const field = view.getByTestId('field')
      await userEvent.type(field, LocalDate.now().format(defaultFormatter))
      fireEvent.blur(field)
      expect(onChange).toHaveBeenCalledWith(LocalDate.now())
    })

    test('invalid', async () => {
      const onChange = jest.fn()
      const view = render(
        <WithDatepicker value={null} onChange={onChange}>
          {field => <input data-testid="field" {...field} />}
        </WithDatepicker>
      )

      const field = view.getByTestId('field')
      await userEvent.type(field, 'asdkljflkasdjfasdfasdf')
      fireEvent.blur(field)
      expect(onChange).toHaveBeenCalledWith(null)
    })
  })
})
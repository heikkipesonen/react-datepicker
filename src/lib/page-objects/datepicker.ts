import { fireEvent, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export class Datepicker {
  constructor (
    private readonly ctx: RenderResult,
  ) {}

  public fieldValue = () => this.field().getAttribute('value')
  public setFieldValue = async (value: string) => {
    await userEvent.type(this.field(), value)
    fireEvent.blur(this.field())
  }

  public field = () => this.ctx.getByTestId('field')
  public focusInput = () => userEvent.click(this.field())

  public datepicker = () => this.ctx.getByTestId('datepicker')
  public isDatepickerOpen = () => this.ctx.queryByTestId('datepicker') !== null

  public getDayCell = (day: number) =>
    this.ctx.getByTestId(`datepicker__calendar__day--${day}`)
  public selectDay = (day: number) =>
    userEvent.click(
      this.getDayCell(day)
    )

  public nextYear = () =>
    userEvent.click(this.ctx.getByTestId('yearselector__control--next'))
  public prevYear = () =>
    userEvent.click(this.ctx.getByTestId('yearselector__control--prev'))

  public nextMonth = () =>
    userEvent.click(this.ctx.getByTestId('monthselector__control--next'))

  public prevMonth = () =>
    userEvent.click(this.ctx.getByTestId('monthselector__control--prev'))

  public static from = (ctx: RenderResult) => new Datepicker(ctx)
}
import * as React from 'react'
import './overlay.css'

interface Props {
  onClick: () => void
}

export const DatePickerOverlay: React.FC<Props> = (p: Props) => {
  const handleAndPreventClickPropagation = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    p.onClick()
  }

  return (
    <div className="datepicker__overlay" onClick={handleAndPreventClickPropagation} data-test-id="datepicker__overlay"/>
)
}

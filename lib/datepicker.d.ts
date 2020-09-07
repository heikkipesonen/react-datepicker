import { LocalDate } from 'js-joda';
import * as React from 'react';
import './datepicker.css';
interface Props {
    onClose: () => void;
    onChange: (x: LocalDate) => void;
    value: LocalDate | null;
}
export declare const DatePicker: React.FC<Props>;
export {};

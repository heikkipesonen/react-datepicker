import { LocalDate } from 'js-joda';
import * as React from 'react';
import './calendar-view.css';
interface Props {
    value: LocalDate;
    onChange: (x: LocalDate) => void;
}
export declare const Calendar: React.FC<Props>;
export {};

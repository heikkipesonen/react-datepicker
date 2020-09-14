import { LocalDate } from 'js-joda';
import * as React from 'react';
import './calendar-view.scss';
interface Props {
    value: LocalDate;
    onChange: (x: LocalDate) => void;
}
export declare const Calendar: React.FC<Props>;
export {};

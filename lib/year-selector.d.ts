import { LocalDate } from 'js-joda';
import * as React from 'react';
import './year-selector.css';
interface Props {
    value: LocalDate;
    onChange: (x: LocalDate) => void;
}
export declare const YearSelector: React.FC<Props>;
export {};

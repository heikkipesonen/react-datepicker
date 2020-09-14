import { LocalDate } from 'js-joda';
import * as React from 'react';
import './year-selector.scss';
interface Props {
    value: LocalDate;
    onChange: (x: LocalDate) => void;
}
export declare const YearSelector: React.FC<Props>;
export {};

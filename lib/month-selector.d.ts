import { LocalDate } from 'js-joda';
import * as React from 'react';
interface Props {
    value: LocalDate;
    onChange: (x: LocalDate) => void;
}
export declare const MonthSelector: React.FC<Props>;
export {};

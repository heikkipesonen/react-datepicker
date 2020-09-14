import * as React from 'react';
import { LocalDate } from 'js-joda';
import './date-input.scss';
interface DateInputProps {
    value: LocalDate | null;
    onChange: (x: LocalDate) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    className?: string;
}
export declare const DateInput: React.FC<DateInputProps>;
export {};

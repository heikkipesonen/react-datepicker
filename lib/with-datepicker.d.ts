import * as React from 'react';
import { LocalDate } from 'js-joda';
interface WithDatepickerProps {
    value: LocalDate | null;
    onChange: (value: LocalDate | null) => void;
    children: (props: InputProps) => React.ReactNode;
}
interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}
export declare const WithDatepicker: React.FC<WithDatepickerProps>;
export {};

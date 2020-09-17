import { DateTimeFormatter, LocalDate } from 'js-joda';
import * as React from 'react';
export declare const defaultFormatter: DateTimeFormatter;
export interface DatePickerConfig {
    valueFormatter: DateTimeFormatter;
    formatWeekday: (value: number) => React.ReactNode;
    formatMonth: (value: LocalDate) => React.ReactNode;
    formatYear: (value: LocalDate) => React.ReactNode;
    formatDay: (value: LocalDate) => React.ReactNode;
    monthSelectPrevBtnLabel: (value: LocalDate) => React.ReactNode;
    monthSelectNextBtnLabel: (value: LocalDate) => React.ReactNode;
    yearSelectPrevBtnLabel: (value: LocalDate) => React.ReactNode;
    yearSelectNextBtnLabel: (value: LocalDate) => React.ReactNode;
    closeAfterClick: boolean;
}
export declare const defaultDatePickerConfig: DatePickerConfig;
export declare const datePickerConfig: React.Context<Partial<DatePickerConfig>>;
export declare const useDatePickerConfig: () => DatePickerConfig;

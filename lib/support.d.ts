import * as O from 'fp-ts/lib/Option';
import { LocalDate, YearMonth } from 'js-joda';
export declare type Calendar = O.Option<LocalDate>[][];
export declare const getCalendar: (month: YearMonth) => Calendar;

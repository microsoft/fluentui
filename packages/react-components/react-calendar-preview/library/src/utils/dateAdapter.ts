/**
 * Date operations required by the Calendar components.
 *
 * An adapter can use any immutable or mutable date representation. Months are zero-based to match the existing
 * Calendar API.
 */
export type CalendarDateAdapter<TDate> = {
  addDays(date: TDate, days: number): TDate;
  addMonths(date: TDate, months: number): TDate;
  addYears(date: TDate, years: number): TDate;
  compareDates(date1: TDate, date2: TDate): number;
  createDate(year: number, month: number, day: number): TDate;
  getDate(date: TDate): number;
  getDay(date: TDate): number;
  getMonth(date: TDate): number;
  getYear(date: TDate): number;
  now(): TDate;
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
};

const addMonths = (date: Date, months: number): Date => {
  let result = new Date(date.getTime());
  const targetMonth = result.getMonth() + months;
  result.setMonth(targetMonth);

  const normalizedTargetMonth = ((targetMonth % 12) + 12) % 12;
  if (result.getMonth() !== normalizedTargetMonth) {
    result = addDays(result, -result.getDate());
  }

  return result;
};

const addYears = (date: Date, years: number): Date => {
  let result = new Date(date.getTime());
  result.setFullYear(date.getFullYear() + years);

  if (result.getMonth() !== date.getMonth()) {
    result = addDays(result, -result.getDate());
  }

  return result;
};

const createDate = (year: number, month: number, day: number): Date => {
  const date = new Date(0);
  date.setHours(0, 0, 0, 0);
  date.setFullYear(year, month, day);
  return date;
};

/**
 * Adapter for the native JavaScript `Date` API using local calendar fields.
 */
export const dateAdapter: CalendarDateAdapter<Date> = {
  addDays,
  addMonths,
  addYears,
  compareDates: (date1, date2) =>
    date1.getFullYear() - date2.getFullYear() ||
    date1.getMonth() - date2.getMonth() ||
    date1.getDate() - date2.getDate(),
  createDate,
  getDate: date => date.getDate(),
  getDay: date => date.getDay(),
  getMonth: date => date.getMonth(),
  getYear: date => date.getFullYear(),
  now: () => new Date(),
};

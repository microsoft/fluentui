/**
 * The days of the week
 */
export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

/**
 * The months
 */
export enum MonthOfYear {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  December = 11,
}

/**
 * First week of the year settings types
 */
export enum FirstWeekOfYear {
  FirstDay = 0,
  FirstFullWeek = 1,
  FirstFourDayWeek = 2,
}

/**
 * The supported date range types
 */
export enum DateRangeType {
  Day = 0,
  Week = 1,
  Month = 2,
  WorkWeek = 3,
}

export const DAYS_IN_WEEK = 7;

export const TimeConstants = {
  MillisecondsInOneDay: 86400000,
  MillisecondsIn1Sec: 1000,
  MillisecondsIn1Min: 60000,
  MillisecondsIn30Mins: 1800000,
  MillisecondsIn1Hour: 3600000,
  MinutesInOneDay: 1440,
  MinutesInOneHour: 60,
  DaysInOneWeek: 7,
  MonthInOneYear: 12,
  HoursInOneDay: 24,
  SecondsInOneMinute: 60,
  OffsetTo24HourFormat: 12,
  /**
   * Matches a time string. Groups:
   * 1. hours (with or without leading 0)
   * 2. minutes
   * 3. seconds (optional)
   * 4. meridiem (am/pm, case-insensitive, optional)
   */
  TimeFormatRegex: /^(\d\d?):(\d\d):?(\d\d)? ?([ap]m)?/i,
};

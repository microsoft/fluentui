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

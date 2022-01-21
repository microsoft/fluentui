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
   * TimeFormatRegex groups
   * Group 1: hours
   * Group 2: minutes
   * Group 3: seconds
   * Group 4: meridiem (am/pm)
   */
  TimeFormatRegex: /^(\d\d?):(\d\d):?(\d\d)? ?([ap]m)?/i,
};

import { isRestrictedDate, IRestrictedDatesOptions, INorthstarCalendarStrings } from '@fluentui/date-time-utilities';

export const validateDate = (
  futureSelectedDate: Date,
  futureFormattedDate: string,
  calendarOptions: IRestrictedDatesOptions,
  dateFormatting: INorthstarCalendarStrings,
  required: boolean,
): string => {
  if (futureSelectedDate && !isNaN(futureSelectedDate.getTime())) {
    if (isRestrictedDate(futureSelectedDate, calendarOptions)) {
      return dateFormatting.isOutOfBoundsErrorMessage;
    }
  } else if (futureFormattedDate) {
    return dateFormatting.invalidInputErrorMessage;
  } else if (required && !futureSelectedDate) {
    return dateFormatting.isRequiredErrorMessage;
  }
  return '';
};

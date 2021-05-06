import { isRestrictedDate, IRestrictedDatesOptions, ICalendarStrings } from '../../utils/date-time-utilities';

export const validateDate = (
  futureSelectedDate: Date,
  futureFormattedDate: string,
  calendarOptions: IRestrictedDatesOptions,
  dateFormatting: ICalendarStrings,
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

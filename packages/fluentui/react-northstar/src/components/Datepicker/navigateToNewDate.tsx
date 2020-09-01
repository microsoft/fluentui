import {
  addMonths,
  IAvailableDateOptions,
  IRestrictedDatesOptions,
  findAvailableDate,
  addDays,
  addWeeks,
  isAfterMaxDate,
  isBeforeMinDate,
} from '@fluentui/date-time-utilities';

export type NavigationKind = 'Month' | 'Week' | 'Day';

const contstraintNavigatedDate = (
  initialDate: Date,
  targetDate: Date,
  direction: number,
  restrictedDatesOptions: IRestrictedDatesOptions,
) => {
  if (!targetDate) {
    // if we couldn't find a target date at all, do nothing
    return undefined;
  }

  const findAvailableDateOptions: IAvailableDateOptions = {
    initialDate,
    targetDate,
    direction,
    ...restrictedDatesOptions,
  };

  let newNavigatedDate = findAvailableDate(findAvailableDateOptions);

  if (!newNavigatedDate) {
    // if no dates available in initial direction, try going backwards
    findAvailableDateOptions.direction = -direction;
    newNavigatedDate = findAvailableDate(findAvailableDateOptions);
  }

  if (isAfterMaxDate(targetDate, restrictedDatesOptions)) {
    newNavigatedDate = restrictedDatesOptions.maxDate;
  } else if (isBeforeMinDate(targetDate, restrictedDatesOptions)) {
    newNavigatedDate = restrictedDatesOptions.minDate;
  }

  return newNavigatedDate;
};

export const navigateToNewDate = (
  originalDate: Date,
  kind: NavigationKind,
  step: number,
  restrictedDatesOptions: IRestrictedDatesOptions,
): Date => {
  let targetDate: Date | null = null;
  const targetDayDirection = step > 0 ? 1 : -1;

  switch (kind) {
    case 'Month': {
      targetDate = addMonths(originalDate, targetDayDirection);
      break;
    }
    case 'Week': {
      targetDate = addWeeks(originalDate, targetDayDirection);
      break;
    }
    case 'Day': {
      targetDate = addDays(originalDate, targetDayDirection);
      break;
    }
    default:
      break;
  }

  return contstraintNavigatedDate(originalDate, targetDate, step, restrictedDatesOptions);
};

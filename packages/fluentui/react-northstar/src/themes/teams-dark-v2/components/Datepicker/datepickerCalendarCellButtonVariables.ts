import { DatepickerVariables } from '../../../teams/components/Datepicker/datepickerVariables';

export const datepickerCalendarCellButtonVariables = (siteVars): Partial<DatepickerVariables> => {
  return {
    calendarCellTodayBackgroundColor: siteVars.colorScheme.brand.background,
  };
};

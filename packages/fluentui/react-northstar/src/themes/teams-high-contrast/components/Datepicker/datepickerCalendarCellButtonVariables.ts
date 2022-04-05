import { DatepickerVariables } from '../../../teams/components/Datepicker/datepickerVariables';

export const datepickerCalendarCellButtonVariables = (siteVars: any): Partial<DatepickerVariables> => {
  return {
    calendarCellSelectedColor: siteVars.colors.black,
    calendarCellHoverColor: siteVars.colors.black,
    calendarCellTodayColor: siteVars.colors.black,
    calendarCellQuietColor: siteVars.colors.white,
    calendarCellDisabledColor: siteVars.colors.white,
  };
};

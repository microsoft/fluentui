import { DatepickerVariables } from '../../../teams/components/Datepicker/datepickerVariables';

export const datepickerCalendarGridRowVariables = (siteVars: any): Partial<DatepickerVariables> => {
  return {
    calendarCellHoverBackgroundColor: siteVars.accessibleCyan,
    calendarCellHoverColor: siteVars.colors.black,
  };
};

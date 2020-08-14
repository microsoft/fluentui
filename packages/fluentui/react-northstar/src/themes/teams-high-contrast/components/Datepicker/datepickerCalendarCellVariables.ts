import { DatepickerVariables } from '../../../teams/components/Datepicker/datepickerVariables';

export const datepickerCalendarCellVariables = (siteVars: any): Partial<DatepickerVariables> => {
  return {
    calendarCellSelectedColor: siteVars.colors.black,
    calendarCellHoverColor: siteVars.colors.black,
    calendarCellReferenceColor: siteVars.colors.black,
    calendarCellUnfocusedColor: siteVars.colors.white,
    calendarCellDisabledColor: siteVars.colors.white,
  };
};

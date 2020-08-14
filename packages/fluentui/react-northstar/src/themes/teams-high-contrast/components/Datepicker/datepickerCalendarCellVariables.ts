import { DatepickerVariables } from '../../../teams/components/Datepicker/datepickerVariables';

export const datepickerCalendarCellVariables = (siteVars: any): Partial<DatepickerVariables> => {
  return {
    datepickerCalendarCellSelectedColor: siteVars.colors.black,
    datepickerCalendarCellHoverColor: siteVars.colors.black,
    datepickerCalendarCellReferenceColor: siteVars.colors.black,
    datepickerCalendarCellUnfocusedColor: siteVars.colors.white,
    datepickerCalendarCellDisabledColor: siteVars.colors.white,
  };
};

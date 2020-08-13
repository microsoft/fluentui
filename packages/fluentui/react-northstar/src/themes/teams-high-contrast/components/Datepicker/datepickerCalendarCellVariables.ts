import { DatepickerCalendarCellVariables } from '../../../teams/components/Datepicker/datepickerCalendarCellVariables';

export const datepickerCalendarCellVariables = (siteVars: any): Partial<DatepickerCalendarCellVariables> => {
  return {
    selectedColor: siteVars.colors.black,
    hoverColor: siteVars.colors.black,
    referenceColor: siteVars.colors.black,
    unfocusedColor: siteVars.colors.white,
  };
};

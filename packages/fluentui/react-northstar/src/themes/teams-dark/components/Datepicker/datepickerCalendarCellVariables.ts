import { DatepickerCalendarCellVariables } from '../../../teams/components/Datepicker/datepickerCalendarCellVariables';

export const datepickerCalendarCellVariables = (siteVars: any): Partial<DatepickerCalendarCellVariables> => {
  return {
    selectedColor: siteVars.colors.white,
  };
};

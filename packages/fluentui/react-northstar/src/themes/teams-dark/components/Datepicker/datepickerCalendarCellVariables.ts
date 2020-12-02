import { DatepickerVariables } from '../../../teams/components/Datepicker/datepickerVariables';

export const datepickerCalendarCellVariables = (siteVars: any): Partial<DatepickerVariables> => {
  return {
    calendarCellSelectedColor: siteVars.colors.white,
  };
};

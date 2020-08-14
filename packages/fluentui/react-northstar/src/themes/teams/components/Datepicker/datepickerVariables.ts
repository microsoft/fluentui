import { pxToRem } from '../../../../utils';

export interface DatepickerVariables {
  datepickerCalendarCellBorder: string;
  datepickerCalendarCellHeight: string;
  datepickerCalendarCellWidth: string;
  datepickerCalendarCellBackgroundColor: string;
  datepickerCalendarCellColor: string;
  datepickerCalendarCellUnfocusedColor: string;
  datepickerCalendarCellSelectedColor: string;
  datepickerCalendarCellSelectedBackgroundColor: string;
  datepickerCalendarCellReferenceColor: string;
  datepickerCalendarCellReferenceBackgroundColor: string;
  datepickerCalendarCellHoverColor: string;
  datepickerCalendarCellHoverBackgroundColor: string;
  datepickerCalendarCellDisabledColor: string;
  datepickerCalendarCellDisabledBackgroundColor: string;

  datepickerCalendarHeaderCellFontWeight: number;

  datepickerCalendarHeaderMonthFontWeight;
}

export const datepickerVariables = (siteVars): DatepickerVariables => ({
  datepickerCalendarCellBorder: 'none',
  datepickerCalendarCellHeight: pxToRem(32),
  datepickerCalendarCellWidth: pxToRem(32),
  datepickerCalendarCellBackgroundColor: siteVars.colorScheme.default.background,
  datepickerCalendarCellColor: 'inherit',
  datepickerCalendarCellUnfocusedColor: siteVars.colorScheme.brand.foregroundDisabled,
  datepickerCalendarCellSelectedColor: siteVars.colorScheme.brand.background4,
  datepickerCalendarCellSelectedBackgroundColor: siteVars.colorScheme.brand.borderActive1,
  datepickerCalendarCellReferenceBackgroundColor: siteVars.colorScheme.brand.backgroundFocus,
  datepickerCalendarCellReferenceColor: siteVars.colorScheme.white.foreground,
  datepickerCalendarCellHoverBackgroundColor: siteVars.colorScheme.brand.backgroundHover2,
  datepickerCalendarCellHoverColor: 'inherit',
  datepickerCalendarCellDisabledColor: siteVars.colorScheme.brand.foregroundDisabled,
  datepickerCalendarCellDisabledBackgroundColor: siteVars.colorScheme.default.background,

  datepickerCalendarHeaderCellFontWeight: siteVars.fontWeightRegular,

  datepickerCalendarHeaderMonthFontWeight: siteVars.fontWeightBold,
});

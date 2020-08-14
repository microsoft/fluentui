import { pxToRem } from '../../../../utils';

export interface DatepickerVariables {
  calendarCellBorder: string;
  calendarCellHeight: string;
  calendarCellWidth: string;
  calendarCellBorderRadius: string;
  calendarCellBackgroundColor: string;
  calendarCellColor: string;
  calendarCellUnfocusedColor: string;
  calendarCellSelectedColor: string;
  calendarCellSelectedBackgroundColor: string;
  calendarCellReferenceColor: string;
  calendarCellReferenceBackgroundColor: string;
  calendarCellReferenceBorderRadius: string;
  calendarCellHoverColor: string;
  calendarCellHoverBackgroundColor: string;
  calendarCellDisabledColor: string;
  calendarCellDisabledBackgroundColor: string;

  calendarHeaderCellFontWeight: number;

  calendarHeaderPaddingTop: string;
  calendarHeaderPaddingBottom: string;
  calendarHeaderLabelPaddingLeft: string;
  calendarHeaderLabelFontWeight;
}

export const datepickerVariables = (siteVars): DatepickerVariables => ({
  calendarCellBorder: 'none',
  calendarCellHeight: pxToRem(32),
  calendarCellWidth: pxToRem(32),
  calendarCellBorderRadius: pxToRem(2),
  calendarCellBackgroundColor: siteVars.colorScheme.default.background,
  calendarCellColor: 'inherit',
  calendarCellUnfocusedColor: siteVars.colorScheme.brand.foregroundDisabled,
  calendarCellSelectedColor: siteVars.colorScheme.brand.background4,
  calendarCellSelectedBackgroundColor: siteVars.colorScheme.brand.borderActive1,
  calendarCellReferenceBackgroundColor: siteVars.colorScheme.brand.backgroundFocus,
  calendarCellReferenceColor: siteVars.colorScheme.white.foreground,
  calendarCellReferenceBorderRadius: '50%',
  calendarCellHoverBackgroundColor: siteVars.colorScheme.brand.backgroundHover2,
  calendarCellHoverColor: 'inherit',
  calendarCellDisabledColor: siteVars.colorScheme.brand.foregroundDisabled,
  calendarCellDisabledBackgroundColor: siteVars.colorScheme.default.background,

  calendarHeaderCellFontWeight: siteVars.fontWeightRegular,

  calendarHeaderPaddingTop: pxToRem(5),
  calendarHeaderPaddingBottom: pxToRem(5),
  calendarHeaderLabelPaddingLeft: pxToRem(10),
  calendarHeaderLabelFontWeight: siteVars.fontWeightBold,
});

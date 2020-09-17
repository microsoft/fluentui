import { pxToRem } from '../../../../utils';
import { DAYS_IN_WEEK } from '@fluentui/date-time-utilities';

export interface DatepickerVariables {
  calendarGridWidth: string;

  calendarCellBorder: string;
  calendarCellHeight: string;
  calendarCellWidth: string;
  calendarCellBorderRadius: string;
  calendarCellBackgroundColor: string;
  calendarCellColor: string;
  calendarCellQuietColor: string;
  calendarCellSelectedColor: string;
  calendarCellSelectedBackgroundColor: string;
  calendarCellTodayColor: string;
  calendarCellTodayBackgroundColor: string;
  calendarCellTodayBorderRadius: string;
  calendarCellHoverColor: string;
  calendarCellHoverBackgroundColor: string;
  calendarCellDisabledColor: string;
  calendarCellDisabledBackgroundColor: string;

  calendarHeaderCellFontWeight: number;
  calendarHeaderCellHeight: string;
  calendarHeaderCellWidth: string;

  calendarHeaderPaddingTop: string;
  calendarHeaderPaddingBottom: string;
  calendarHeaderLabelPaddingLeft: string;
  calendarHeaderLabelFontWeight;

  calendarMinHeight: string;
}

export const datepickerVariables = (siteVars): DatepickerVariables => ({
  calendarGridWidth: pxToRem(DAYS_IN_WEEK * 30),

  calendarCellBorder: 'none',
  calendarCellHeight: pxToRem(30),
  calendarCellWidth: '100%',
  calendarCellBorderRadius: pxToRem(2),
  calendarCellBackgroundColor: siteVars.colorScheme.default.background,
  calendarCellColor: 'inherit',
  calendarCellQuietColor: siteVars.colorScheme.brand.foregroundDisabled,
  calendarCellSelectedColor: siteVars.colorScheme.brand.background4,
  calendarCellSelectedBackgroundColor: siteVars.colorScheme.brand.borderActive1,
  calendarCellTodayBackgroundColor: siteVars.colorScheme.brand.backgroundFocus,
  calendarCellTodayColor: siteVars.colorScheme.white.foreground,
  calendarCellTodayBorderRadius: '50%',
  calendarCellHoverBackgroundColor: siteVars.colorScheme.brand.backgroundHover2,
  calendarCellHoverColor: 'inherit',
  calendarCellDisabledColor: siteVars.colorScheme.brand.foregroundDisabled,
  calendarCellDisabledBackgroundColor: siteVars.colorScheme.default.background,

  calendarHeaderCellFontWeight: siteVars.fontWeightRegular,
  calendarHeaderCellHeight: pxToRem(30),
  calendarHeaderCellWidth: `calc(100%/${DAYS_IN_WEEK})`,

  calendarHeaderPaddingTop: pxToRem(5),
  calendarHeaderPaddingBottom: pxToRem(5),
  calendarHeaderLabelPaddingLeft: pxToRem(10),
  calendarHeaderLabelFontWeight: siteVars.fontWeightBold,

  calendarMinHeight: pxToRem(266),
});

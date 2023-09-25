import { DarkTheme } from '../DarkCustomizations';
import type { IDatePickerStyleProps, IDatePickerStyles } from '@fluentui/react';

export const DatePickerStyles = (props: IDatePickerStyleProps): Partial<IDatePickerStyles> => {
  const { disabled } = props;

  const TextHoverStyle = () => {
    return {
      color: DarkTheme.palette.neutralPrimary,
      backgroundColor: DarkTheme.palette.neutralQuaternary,
    };
  };
  const TodayAndSelectedDayStyle = () => {
    return {
      '.ms-DatePicker-day-button.ms-DatePicker-day--today': {
        backgroundColor: DarkTheme.palette.themePrimary,
        color: DarkTheme.palette.neutralPrimary,
      },
      '.ms-DatePicker-day-button.ms-DatePicker-day--today:active': {
        backgroundColor: DarkTheme.palette.themePrimary,
      },
      '.ms-DatePicker-day-button.ms-DatePicker-day--today:hover': {
        color: DarkTheme.palette.neutralPrimary,
      },
      '.ms-DatePicker-day--highlighted': {
        backgroundColor: DarkTheme.palette.themeSecondary,
        color: DarkTheme.palette.neutralPrimary,
      },
      '.ms-DatePicker-day--highlighted > .ms-DatePicker-day-button': {
        backgroundColor: DarkTheme.palette.themePrimary,
      },
      '.ms-DatePicker-day--highlighted > .ms-DatePicker-day--today': {
        color: DarkTheme.palette.neutralPrimary,
      },
    };
  };
  const HoverStyles = () => {
    return {
      '.ms-DatePicker-day--highlighted:hover': {
        backgroundColor: DarkTheme.semanticColors.listItemBackgroundChecked,
        color: DarkTheme.palette.neutralPrimary,
      },
      '.ms-DatePicker-day--highlighted > .ms-DatePicker-day-button:hover': {
        color: DarkTheme.palette.neutralPrimary,
      },
      '.ms-DatePicker-day--infocus:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-currentDecade:hover': { color: DarkTheme.palette.neutralPrimary },
      '.ms-DatePicker-day--outfocus:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-monthAndYear:hover': { color: DarkTheme.palette.neutralPrimary },
      '.ms-DatePicker-weekday:hover': { color: DarkTheme.palette.neutralPrimary },
      '.ms-DatePicker-monthOption:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-header > .ms-DatePicker-currentYear:hover': { color: DarkTheme.palette.neutralPrimary },
      '.ms-DatePicker-prevMonth:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-nextMonth:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-prevYear:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-nextYear:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-goToday:hover': {
        color: DarkTheme.palette.neutralPrimary,
        backgroundColor: DarkTheme.palette.themeSecondary,
      },
      '.ms-DatePicker-yearOption:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-prevDecade:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-nextDecade:hover': {
        ...TextHoverStyle(),
      },
    };
  };
  return {
    callout: {
      backgroundColor: DarkTheme.semanticColors.bodyBackground,
      color: DarkTheme.palette.neutralPrimary,
      selectors: {
        '.ms-DatePicker-day--infocus': { color: DarkTheme.palette.neutralPrimary },
        '.ms-DatePicker-currentDecade': { color: DarkTheme.palette.neutralPrimary },
        '.ms-DatePicker-day--outfocus': { color: DarkTheme.palette.neutralSecondary },
        '.ms-DatePicker-monthAndYear': { color: DarkTheme.palette.neutralPrimary },
        '.ms-DatePicker-weekday': { color: DarkTheme.palette.neutralSecondary },
        '.ms-DatePicker-monthOption': { color: DarkTheme.palette.neutralPrimary },
        '.ms-DatePicker-currentYear': { color: DarkTheme.palette.neutralPrimary },
        '.ms-DatePicker-prevMonth': { color: DarkTheme.palette.neutralPrimary },
        '.ms-DatePicker-nextMonth': { color: DarkTheme.palette.neutralPrimary },
        '.ms-DatePicker-prevYear': { color: DarkTheme.palette.neutralPrimary },
        '.ms-DatePicker-nextYear': { color: DarkTheme.palette.neutralPrimary },
        '.ms-DatePicker-prevDecade': { color: DarkTheme.palette.neutralPrimary },
        '.ms-DatePicker-nextDecade': { color: DarkTheme.palette.neutralPrimary },
        '.ms-DatePicker-goToday': { color: DarkTheme.palette.neutralPrimary },
        '.ms-DatePicker-goToday[disabled]': { display: 'none' },
        '.ms-DatePicker-yearOption': { color: DarkTheme.palette.neutralPrimary },
        '.ms-DatePicker-yearOption--disabled': { color: DarkTheme.palette.neutralSecondary },
        '.ms-DatePicker-monthOption--disabled': { color: DarkTheme.palette.neutralSecondary },
        '.ms-DatePicker-day--disabled': { color: DarkTheme.palette.neutralSecondary },
        '.ms-DatePicker-nextDecade--disabled': { color: DarkTheme.palette.neutralSecondary },
        '.ms-DatePicker-prevDecade--disabled': { color: DarkTheme.palette.neutralSecondary },
        '.ms-DatePicker-prevYear--disabled': { color: DarkTheme.palette.neutralSecondary },
        '.ms-DatePicker-nextYear--disabled': { color: DarkTheme.palette.neutralSecondary },
        '.ms-DatePicker-prevMonth--disabled': { color: DarkTheme.palette.neutralSecondary },
        '.ms-DatePicker-nextMonth--disabled': { color: DarkTheme.palette.neutralSecondary },
        ...TodayAndSelectedDayStyle(),
        ...HoverStyles(),
      },
    },
    icon: [
      {
        color: DarkTheme.palette.neutralPrimary,
      },
      disabled && {
        color: DarkTheme.semanticColors.disabledBodyText,
      },
    ],
    root: [
      disabled && {
        color: DarkTheme.semanticColors.disabledBodyText,
      },
    ],
  };
};

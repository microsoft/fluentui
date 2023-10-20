import {
  ICalendarStyleProps,
  ICalendarStyles,
  ICalendarDayStyleProps,
  ICalendarDayStyles,
  ICalendarMonthStyles,
  ICalendarYearStyles,
  ICalendarDayGridStyleProps,
  ICalendarDayGridStyles,
  ICalendarPickerStyleProps,
} from '@fluentui/react';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import * as StyleConstants from '../Constants';

// Effects general area of callout.
export const CalendarStyles = (props: ICalendarStyleProps): Partial<ICalendarStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: [
      {
        backgroundColor: extendedSemanticColors.calendarBackground,
        'box-shadow': '1px 0px 8px rgba(0, 0, 0, 0.3), 0px 6px 15px rgba(0, 0, 0, 0.3)',
      },
    ],
    divider: {
      borderColor: extendedSemanticColors.calendarTextDisabled,
    },
    goTodayButton: [
      {
        color: extendedSemanticColors.calendarTextRest,
        selectors: {
          '&:hover': {
            color: extendedSemanticColors.calendarTextHover,
          },
          '&:active': {
            color: extendedSemanticColors.calendarTextRest,
          },
          '&:disabled': {
            color: extendedSemanticColors.calendarTextDisabled,
          },
        },
      },
    ],
  };
};

// Effects Calendar Grid area for days of the month
export const CalendarDayGridStyles = (props: ICalendarDayGridStyleProps): Partial<ICalendarDayGridStyles> => {
  const { lightenDaysOutsideNavigatedMonth, theme } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    wrapper: {
      background: extendedSemanticColors.calendarBackground,
    },
    dayCell: {
      selectors: {
        '&.ms-CalendarDay-hoverStyle': {
          background: extendedSemanticColors.calendarBackgroundHover,
          color: extendedSemanticColors.calendarTextHover,
        },
        '&.ms-CalendarDay-pressedStyle': {
          background: extendedSemanticColors.calendarBackgroundSelected,
          color: extendedSemanticColors.calendarTextRest,
        },
      },
    },
    daySelected: [
      {
        background: extendedSemanticColors.calendarBackgroundSelected + ' !important',
        color: extendedSemanticColors.calendarTextRest,
      },
    ],
    weekDayLabelCell: {
      color: extendedSemanticColors.calendarTextOutside,
      pointerEvents: 'none',
    },
    dayOutsideBounds: {
      selectors: {
        '&, &:disabled, & button': {
          color: extendedSemanticColors.calendarTextDisabled,
        },
      },
    },
    dayOutsideNavigatedMonth: lightenDaysOutsideNavigatedMonth && {
      color: extendedSemanticColors.calendarTextOutside,
    },
    dayButton: [
      {
        borderRadius: StyleConstants.borderRadius,
        color: 'inherit !important',
        selectors: {
          '&:after': {
            outlineColor: `${extendedSemanticColors.calendarBackgroundBorder} !important`,
          },
        },
      },
    ],
    datesAbove: {
      '&:after': {
        borderTop: `none`,
      },
      '&:focus': {
        borderColor: 'red',
      },
    },
    datesBelow: {
      '&:after': {
        borderBottom: `none`,
      },
    },
    datesLeft: {
      '&:after': {
        borderLeft: `none`,
      },
    },
    datesRight: {
      '&:after': {
        borderRight: `none`,
      },
    },
  };
};

// Effects Calendar Day header and nav buttons
export const CalendarDayStyles = (props: ICalendarDayStyleProps): Partial<ICalendarDayStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: [
      {
        background: extendedSemanticColors.calendarBackground,
      },
    ],
    monthAndYear: [
      {
        color: extendedSemanticColors.inputText,
      },
    ],
    headerIconButton: [
      {
        color: extendedSemanticColors.calendarTextOutside,
        selectors: {
          '&:hover': {
            background: extendedSemanticColors.calendarBackgroundHover,
            color: extendedSemanticColors.calendarTextHover,
          },
        },
      },
    ],
    disabledStyle: {
      selectors: {
        '&, &:disabled, & button': {
          color: extendedSemanticColors.calendarTextDisabled,
        },
      },
    },
  };
};

// Effects calendar Month header and nav buttons. Also effects Month selection buttons
export const CalendarMonthStyles = (props: ICalendarPickerStyleProps): Partial<ICalendarMonthStyles> => {
  const { hasHeaderClickCallback, theme } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: [
      {
        backgroundColor: extendedSemanticColors.calendarBackground,
      },
    ],
    currentItemButton: [
      {
        color: extendedSemanticColors.inputText,
      },
      hasHeaderClickCallback && {
        selectors: {
          '&:hover, &:active': {
            color: extendedSemanticColors.calendarTextHover,
            backgroundColor: extendedSemanticColors.calendarBackgroundHover,
          },
        },
      },
    ],
    navigationButton: [
      {
        color: extendedSemanticColors.calendarTextOutside,
        selectors: {
          '&:hover': {
            background: extendedSemanticColors.calendarBackgroundHover,
            color: extendedSemanticColors.calendarTextHover,
          },
        },
      },
    ],
    itemButton: [
      {
        color: extendedSemanticColors.calendarTextRest,
        selectors: {
          '&:hover': {
            color: extendedSemanticColors.calendarTextHover,
            backgroundColor: extendedSemanticColors.calendarBackgroundHover,
          },
          '&:active': {
            color: extendedSemanticColors.calendarTextRest,
            backgroundColor: extendedSemanticColors.calendarBackgroundSelected,
          },
        },
      },
    ],
    disabled: {
      selectors: {
        '&, &:disabled, & button': {
          color: extendedSemanticColors.calendarTextDisabled,
        },
      },
    },
  };
};

// Effects calendar Year header and nav buttons. Also effects Year selection buttons
export const CalendarYearStyles = (props: ICalendarPickerStyleProps): Partial<ICalendarYearStyles> => {
  const { hasHeaderClickCallback, theme } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: [
      {
        backgroundColor: extendedSemanticColors.calendarBackground,
      },
    ],
    currentItemButton: [
      {
        color: extendedSemanticColors.inputText,
      },
      hasHeaderClickCallback && {
        selectors: {
          '&:hover, &:active': {
            color: extendedSemanticColors.calendarTextHover,
            backgroundColor: extendedSemanticColors.calendarBackgroundHover,
          },
        },
      },
    ],
    navigationButton: [
      {
        color: extendedSemanticColors.calendarTextOutside,
        selectors: {
          '&:hover': {
            background: extendedSemanticColors.calendarBackgroundHover,
            color: extendedSemanticColors.calendarTextHover,
          },
        },
      },
    ],
    itemButton: [
      {
        color: extendedSemanticColors.calendarTextRest,
        selectors: {
          '&:hover': {
            color: extendedSemanticColors.calendarTextHover,
            backgroundColor: extendedSemanticColors.calendarBackgroundHover,
          },
          '&:active': {
            color: extendedSemanticColors.calendarTextRest,
            backgroundColor: extendedSemanticColors.calendarBackgroundSelected,
          },
        },
      },
    ],
    disabled: {
      selectors: {
        '&, &:disabled, & button': {
          color: extendedSemanticColors.calendarTextDisabled,
        },
      },
    },
  };
};

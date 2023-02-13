import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import {
  DateRangeType,
  DURATION_2,
  DURATION_3,
  EASING_FUNCTION_1,
  EASING_FUNCTION_2,
  FADE_IN,
  FADE_OUT,
  SLIDE_DOWN_IN20,
  SLIDE_DOWN_OUT20,
  SLIDE_LEFT_IN20,
  SLIDE_RIGHT_IN20,
  SLIDE_UP_IN20,
  SLIDE_UP_OUT20,
  TRANSITION_ROW_DISAPPEARANCE,
} from '../../utils';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarDayGridSlots, CalendarDayGridStyles, CalendarDayGridStyleProps } from './CalendarDayGrid.types';
import { AnimationDirection } from '../Calendar/Calendar.types';

export const calendarDayGridClassNames: SlotClassNames<CalendarDayGridSlots> & Record<string, string> = {
  root: 'fui-CalendarDayGrid',
  hover: 'fui-CalendarDayGrid-hover',
  pressed: 'fui-CalendarDayGrid-pressed',
  dayIsToday: 'fui-CalendarDayGrid-dayIsToday',
  daySelected: 'fui-CalendarDayGrid-daySelected',
};

const useWrapperStyles = makeStyles({
  base: {
    paddingBottom: '10px',
  },
});

const useTableStyles = makeStyles({
  base: {
    borderCollapse: 'collapse',
    borderSpacing: 0,
    fontSize: 'inherit',
    marginTop: '4px',
    paddingBottom: '10px',
    position: 'relative',
    tableLayout: 'fixed',
    textAlign: 'center',
    width: '196px',
  },
  showWeekNumbers: {
    width: '226px',
  },
});

const useDayCellStyles = makeStyles({
  base: {
    color: tokens.colorNeutralForeground1,
    cursor: 'pointer',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    height: '28px',
    lineHeight: '28px',
    ...shorthands.margin(0),
    ...shorthands.padding(0),
    position: 'relative',
    width: '28px',

    '@media (forced-colors: active)': {
      backgroundColor: 'Window',
      color: 'WindowText',
      forcedColorAdjust: 'none',
      zIndex: 0,
    },

    [`&.${calendarDayGridClassNames.hover}`]: {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
        ...shorthands.outline('1px', 'solid', 'Highlight'),
        zIndex: 3,
      },
    },

    [`&.${calendarDayGridClassNames.pressed}`]: {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
      },
    },

    [`&.${calendarDayGridClassNames.pressed}.${calendarDayGridClassNames.hover}`]: {
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
        ...shorthands.outline('1px', 'solid', 'Highlight'),
      },
    },
  },
  // getFocusStyle(theme, { inset: -3 }),
});

const useDaySelectedStyles = makeStyles({
  dateRangeTypeNotMonth: {
    backgroundColor: tokens.colorNeutralBackground1Selected,

    '&::before': {
      bottom: 0,
      content: '""',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },

    [`&:hover, &.${calendarDayGridClassNames.hover}, &.${calendarDayGridClassNames.pressed}`]: {
      backgroundColor: tokens.colorNeutralBackground1Selected + ' !important',
      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight!important',
        color: 'HighlightText!important',
      },
    },

    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight!important',
      ...shorthands.borderColor('Highlight!important'),
      color: 'HighlightText!important',
      forcedColorAdjust: 'none',
    },
  },
});

const useWeekRowStyles = makeStyles({
  base: {
    animationDuration: DURATION_3,
    animationFillMode: 'both',
    animationTimingFunction: EASING_FUNCTION_1,
  },
  horizontalBackward: {
    animationName: [FADE_IN, SLIDE_RIGHT_IN20],
  },
  horizontalForward: {
    animationName: [FADE_IN, SLIDE_LEFT_IN20],
  },
  verticalBackward: {
    animationName: [FADE_IN, SLIDE_DOWN_IN20],
  },
  verticalForward: {
    animationName: [FADE_IN, SLIDE_UP_IN20],
  },
});

const useWeekDayLabelCellStyles = makeStyles({
  base: {
    animationDuration: DURATION_2,
    animationFillMode: 'both',
    animationName: FADE_IN,
    animationTimingFunction: EASING_FUNCTION_2,
  },
});

const useWeekNumberCellStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
    ...shorthands.borderRight('1px', 'solid'),
    boxSizing: 'border-box',
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    height: '28px',
    ...shorthands.margin(0),
    ...shorthands.padding(0),
    width: '28px',
  },
});

const useDayOutsideBoundsStyles = makeStyles({
  base: {
    '&, &:disabled, & button': {
      color: tokens.colorNeutralForegroundDisabled,
      pointerEvents: 'none',
    },
  },
});

const useDayOutsideNavigatedMonthStyles = makeStyles({
  lightenDaysOutsideNavigatedMonth: {
    color: tokens.colorNeutralForeground4,
    fontWeight: tokens.fontWeightRegular,
  },
});

const useDayButtonStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderRadius('2px'),
    ...shorthands.borderStyle('none'),
    color: 'inherit',
    cursor: 'pointer',
    fontSize: tokens.fontSizeBase200,
    fontWeight: 'inherit',
    height: '24px',
    lineHeight: '24px',
    ...shorthands.overflow('visible'),
    ...shorthands.padding(0),
    width: '24px',

    '&span': {
      height: 'inherit',
      lineHeight: 'inherit',
    },
  },
});

const useDayIsTodayStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorBrandBackground + '!important',
    ...shorthands.borderRadius('100%'),
    color: tokens.colorNeutralForegroundOnBrand + '!important',
    fontWeight: tokens.fontWeightSemibold + '!important',

    '@media (forced-colors: active)': {
      backgroundColor: 'WindowText!important',
      ...shorthands.borderColor('WindowText!important'),
      color: 'WindowText!important',
      forcedColorAdjust: 'none',
    },
  },
});

const useFirstTransitionWeekStyles = makeStyles({
  base: {
    height: 0,
    opacity: 0,
    ...shorthands.overflow('hidden'),
    position: 'absolute',
    width: 0,
  },
  verticalForward: {
    animationDuration: DURATION_3,
    animationFillMode: 'both',
    animationName: [FADE_OUT, SLIDE_UP_OUT20, TRANSITION_ROW_DISAPPEARANCE],
    animationTimingFunction: EASING_FUNCTION_1,
  },
});

const useLastTransitionWeekStyles = makeStyles({
  base: {
    height: 0,
    marginTop: '-28px',
    opacity: 0,
    ...shorthands.overflow('hidden'),
    position: 'absolute',
    width: 0,
  },
  verticalBackward: {
    animationDuration: DURATION_3,
    animationFillMode: 'both',
    animationName: [FADE_OUT, SLIDE_DOWN_OUT20, TRANSITION_ROW_DISAPPEARANCE],
    animationTimingFunction: EASING_FUNCTION_1,
  },
});

const useDayMarkerStyles = makeStyles({
  base: {
    // TODO: Use background instead of foreground token
    backgroundColor: tokens.colorNeutralForeground2,
    ...shorthands.borderRadius('100%'),
    bottom: '1px',
    height: '4px',
    left: 0,
    ...shorthands.margin('auto'),
    position: 'absolute',
    right: 0,
    width: '4px',

    '@media (forced-colors: active)': {
      backgroundColor: 'WindowText',
      forcedColorAdjust: 'none',
    },

    [`&.${calendarDayGridClassNames.dayIsToday}`]: {
      backgroundColor: tokens.colorNeutralBackground1,
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
      },
    },

    [`&.${calendarDayGridClassNames.daySelected}`]: {
      '@media (forced-colors: active)': {
        backgroundColor: 'HighlightText',
      },
    },
  },
});

const useCornerDateStyles = makeStyles({
  topRight: {
    borderTopRightRadius: '2px',
  },
  topLeft: {
    borderTopLeftRadius: '2px',
  },
  bottomRight: {
    borderBottomRightRadius: '2px',
  },
  bottomLeft: {
    borderBottomLeftRadius: '2px',
  },
});

const useDatesPositionStyles = makeStyles({
  above: {
    '&::before': {
      ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStrokeAccessible),
    },
  },
  below: {
    '&::before': {
      ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStrokeAccessible),
    },
  },
  left: {
    '&::before': {
      ...shorthands.borderLeft('1px', 'solid', tokens.colorNeutralStrokeAccessible),
    },
  },
  right: {
    '&::before': {
      ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralStrokeAccessible),
    },
  },
});

/**
 * Apply styling to the CalendarDayGrid slots based on the state
 */
export const useCalendarDayGridStyles_unstable = (
  props: CalendarDayGridStyleProps,
): Record<keyof CalendarDayGridStyles, string> => {
  const wrapperStyles = useWrapperStyles();
  const tableStyles = useTableStyles();
  const dayCellStyles = useDayCellStyles();
  const daySelectedStyles = useDaySelectedStyles();
  const weekRowStyles = useWeekRowStyles();
  const weekDayLabelCellStyles = useWeekDayLabelCellStyles();
  const weekNumberCellStyles = useWeekNumberCellStyles();
  const dayOutsideBoundsStyles = useDayOutsideBoundsStyles();
  const dayOutsideNavigatedMonthStyles = useDayOutsideNavigatedMonthStyles();
  const dayButtonStyles = useDayButtonStyles();
  const dayIsTodayStyles = useDayIsTodayStyles();
  const firstTransitionWeekStyles = useFirstTransitionWeekStyles();
  const lastTransitionWeekStyles = useLastTransitionWeekStyles();
  const dayMarkerStyles = useDayMarkerStyles();
  const cornerDateStyles = useCornerDateStyles();
  const datesPositionStyles = useDatesPositionStyles();

  const {
    animateBackwards,
    animationDirection,
    dateRangeType,
    lightenDaysOutsideNavigatedMonth,
    showWeekNumbers,
  } = props;

  return {
    wrapper: wrapperStyles.base,
    table: mergeClasses(tableStyles.base, showWeekNumbers && tableStyles.showWeekNumbers),
    dayCell: dayCellStyles.base,
    daySelected: dateRangeType !== DateRangeType.Month ? daySelectedStyles.dateRangeTypeNotMonth : '',
    weekRow: mergeClasses(
      animateBackwards !== undefined && weekRowStyles.base,
      animateBackwards !== undefined &&
        (animationDirection === AnimationDirection.Horizontal
          ? animateBackwards
            ? weekRowStyles.horizontalBackward
            : weekRowStyles.horizontalForward
          : animateBackwards
          ? weekRowStyles.verticalBackward
          : weekRowStyles.verticalForward),
    ),
    weekDayLabelCell: weekDayLabelCellStyles.base,
    weekNumberCell: weekNumberCellStyles.base,
    dayOutsideBounds: dayOutsideBoundsStyles.base,
    dayOutsideNavigatedMonth: lightenDaysOutsideNavigatedMonth
      ? dayOutsideNavigatedMonthStyles.lightenDaysOutsideNavigatedMonth
      : '',
    dayButton: dayButtonStyles.base,
    dayIsToday: dayIsTodayStyles.base,
    firstTransitionWeek: mergeClasses(
      firstTransitionWeekStyles.base,
      animateBackwards !== undefined &&
        animationDirection !== AnimationDirection.Horizontal &&
        !animateBackwards &&
        firstTransitionWeekStyles.verticalForward,
    ),
    lastTransitionWeek: mergeClasses(
      lastTransitionWeekStyles.base,
      animateBackwards !== undefined &&
        animationDirection !== AnimationDirection.Horizontal &&
        animateBackwards &&
        lastTransitionWeekStyles.verticalBackward,
    ),
    dayMarker: dayMarkerStyles.base,
    topRightCornerDate: cornerDateStyles.topRight,
    topLeftCornerDate: cornerDateStyles.topLeft,
    bottomRightCornerDate: cornerDateStyles.bottomRight,
    bottomLeftCornerDate: cornerDateStyles.bottomLeft,
    datesAbove: datesPositionStyles.above,
    datesBelow: datesPositionStyles.below,
    datesLeft: datesPositionStyles.left,
    datesRight: datesPositionStyles.right,
  };
};

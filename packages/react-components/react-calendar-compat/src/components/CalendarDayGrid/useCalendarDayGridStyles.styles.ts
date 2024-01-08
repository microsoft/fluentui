import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import {
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
import { AnimationDirection } from '../Calendar/Calendar.types';
import { weekCornersClassNames } from './useWeekCornerStyles.styles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarDayGridStyles, CalendarDayGridStyleProps } from './CalendarDayGrid.types';

/**
 * @internal
 */
export const calendarDayGridClassNames: SlotClassNames<CalendarDayGridStyles> = {
  wrapper: 'fui-CalendarDayGrid__wrapper',
  table: 'fui-CalendarDayGrid__table',
  dayCell: 'fui-CalendarDayGrid__dayCell',
  daySelected: 'fui-CalendarDayGrid__daySelected',
  weekRow: 'fui-CalendarDayGrid__weekRow',
  weekDayLabelCell: 'fui-CalendarDayGrid__weekDayLabelCell',
  weekNumberCell: 'fui-CalendarDayGrid__weekNumberCell',
  dayOutsideBounds: 'fui-CalendarDayGrid__dayOutsideBounds',
  dayOutsideNavigatedMonth: 'fui-CalendarDayGrid__dayOutsideNavigatedMonth',
  dayButton: 'fui-CalendarDayGrid__dayButton',
  dayIsToday: 'fui-CalendarDayGrid__dayIsToday',
  firstTransitionWeek: 'fui-CalendarDayGrid__firstTransitionWeek',
  lastTransitionWeek: 'fui-CalendarDayGrid__lastTransitionWeek',
  dayMarker: 'fui-CalendarDayGrid__dayMarker',
};

/**
 * @internal
 */
export const extraCalendarDayGridClassNames = {
  hoverStyle: 'fui-CalendarDayGrid__hoverStyle',
  pressedStyle: 'fui-CalendarDayGrid__pressedStyle',
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
    },

    [`&.${extraCalendarDayGridClassNames.hoverStyle}`]: {
      color: tokens.colorNeutralForeground1Static,
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
        color: 'WindowText',
        ...shorthands.outline('1px', 'solid', 'Highlight'),
        zIndex: 3,
      },
    },

    [`&.${extraCalendarDayGridClassNames.pressedStyle}`]: {
      color: tokens.colorNeutralForeground1Static,
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
      },
    },
  },
});

const useDaySelectedStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
    color: tokens.colorNeutralForeground1Static,

    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      ...shorthands.borderColor('Highlight'),
      color: 'HighlightText',
      forcedColorAdjust: 'none',
    },

    [`&:hover, &.${extraCalendarDayGridClassNames.hoverStyle}, &.${extraCalendarDayGridClassNames.pressedStyle}`]: {
      color: tokens.colorNeutralForeground1Static,
      backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight',
        color: 'HighlightText',
      },
    },

    [`& > .${calendarDayGridClassNames.dayMarker}`]: {
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
      },
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
    userSelect: 'none',
    animationDuration: DURATION_2,
    animationFillMode: 'both',
    animationName: FADE_IN,
    animationTimingFunction: EASING_FUNCTION_2,
  },
});

const useWeekNumberCellStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
    ...shorthands.borderRight('1px', 'solid'),
    boxSizing: 'border-box',
    color: tokens.colorNeutralForeground4,
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
    [`&, &:disabled, & button, &.${extraCalendarDayGridClassNames.hoverStyle}` +
    `, &.${extraCalendarDayGridClassNames.pressedStyle}`]: {
      backgroundColor: tokens.colorTransparentBackground,
      color: tokens.colorNeutralForegroundDisabled,
      pointerEvents: 'none',
    },
    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },
});

const useDayOutsideNavigatedMonthStyles = makeStyles({
  lightenDaysOutsideNavigatedMonth: {
    color: tokens.colorNeutralForeground4,
    fontWeight: tokens.fontWeightRegular,

    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
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
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.borderRadius('100%'),
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightSemibold,

    '@media (forced-colors: active)': {
      backgroundColor: 'WindowText',
      ...shorthands.borderColor('WindowText'),
      color: 'Window',
      forcedColorAdjust: 'none',
    },

    [`& > .${calendarDayGridClassNames.dayMarker}`]: {
      backgroundColor: tokens.colorNeutralForegroundOnBrand,
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
      },
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
    backgroundColor: tokens.colorBrandForeground2,
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
  },
});

const useCornerBorderAndRadiusStyles = makeStyles({
  corners: {
    [`&.${weekCornersClassNames.topRightCornerDate}`]: {
      borderTopRightRadius: '2px',
    },
    [`&.${weekCornersClassNames.topLeftCornerDate}`]: {
      borderTopLeftRadius: '2px',
    },
    [`&.${weekCornersClassNames.bottomRightCornerDate}`]: {
      borderBottomRightRadius: '2px',
    },
    [`&.${weekCornersClassNames.bottomLeftCornerDate}`]: {
      borderBottomLeftRadius: '2px',
    },
  },
});

/**
 * @internal
 *
 * Apply styling to the CalendarDayGrid slots based on the state
 */
export const useCalendarDayGridStyles_unstable = (props: CalendarDayGridStyleProps): CalendarDayGridStyles => {
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
  const cornerBorderAndRadiusStyles = useCornerBorderAndRadiusStyles();

  const { animateBackwards, animationDirection, lightenDaysOutsideNavigatedMonth, showWeekNumbers } = props;

  return {
    wrapper: mergeClasses(calendarDayGridClassNames.wrapper, wrapperStyles.base),
    table: mergeClasses(
      calendarDayGridClassNames.table,
      tableStyles.base,
      showWeekNumbers && tableStyles.showWeekNumbers,
    ),
    dayCell: mergeClasses(calendarDayGridClassNames.dayCell, dayCellStyles.base, cornerBorderAndRadiusStyles.corners),
    daySelected: mergeClasses(calendarDayGridClassNames.daySelected, daySelectedStyles.base),
    weekRow: mergeClasses(
      calendarDayGridClassNames.weekRow,
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
    weekDayLabelCell: mergeClasses(calendarDayGridClassNames.weekDayLabelCell, weekDayLabelCellStyles.base),
    weekNumberCell: mergeClasses(calendarDayGridClassNames.weekNumberCell, weekNumberCellStyles.base),
    dayOutsideBounds: mergeClasses(calendarDayGridClassNames.dayOutsideBounds, dayOutsideBoundsStyles.base),
    dayOutsideNavigatedMonth: mergeClasses(
      calendarDayGridClassNames.dayOutsideNavigatedMonth,
      lightenDaysOutsideNavigatedMonth && dayOutsideNavigatedMonthStyles.lightenDaysOutsideNavigatedMonth,
    ),
    dayButton: mergeClasses(calendarDayGridClassNames.dayButton, dayButtonStyles.base),
    dayIsToday: mergeClasses(calendarDayGridClassNames.dayIsToday, dayIsTodayStyles.base),
    firstTransitionWeek: mergeClasses(
      calendarDayGridClassNames.firstTransitionWeek,
      firstTransitionWeekStyles.base,
      animateBackwards !== undefined &&
        animationDirection !== AnimationDirection.Horizontal &&
        !animateBackwards &&
        firstTransitionWeekStyles.verticalForward,
    ),
    lastTransitionWeek: mergeClasses(
      calendarDayGridClassNames.lastTransitionWeek,
      lastTransitionWeekStyles.base,
      animateBackwards !== undefined &&
        animationDirection !== AnimationDirection.Horizontal &&
        animateBackwards &&
        lastTransitionWeekStyles.verticalBackward,
    ),
    dayMarker: mergeClasses(calendarDayGridClassNames.dayMarker, dayMarkerStyles.base),
  };
};

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
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
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
  daySingleSelected: 'fui-CalendarDayGrid__daySingleSelected',
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
  dayTodayMarker: 'fui-CalendarDayGrid__dayTodayMarker',
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
    margin: '0',
    padding: '2px',
    position: 'relative',
    '@media (forced-colors: active)': {
      backgroundColor: 'Window',
      color: 'WindowText',
    },

    [`&.${extraCalendarDayGridClassNames.hoverStyle}`]: {
      color: tokens.colorNeutralForeground1Static,
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      '@media (forced-colors: active)': {
        outline: '1px solid Highlight',
        zIndex: 3,
        [`& .${calendarDayGridClassNames.dayTodayMarker}`]: {
          backgroundColor: 'Highlight',
        },
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
  focusIndicator: createFocusOutlineStyle({
    style: {
      outlineWidth: tokens.strokeWidthThick,
      ...shorthands.borderWidth(tokens.strokeWidthThick),
    },
  }),
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

const useDaySingleSelectedStyles = makeStyles({
  base: {
    color: tokens.colorNeutralForeground1Static,

    [`& > .${calendarDayGridClassNames.dayMarker}`]: {
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
      },
    },

    [`& > .${calendarDayGridClassNames.dayButton}`]: {
      backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
      borderRadius: tokens.borderRadiusMedium,
      ...shorthands.border('1px', 'solid', tokens.colorBrandStroke1),
      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight',
        ...shorthands.borderColor('Highlight'),
        color: 'HighlightText',
        forcedColorAdjust: 'none',
      },
    },
  },
});

const useWeekRowStyles = makeStyles({
  base: {
    position: 'relative',
    ':focus-within': {
      zIndex: 1,
    },
  },
  animation: {
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
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    boxSizing: 'border-box',
    color: tokens.colorNeutralForeground4,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    height: '28px',
    margin: '0',
    padding: '0',
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
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    fontSize: tokens.fontSizeBase200,
    fontWeight: 'inherit',
    height: '24px',
    lineHeight: '24px',
    overflow: 'visible',
    padding: '0',
    width: '24px',

    '&span': {
      height: 'inherit',
      lineHeight: 'inherit',
    },
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      borderRadius: tokens.borderRadiusMedium,
    },
    ':active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,
    },
  },
});

const useDayIsTodayStyles = makeStyles({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightSemibold,

    [`& > .${calendarDayGridClassNames.dayMarker}`]: {
      backgroundColor: tokens.colorNeutralForegroundOnBrand,
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
      },
    },
  },
});

const useDayTodayMarkerStyles = makeStyles({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: '100%',
    width: '20px',
    height: '20px',
    lineHeight: '20px',
    '@media (forced-colors: active)': {
      backgroundColor: 'WindowText',
      ...shorthands.borderColor('WindowText'),
      color: 'Window',
      forcedColorAdjust: 'none',
    },
  },
});

const useFirstTransitionWeekStyles = makeStyles({
  base: {
    height: 0,
    opacity: 0,
    overflow: 'hidden',

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
    overflow: 'hidden',
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
    borderRadius: '100%',
    bottom: '1px',
    height: '4px',
    left: 0,
    margin: 'auto',

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
      borderTopRightRadius: tokens.borderRadiusMedium,
    },
    [`&.${weekCornersClassNames.topLeftCornerDate}`]: {
      borderTopLeftRadius: tokens.borderRadiusMedium,
    },
    [`&.${weekCornersClassNames.bottomRightCornerDate}`]: {
      borderBottomRightRadius: tokens.borderRadiusMedium,
    },
    [`&.${weekCornersClassNames.bottomLeftCornerDate}`]: {
      borderBottomLeftRadius: tokens.borderRadiusMedium,
    },
  },
});

/**
 * @internal
 *
 * Apply styling to the CalendarDayGrid slots based on the state
 */
export const useCalendarDayGridStyles_unstable = (props: CalendarDayGridStyleProps): CalendarDayGridStyles => {
  'use no memo';

  const wrapperStyles = useWrapperStyles();
  const tableStyles = useTableStyles();
  const dayCellStyles = useDayCellStyles();
  const daySelectedStyles = useDaySelectedStyles();
  const daySingleSelectedStyles = useDaySingleSelectedStyles();
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
  const dayTodayMarkerStyles = useDayTodayMarkerStyles();

  const { animateBackwards, animationDirection, lightenDaysOutsideNavigatedMonth, showWeekNumbers } = props;

  return {
    wrapper: mergeClasses(calendarDayGridClassNames.wrapper, wrapperStyles.base),
    table: mergeClasses(
      calendarDayGridClassNames.table,
      tableStyles.base,
      showWeekNumbers && tableStyles.showWeekNumbers,
    ),
    dayCell: mergeClasses(
      calendarDayGridClassNames.dayCell,
      dayCellStyles.base,
      dayCellStyles.focusIndicator,
      cornerBorderAndRadiusStyles.corners,
    ),
    daySelected: mergeClasses(calendarDayGridClassNames.daySelected, daySelectedStyles.base),
    daySingleSelected: mergeClasses(calendarDayGridClassNames.daySingleSelected, daySingleSelectedStyles.base),
    weekRow: mergeClasses(
      calendarDayGridClassNames.weekRow,
      weekRowStyles.base,
      animateBackwards !== undefined && weekRowStyles.animation,
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
    dayTodayMarker: mergeClasses(calendarDayGridClassNames.dayTodayMarker, dayTodayMarkerStyles.base),
  };
};

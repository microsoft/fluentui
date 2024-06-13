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
    color: `var(--ctrl-token-CalendarDayGrid-549, var(--semantic-token-CalendarDayGrid-550, ${tokens.colorNeutralForeground1}))`,
    cursor: 'pointer',
    fontSize: `var(--ctrl-token-CalendarDayGrid-551, var(--semantic-token-CalendarDayGrid-552, ${tokens.fontSizeBase200}))`,
    fontWeight: `var(--ctrl-token-CalendarDayGrid-553, var(--semantic-token-CalendarDayGrid-554, ${tokens.fontWeightRegular}))`,
    margin: '0',
    padding: '2px',
    position: 'relative',
    '@media (forced-colors: active)': {
      backgroundColor: 'Window',
      color: 'WindowText',
    },

    [`&.${extraCalendarDayGridClassNames.hoverStyle}`]: {
      color: `var(--ctrl-token-CalendarDayGrid-555, var(--semantic-token-CalendarDayGrid-556, ${tokens.colorNeutralForeground1Static}))`,
      backgroundColor: `var(--ctrl-token-CalendarDayGrid-557, var(--semantic-token-CalendarDayGrid-558, ${tokens.colorBrandBackgroundInvertedHover}))`,
      '@media (forced-colors: active)': {
        outline: '1px solid Highlight',
        zIndex: 3,
        [`& .${calendarDayGridClassNames.dayTodayMarker}`]: {
          backgroundColor: 'Highlight',
        },
      },
    },

    [`&.${extraCalendarDayGridClassNames.pressedStyle}`]: {
      color: `var(--ctrl-token-CalendarDayGrid-559, var(--semantic-token-CalendarDayGrid-560, ${tokens.colorNeutralForeground1Static}))`,
      backgroundColor: `var(--ctrl-token-CalendarDayGrid-561, var(--semantic-token-CalendarDayGrid-562, ${tokens.colorBrandBackgroundInvertedPressed}))`,
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
      },
    },
  },
  focusIndicator: createFocusOutlineStyle({
    style: {
      outlineWidth: `var(--ctrl-token-CalendarDayGrid-563, var(--semantic-token-CalendarDayGrid-564, ${tokens.strokeWidthThick}))`,
      ...shorthands.borderWidth(tokens.strokeWidthThick),
    },
  }),
});

const useDaySelectedStyles = makeStyles({
  base: {
    backgroundColor: `var(--ctrl-token-CalendarDayGrid-565, var(--semantic-token-CalendarDayGrid-566, ${tokens.colorBrandBackgroundInvertedSelected}))`,
    color: `var(--ctrl-token-CalendarDayGrid-567, var(--semantic-token-CalendarDayGrid-568, ${tokens.colorNeutralForeground1Static}))`,

    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      ...shorthands.borderColor('Highlight'),
      color: 'HighlightText',
      forcedColorAdjust: 'none',
    },

    [`&:hover, &.${extraCalendarDayGridClassNames.hoverStyle}, &.${extraCalendarDayGridClassNames.pressedStyle}`]: {
      color: `var(--ctrl-token-CalendarDayGrid-569, var(--semantic-token-CalendarDayGrid-570, ${tokens.colorNeutralForeground1Static}))`,
      backgroundColor: `var(--ctrl-token-CalendarDayGrid-571, var(--semantic-token-CalendarDayGrid-572, ${tokens.colorBrandBackgroundInvertedSelected}))`,
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
    color: `var(--ctrl-token-CalendarDayGrid-573, var(--semantic-token-CalendarDayGrid-574, ${tokens.colorNeutralForeground1Static}))`,

    [`& > .${calendarDayGridClassNames.dayMarker}`]: {
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
      },
    },

    [`& > .${calendarDayGridClassNames.dayButton}`]: {
      backgroundColor: `var(--ctrl-token-CalendarDayGrid-575, var(--semantic-token-CalendarDayGrid-576, ${tokens.colorBrandBackgroundInvertedSelected}))`,
      borderRadius: `var(--ctrl-token-CalendarDayGrid-577, var(--semantic-token-CalendarDayGrid-578, ${tokens.borderRadiusMedium}))`,
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
    backgroundColor: `var(--ctrl-token-CalendarDayGrid-579, var(--semantic-token-CalendarDayGrid-580, ${tokens.colorTransparentBackground}))`,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    boxSizing: 'border-box',
    color: `var(--ctrl-token-CalendarDayGrid-581, var(--semantic-token-CalendarDayGrid-582, ${tokens.colorNeutralForeground4}))`,
    fontSize: `var(--ctrl-token-CalendarDayGrid-583, var(--semantic-token-CalendarDayGrid-584, ${tokens.fontSizeBase200}))`,
    fontWeight: `var(--ctrl-token-CalendarDayGrid-585, var(--semantic-token-CalendarDayGrid-586, ${tokens.fontWeightRegular}))`,
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
      backgroundColor: `var(--ctrl-token-CalendarDayGrid-587, var(--semantic-token-CalendarDayGrid-588, ${tokens.colorTransparentBackground}))`,
      color: `var(--ctrl-token-CalendarDayGrid-589, var(--semantic-token-CalendarDayGrid-590, ${tokens.colorNeutralForegroundDisabled}))`,
      pointerEvents: 'none',
    },
    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },
});

const useDayOutsideNavigatedMonthStyles = makeStyles({
  lightenDaysOutsideNavigatedMonth: {
    color: `var(--ctrl-token-CalendarDayGrid-591, var(--semantic-token-CalendarDayGrid-592, ${tokens.colorNeutralForeground4}))`,
    fontWeight: `var(--ctrl-token-CalendarDayGrid-593, var(--semantic-token-CalendarDayGrid-594, ${tokens.fontWeightRegular}))`,

    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },
});

const useDayButtonStyles = makeStyles({
  base: {
    backgroundColor: `var(--ctrl-token-CalendarDayGrid-595, var(--semantic-token-CalendarDayGrid-596, ${tokens.colorTransparentBackground}))`,
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    fontSize: `var(--ctrl-token-CalendarDayGrid-597, var(--semantic-token-CalendarDayGrid-598, ${tokens.fontSizeBase200}))`,
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
      backgroundColor: `var(--ctrl-token-CalendarDayGrid-599, var(--semantic-token-CalendarDayGrid-600, ${tokens.colorBrandBackgroundInvertedHover}))`,
      borderRadius: `var(--ctrl-token-CalendarDayGrid-601, var(--semantic-token-CalendarDayGrid-602, ${tokens.borderRadiusMedium}))`,
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-CalendarDayGrid-603, var(--semantic-token-CalendarDayGrid-604, ${tokens.colorBrandBackgroundInvertedPressed}))`,
    },
  },
});

const useDayIsTodayStyles = makeStyles({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: `var(--ctrl-token-CalendarDayGrid-605, var(--semantic-token-CalendarDayGrid-606, ${tokens.colorNeutralForegroundOnBrand}))`,
    fontWeight: `var(--ctrl-token-CalendarDayGrid-607, var(--semantic-token-CalendarDayGrid-608, ${tokens.fontWeightSemibold}))`,

    [`& > .${calendarDayGridClassNames.dayMarker}`]: {
      backgroundColor: `var(--ctrl-token-CalendarDayGrid-609, var(--semantic-token-CalendarDayGrid-610, ${tokens.colorNeutralForegroundOnBrand}))`,
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
    backgroundColor: `var(--ctrl-token-CalendarDayGrid-611, var(--semantic-token-CalendarDayGrid-612, ${tokens.colorBrandBackground}))`,
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
    backgroundColor: `var(--ctrl-token-CalendarDayGrid-613, var(--semantic-token-CalendarDayGrid-614, ${tokens.colorBrandForeground2}))`,
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
      borderTopRightRadius: `var(--ctrl-token-CalendarDayGrid-615, var(--semantic-token-CalendarDayGrid-616, ${tokens.borderRadiusMedium}))`,
    },
    [`&.${weekCornersClassNames.topLeftCornerDate}`]: {
      borderTopLeftRadius: `var(--ctrl-token-CalendarDayGrid-617, var(--semantic-token-CalendarDayGrid-618, ${tokens.borderRadiusMedium}))`,
    },
    [`&.${weekCornersClassNames.bottomRightCornerDate}`]: {
      borderBottomRightRadius: `var(--ctrl-token-CalendarDayGrid-619, var(--semantic-token-CalendarDayGrid-620, ${tokens.borderRadiusMedium}))`,
    },
    [`&.${weekCornersClassNames.bottomLeftCornerDate}`]: {
      borderBottomLeftRadius: `var(--ctrl-token-CalendarDayGrid-621, var(--semantic-token-CalendarDayGrid-622, ${tokens.borderRadiusMedium}))`,
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
    dayTodayMarker: mergeClasses(calendarDayGridClassNames.dayTodayMarker, dayTodayMarkerStyles.base),
  };
};

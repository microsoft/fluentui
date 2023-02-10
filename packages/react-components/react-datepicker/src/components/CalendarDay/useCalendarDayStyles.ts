import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { DURATION_2, EASING_FUNCTION_2, FADE_IN } from '../../utils/animations';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarDaySlots, CalendarDayStyles, CalendarDayStyleProps } from './CalendarDay.types';

export const calendarDayClassNames: SlotClassNames<CalendarDaySlots> & Record<string, string> = {
  root: 'fui-CalendarDay',
};

const useRootStyles = makeStyles({
  base: {
    boxSizing: 'content-box',
    ...shorthands.padding('12px'),
    width: '196px',
  },
  normalize: {
    boxShadow: 'none',
    boxSizing: 'border-box',
    ...shorthands.margin(0),
    ...shorthands.padding(0),
  },
  showWeekNumbers: {
    width: '226px',
  },
});

const useHeaderStyles = makeStyles({
  base: {
    display: 'inline-flex',
    height: '28px',
    lineHeight: '44px',
    position: 'relative',
    width: '100%',
  },
});

const useMonthAndYearStyles = makeStyles({
  base: {
    alignItems: 'center',
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.border('none'),
    ...shorthands.borderRadius('2px'),
    color: tokens.colorNeutralForeground1,
    display: 'inline-block',
    flexGrow: 1,
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: '28px',
    ...shorthands.overflow('hidden'),
    ...shorthands.padding(0, '4px', 0, '10px'),
    textAlign: 'left',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  animation: {
    animationDuration: DURATION_2,
    animationFillMode: 'both',
    animationName: FADE_IN,
    animationTimingFunction: EASING_FUNCTION_2,
  },
  headerIsClickable: {
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1Hover,
      cursor: 'pointer',
    },
  },
  // getFocusStyle(theme, { inset: 1 }),
});

const useMonthComponentsStyles = makeStyles({
  base: {
    alignSelf: 'flex-end',
    display: 'inline-flex',
  },
});

const useHeaderIconButtonStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.border('none'),
    ...shorthands.borderRadius('2px'),
    color: tokens.colorNeutralForeground1,
    display: 'block',
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase200,
    height: '28px',
    lineHeight: '28px',
    ...shorthands.overflow('visible'),
    ...shorthands.padding(0),
    position: 'relative',
    textAlign: 'center',
    width: '28px',

    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1Hover,
      cursor: 'pointer',
      ...shorthands.outline('1px', 'solid', tokens.colorTransparentStroke),
    },
  },
  // getFocusStyle(theme, { inset: -1 }),
});

const useDisabledStyleStyles = makeStyles({
  base: {
    '&, &:disabled, & button': {
      color: tokens.colorNeutralForegroundDisabled,
      pointerEvents: 'none',
    },
    '@media (forced-colors: active)': {
      color: 'GrayText',
      forcedColorAdjust: 'none',
    },
  },
});

/**
 * Apply styling to the CalendarDay slots based on the state
 */
// export const useCalendarDayStyles_unstable = (state: CalendarDayState): CalendarDayState => {
export const useCalendarDayStyles_unstable = (
  props: CalendarDayStyleProps,
): Record<keyof CalendarDayStyles, string> => {
  const rootStyles = useRootStyles();
  const headerStyles = useHeaderStyles();
  const monthAndYearStyles = useMonthAndYearStyles();
  const monthComponentsStyles = useMonthComponentsStyles();
  const headerIconButtonStyles = useHeaderIconButtonStyles();
  const disabledStyleStyles = useDisabledStyleStyles();

  const { className, headerIsClickable, showWeekNumbers } = props;

  return {
    root: mergeClasses(
      calendarDayClassNames.root,
      rootStyles.normalize,
      rootStyles.base,
      showWeekNumbers && rootStyles.showWeekNumbers,
      className,
    ),
    header: headerStyles.base,
    monthAndYear: mergeClasses(
      monthAndYearStyles.base,
      monthAndYearStyles.animation,
      headerIsClickable && monthAndYearStyles.headerIsClickable,
    ),
    monthComponents: monthComponentsStyles.base,
    headerIconButton: headerIconButtonStyles.base,
    disabledStyle: disabledStyleStyles.base,
    table: '',
    wrapper: '',
    dayCell: '',
    daySelected: '',
    weekRow: '',
    weekDayLabelCell: '',
    weekNumberCell: '',
    dayOutsideBounds: '',
    dayOutsideNavigatedMonth: '',
    dayButton: '',
    dayIsToday: '',
    firstTransitionWeek: '',
    lastTransitionWeek: '',
    dayMarker: '',
    topLeftCornerDate: '',
    topRightCornerDate: '',
    bottomLeftCornerDate: '',
    bottomRightCornerDate: '',
    datesAbove: '',
    datesBelow: '',
    datesLeft: '',
    datesRight: '',
  };
};

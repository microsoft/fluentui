import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { DURATION_2, EASING_FUNCTION_2, FADE_IN } from '../../utils/animations';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarDayStyles, CalendarDayStyleProps } from './CalendarDay.types';

/**
 * @internal
 */
export const calendarDayClassNames: SlotClassNames<CalendarDayStyles> = {
  root: 'fui-CalendarDay',
  header: 'fui-CalendarDay__header',
  monthAndYear: 'fui-CalendarDay__monthAndYear',
  monthComponents: 'fui-CalendarDay__monthComponents',
  headerIconButton: 'fui-CalendarDay__headerIconButton',
  disabledStyle: 'fui-CalendarDay__disabledStyle',
};

const useRootStyles = makeStyles({
  base: {
    boxSizing: 'content-box',
    padding: '12px',
    width: '196px',
  },
  normalize: {
    boxShadow: 'none',
    boxSizing: 'border-box',
    margin: '0',
    padding: '0',
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
    ...shorthands.borderStyle('none'),
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground1,
    display: 'inline-block',
    flexGrow: 1,
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: '28px',
    overflow: 'hidden',
    padding: '0 4px 0 10px',
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
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      color: tokens.colorBrandForegroundOnLightHover,
      cursor: 'pointer',
      outline: `1px solid ${tokens.colorTransparentStroke}`,
    },
    '&:hover:active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,
      color: tokens.colorBrandForegroundOnLightPressed,
      cursor: 'pointer',
      outline: `1px solid ${tokens.colorTransparentStroke}`,
    },
  },
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
    ...shorthands.borderStyle('none'),
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground3,
    display: 'block',
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase200,
    height: '28px',
    lineHeight: '28px',
    overflow: 'visible',
    padding: '0',
    position: 'relative',
    textAlign: 'center',
    width: '28px',

    '&:hover': {
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      color: tokens.colorBrandForegroundOnLightHover,
      cursor: 'pointer',
      outline: `1px solid ${tokens.colorTransparentStroke}`,
    },
    '&:hover:active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,
      color: tokens.colorBrandForegroundOnLightPressed,
    },
  },
});

const useDisabledStyleStyles = makeStyles({
  base: {
    '&, &:disabled, & button': {
      color: tokens.colorNeutralForegroundDisabled,
      pointerEvents: 'none',
    },
  },
});

/**
 * @internal
 *
 * Apply styling to the CalendarDay slots based on the state
 */
export const useCalendarDayStyles_unstable = (props: CalendarDayStyleProps): CalendarDayStyles => {
  'use no memo';

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
    header: mergeClasses(calendarDayClassNames.header, headerStyles.base),
    monthAndYear: mergeClasses(
      calendarDayClassNames.monthAndYear,
      monthAndYearStyles.base,
      monthAndYearStyles.animation,
      headerIsClickable && monthAndYearStyles.headerIsClickable,
    ),
    monthComponents: mergeClasses(calendarDayClassNames.monthComponents, monthComponentsStyles.base),
    headerIconButton: mergeClasses(calendarDayClassNames.headerIconButton, headerIconButtonStyles.base),
    disabledStyle: mergeClasses(calendarDayClassNames.disabledStyle, disabledStyleStyles.base),
  };
};

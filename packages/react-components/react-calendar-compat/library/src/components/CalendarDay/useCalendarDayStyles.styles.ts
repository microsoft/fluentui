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
    backgroundColor: `var(--513, var(--514, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderStyle('none'),
    borderRadius: `var(--515, var(--516, ${tokens.borderRadiusMedium}))`,
    color: `var(--517, var(--518, ${tokens.colorNeutralForeground1}))`,
    display: 'inline-block',
    flexGrow: 1,
    fontFamily: 'inherit',
    fontSize: `var(--519, var(--520, ${tokens.fontSizeBase300}))`,
    fontWeight: `var(--521, var(--522, ${tokens.fontWeightSemibold}))`,
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
      backgroundColor: `var(--523, var(--524, ${tokens.colorBrandBackgroundInvertedHover}))`,
      color: `var(--525, var(--526, ${tokens.colorBrandForegroundOnLightHover}))`,
      cursor: 'pointer',
      outline: `1px solid ${tokens.colorTransparentStroke}`,
    },
    '&:hover:active': {
      backgroundColor: `var(--527, var(--528, ${tokens.colorBrandBackgroundInvertedPressed}))`,
      color: `var(--529, var(--530, ${tokens.colorBrandForegroundOnLightPressed}))`,
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
    backgroundColor: `var(--531, var(--532, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderStyle('none'),
    borderRadius: `var(--533, var(--534, ${tokens.borderRadiusMedium}))`,
    color: `var(--535, var(--536, ${tokens.colorNeutralForeground3}))`,
    display: 'block',
    fontFamily: 'inherit',
    fontSize: `var(--537, var(--538, ${tokens.fontSizeBase200}))`,
    height: '28px',
    lineHeight: '28px',
    overflow: 'visible',
    padding: '0',
    position: 'relative',
    textAlign: 'center',
    width: '28px',

    '&:hover': {
      backgroundColor: `var(--539, var(--540, ${tokens.colorBrandBackgroundInvertedHover}))`,
      color: `var(--541, var(--542, ${tokens.colorBrandForegroundOnLightHover}))`,
      cursor: 'pointer',
      outline: `1px solid ${tokens.colorTransparentStroke}`,
    },
    '&:hover:active': {
      backgroundColor: `var(--543, var(--544, ${tokens.colorBrandBackgroundInvertedPressed}))`,
      color: `var(--545, var(--546, ${tokens.colorBrandForegroundOnLightPressed}))`,
    },
  },
});

const useDisabledStyleStyles = makeStyles({
  base: {
    '&, &:disabled, & button': {
      color: `var(--547, var(--548, ${tokens.colorNeutralForegroundDisabled}))`,
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

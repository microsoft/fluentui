import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarStyles, CalendarStyleProps } from './Calendar.types';

/**
 * @internal
 */
export const calendarClassNames: SlotClassNames<CalendarStyles> = {
  root: 'fui-Calendar',
  divider: 'fui-Calendar__divider',
  goTodayButton: 'fui-Calendar__goTodayButton',
  monthPickerWrapper: 'fui-Calendar__monthPickerWrapper',
  liveRegion: 'fui-Calendar__liveRegion',
};

const useRootStyles = makeStyles({
  base: {
    display: 'flex',
    width: '220px',
  },
  normalize: {
    boxShadow: 'none',
    boxSizing: 'border-box',
    margin: '0',
    padding: '0',
  },
  monthPickerNotVisible: {
    flexDirection: 'column',
  },
  dayAndMonthPickersVisible: {
    width: '440px',
  },
  dayPickerVisibleAndWeekNumbersShown: {
    width: '250px',
  },
  dayAndMonthPickersVisibleAndWeekNumbersShown: {
    width: '470px',
  },
});

const useDividerStyles = makeStyles({
  base: {
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    top: 0,
  },
});

const useMonthPickerWrapperStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const useGoTodayButtonStyles = makeStyles({
  base: {
    alignSelf: 'flex-end',
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderStyle('none'),
    bottom: 0,
    boxSizing: 'content-box',
    color: tokens.colorNeutralForeground1,
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase200,
    height: '30px',
    lineHeight: '30px',
    marginRight: '16px',
    marginTop: '3px',
    overflow: 'visible',
    padding: '0 4px',

    '& div': {
      fontSize: tokens.fontSizeBase200,
    },
    '&:hover': {
      backgroundColor: tokens.colorTransparentBackground,
      color: tokens.colorBrandForeground1,
      cursor: 'pointer',

      '@media (forced-colors: active)': {
        outline: tokens.strokeWidthThin,
        borderRadius: tokens.borderRadiusSmall,
      },
    },
    '&:hover:active': {
      color: tokens.colorBrandForeground2,
    },
    '&:disabled': {
      color: tokens.colorNeutralForegroundDisabled,
      pointerEvents: 'none',
    },
  },
});

const useLiveRegionStyles = makeStyles({
  base: {
    border: 'none',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    width: '1px',
  },
});

/**
 * @internal
 *
 * Apply styling to the Calendar slots based on the state
 */
export const useCalendarStyles_unstable = (props: CalendarStyleProps): CalendarStyles => {
  'use no memo';

  const rootStyles = useRootStyles();
  const dividerStyles = useDividerStyles();
  const monthPickerWrapperStyles = useMonthPickerWrapperStyles();
  const goTodayButtonStyles = useGoTodayButtonStyles();
  const liveRegionStyles = useLiveRegionStyles();

  const { className, isDayPickerVisible, isMonthPickerVisible, showWeekNumbers } = props;

  return {
    root: mergeClasses(
      calendarClassNames.root,
      rootStyles.base,
      rootStyles.normalize,
      !isMonthPickerVisible && rootStyles.monthPickerNotVisible,
      isDayPickerVisible && isMonthPickerVisible && !showWeekNumbers && rootStyles.dayAndMonthPickersVisible,
      isDayPickerVisible && !isMonthPickerVisible && showWeekNumbers && rootStyles.dayPickerVisibleAndWeekNumbersShown,
      isDayPickerVisible &&
        isMonthPickerVisible &&
        showWeekNumbers &&
        rootStyles.dayAndMonthPickersVisibleAndWeekNumbersShown,
      className,
    ),
    divider: mergeClasses(calendarClassNames.divider, dividerStyles.base),
    monthPickerWrapper: mergeClasses(calendarClassNames.monthPickerWrapper, monthPickerWrapperStyles.base),
    goTodayButton: mergeClasses(calendarClassNames.goTodayButton, goTodayButtonStyles.base),
    liveRegion: mergeClasses(calendarClassNames.liveRegion, liveRegionStyles.base),
  };
};

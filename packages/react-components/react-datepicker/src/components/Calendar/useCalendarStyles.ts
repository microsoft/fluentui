import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarSlots, CalendarStyles, CalendarStyleProps } from './Calendar.types';

export const calendarClassNames: SlotClassNames<CalendarSlots> & Record<string, string> = {
  root: 'fui-Calendar',
};

const useRootStyles = makeStyles({
  base: {
    display: 'flex',
    width: '220px',
  },
  normalize: {
    boxShadow: 'none',
    boxSizing: 'border-box',
    ...shorthands.margin(0),
    ...shorthands.padding(0),
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
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
    ...shorthands.borderRight('1px', 'solid'),
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
    ...shorthands.border('none'),
    bottom: 0,
    boxSizing: 'content-box',
    color: tokens.colorNeutralForeground1,
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase200,
    height: '30px',
    lineHeight: '30px',
    marginRight: '16px',
    marginTop: '3px',
    ...shorthands.overflow('visible'),
    ...shorthands.padding(0, '4px'),

    '& div': {
      fontSize: tokens.fontSizeBase200,
    },
    '&:hover': {
      backgroundColor: tokens.colorTransparentBackground,
      color: tokens.colorBrandForeground1,
      cursor: 'pointer',
    },
    '&:active': {
      color: tokens.colorBrandForeground2,
    },
    '&:disabled': {
      color: tokens.colorNeutralForegroundDisabled,
      pointerEvents: 'none',
    },
  },
  // getFocusStyle(theme, { inset: -1 }),
});

const useLiveRegionStyles = makeStyles({
  base: {
    ...shorthands.border(0),
    height: '1px',
    ...shorthands.margin('-1px'),
    ...shorthands.overflow('hidden'),
    ...shorthands.padding(0),
    position: 'absolute',
    width: '1px',
  },
});

/**
 * Apply styling to the Calendar slots based on the state
 */
// export const useCalendarStyles_unstable = (state: CalendarState): CalendarState => {
export const useCalendarStyles_unstable = (props: CalendarStyleProps): Record<keyof CalendarStyles, string> => {
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
    divider: dividerStyles.base,
    monthPickerWrapper: monthPickerWrapperStyles.base,
    goTodayButton: goTodayButtonStyles.base,
    liveRegion: liveRegionStyles.base,
  };
};

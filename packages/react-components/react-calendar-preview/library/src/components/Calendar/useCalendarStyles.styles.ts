'use client';

import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarSlots, CalendarState } from './Calendar.types';

/**
 * The pickers are not listed: each owns its own root class name.
 */
export const calendarClassNames: SlotClassNames<CalendarSlots> = {
  root: 'fui-Calendar',
  divider: 'fui-Calendar__divider',
  goToTodayButton: 'fui-Calendar__goToTodayButton',
  monthPickerWrapper: 'fui-Calendar__monthPickerWrapper',
  dayPicker: 'fui-Calendar__dayPicker',
  monthPicker: 'fui-Calendar__monthPicker',
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
    border: 'none',
    bottom: 0,
    boxSizing: 'content-box',
    color: tokens.colorNeutralForeground1,
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    minWidth: 'auto',
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
 * Apply styling to the Calendar slots based on the state.
 */
export const useCalendarStyles_unstable = (state: CalendarState): CalendarState => {
  'use no memo'; // justified: compiler would optimize useCalendarStyles_unstable — manual opt-out to preserve runtime behavior

  const rootStyles = useRootStyles();
  const dividerStyles = useDividerStyles();
  const monthPickerWrapperStyles = useMonthPickerWrapperStyles();
  const goTodayButtonStyles = useGoTodayButtonStyles();
  const liveRegionStyles = useLiveRegionStyles();

  const { isDayPickerVisible, isMonthPickerVisible, showWeekNumbers } = state;

  /* eslint-disable react-hooks/immutability */
  state.root.className = mergeClasses(
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
    state.root.className,
  );

  state.liveRegion.className = mergeClasses(
    calendarClassNames.liveRegion,
    liveRegionStyles.base,
    state.liveRegion.className,
  );

  if (state.divider) {
    state.divider.className = mergeClasses(calendarClassNames.divider, dividerStyles.base, state.divider.className);
  }

  if (state.monthPickerWrapper) {
    state.monthPickerWrapper.className = mergeClasses(
      calendarClassNames.monthPickerWrapper,
      monthPickerWrapperStyles.base,
      state.monthPickerWrapper.className,
    );
  }

  if (state.goToTodayButton) {
    state.goToTodayButton.className = mergeClasses(
      calendarClassNames.goToTodayButton,
      goTodayButtonStyles.base,
      state.goToTodayButton.className,
    );
  }

  state.dayPicker.className = mergeClasses(calendarClassNames.dayPicker, state.dayPicker.className);

  state.monthPicker.className = mergeClasses(calendarClassNames.monthPicker, state.monthPicker.className);

  /* eslint-enable react-hooks/immutability */

  return state;
};

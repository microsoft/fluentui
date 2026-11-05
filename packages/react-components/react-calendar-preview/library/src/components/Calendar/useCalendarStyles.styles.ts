'use client';

import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import { calendarGridWidth, calendarGridWidthWithWeekNumbers } from '../../utils/calendarDimensions';
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
    // The divider belongs inside the picker footprint, not in addition to it.
    width: `calc(${calendarGridWidth} + 2 * ${tokens.spacingHorizontalM})`,
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
    width: `calc(2 * ${calendarGridWidth} + 4 * ${tokens.spacingHorizontalM})`,
  },
  dayPickerWithWeekNumbers: {
    width: `calc(${calendarGridWidthWithWeekNumbers} + 2 * ${tokens.spacingHorizontalM})`,
  },
  dayAndMonthPickersWithWeekNumbers: {
    width: `calc(${calendarGridWidthWithWeekNumbers} + ${calendarGridWidth} + 4 * ${tokens.spacingHorizontalM})`,
  },
});

const useDividerStyles = makeStyles({
  base: {
    borderRight: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
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
    // Preserve compat's 30px action and 3px top gap using the surrounding spacing/stroke tokens.
    height: `calc(${tokens.spacingVerticalXXXL} - 2 * ${tokens.strokeWidthThin})`,
    minWidth: 'auto',
    lineHeight: `calc(${tokens.spacingVerticalXXXL} - 2 * ${tokens.strokeWidthThin})`,
    marginInlineEnd: tokens.spacingHorizontalL,
    marginBlockStart: `calc(${tokens.spacingVerticalXXS} + ${tokens.strokeWidthThin})`,
    overflow: 'visible',
    padding: `0 ${tokens.spacingHorizontalXS}`,
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
    '&:disabled, &[aria-disabled="true"]': {
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
    isDayPickerVisible && isMonthPickerVisible && rootStyles.dayAndMonthPickersVisible,
    isDayPickerVisible && showWeekNumbers && rootStyles.dayPickerWithWeekNumbers,
    isDayPickerVisible && isMonthPickerVisible && showWeekNumbers && rootStyles.dayAndMonthPickersWithWeekNumbers,
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

  if (state.dayPicker) {
    state.dayPicker.className = mergeClasses(calendarClassNames.dayPicker, state.dayPicker.className);
  }

  if (state.monthPicker) {
    state.monthPicker.className = mergeClasses(calendarClassNames.monthPicker, state.monthPicker.className);
  }

  /* eslint-enable react-hooks/immutability */
  return state;
};

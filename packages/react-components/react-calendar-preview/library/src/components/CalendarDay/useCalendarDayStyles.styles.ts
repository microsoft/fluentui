'use client';

import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarDaySlots, CalendarDayState } from './CalendarDay.types';

/**
 * The `body` and motion slots carry no class names of their own; the per-day and per-week class
 * names belong to CalendarDayGridRow, CalendarDayGridCell and CalendarDayGridHeaderRow, each of
 * which owns its own styles hook.
 */
export const calendarDayClassNames: SlotClassNames<CalendarDaySlots> = {
  root: 'fui-CalendarDay',
  header: 'fui-CalendarDay__header',
  heading: 'fui-CalendarDay__monthAndYear',
  navigation: 'fui-CalendarDay__monthComponents',
  previousMonthButton: 'fui-CalendarDay__previousMonthButton',
  nextMonthButton: 'fui-CalendarDay__nextMonthButton',
  closeButton: 'fui-CalendarDay__closeButton',
  grid: 'fui-CalendarDay__grid',
  body: 'fui-CalendarDay__body',
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

const useGridStyles = makeStyles({
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

const useMonthAndYearStyles = makeStyles({
  base: {
    alignItems: 'center',
    backgroundColor: tokens.colorTransparentBackground,
    border: 'none',
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
    border: 'none',
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

      // add this explicitly for aria-disabled buttons that don't get default forced-colors disabled styles
      '@media (forced-colors: active)': {
        color: 'GrayText',
      },
    },
  },
});

/**
 * Apply styling to the CalendarDay slots based on the state.
 */
export const useCalendarDayStyles_unstable = (state: CalendarDayState): CalendarDayState => {
  'use no memo'; // justified: compiler would optimize useCalendarDayStyles_unstable — manual opt-out to preserve runtime behavior

  const rootStyles = useRootStyles();
  const headerStyles = useHeaderStyles();
  const gridStyles = useGridStyles();
  const monthAndYearStyles = useMonthAndYearStyles();
  const monthComponentsStyles = useMonthComponentsStyles();
  const headerIconButtonStyles = useHeaderIconButtonStyles();
  const disabledStyleStyles = useDisabledStyleStyles();
  const showWeekNumbers = useCalendarContext_unstable(ctx => ctx.showWeekNumbers);

  const { headerIsClickable, nextMonthInBounds, prevMonthInBounds } = state;

  /* eslint-disable react-hooks/immutability */
  state.root.className = mergeClasses(
    calendarDayClassNames.root,
    rootStyles.normalize,
    rootStyles.base,
    showWeekNumbers && rootStyles.showWeekNumbers,
    state.root.className,
  );

  state.header.className = mergeClasses(calendarDayClassNames.header, headerStyles.base, state.header.className);

  state.grid.className = mergeClasses(
    calendarDayClassNames.grid,
    gridStyles.base,
    showWeekNumbers && gridStyles.showWeekNumbers,
    state.grid.className,
  );

  state.heading.className = mergeClasses(
    calendarDayClassNames.heading,
    monthAndYearStyles.base,
    headerIsClickable && monthAndYearStyles.headerIsClickable,
    state.heading.className,
  );

  state.navigation.className = mergeClasses(
    calendarDayClassNames.navigation,
    monthComponentsStyles.base,
    state.navigation.className,
  );

  state.previousMonthButton.className = mergeClasses(
    calendarDayClassNames.previousMonthButton,
    headerIconButtonStyles.base,
    !prevMonthInBounds && disabledStyleStyles.base,
    state.previousMonthButton.className,
  );

  state.nextMonthButton.className = mergeClasses(
    calendarDayClassNames.nextMonthButton,
    headerIconButtonStyles.base,
    !nextMonthInBounds && disabledStyleStyles.base,
    state.nextMonthButton.className,
  );

  if (state.closeButton) {
    state.closeButton.className = mergeClasses(
      calendarDayClassNames.closeButton,
      headerIconButtonStyles.base,
      state.closeButton.className,
    );
  }
  /* eslint-enable react-hooks/immutability */

  return state;
};

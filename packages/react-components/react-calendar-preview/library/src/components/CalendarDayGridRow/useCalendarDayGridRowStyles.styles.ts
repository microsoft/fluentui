'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarDayGridRowState, CalendarDayGridRowSlots } from './CalendarDayGridRow.types';

/**
 * Class names for calendarDayGridRow slots.
 */

export const calendarDayGridRowClassNames: SlotClassNames<CalendarDayGridRowSlots> = {
  root: 'fui-CalendarDayGridRow',
  weekNumberCell: 'fui-CalendarDayGridRow__weekNumberCell',
  motion: 'fui-CalendarDayGridRow__motion',
};

const useRootStyles = makeStyles({
  base: {
    position: 'relative',
    ':focus-within': {
      zIndex: 1,
    },
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

const useTransitionStyles = makeStyles({
  /*
   * Overlaid out of flow and transparent at rest; `pointerEvents: 'none'` stops the invisible
   * overlay from intercepting clicks. The slide-out motion fades opacity 1 → 0, ending here.
   */
  first: {
    opacity: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
  },
  last: {
    marginTop: '-28px',
    opacity: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
  },
});

/**
 * Apply styling to the CalendarDayGridRow slots based on the state.
 */
export const useCalendarDayGridRowStyles_unstable = (state: CalendarDayGridRowState): CalendarDayGridRowState => {
  'use no memo'; // justified: compiler would optimize useCalendarDayGridRowStyles_unstable — manual opt-out to preserve runtime behavior

  const rootStyles = useRootStyles();
  const weekNumberCellStyles = useWeekNumberCellStyles();
  const transitionStyles = useTransitionStyles();

  /* eslint-disable react-hooks/immutability */
  state.root.className = mergeClasses(
    calendarDayGridRowClassNames.root,
    rootStyles.base,
    state.transition === 'first' && transitionStyles.first,
    state.transition === 'last' && transitionStyles.last,
    state.root.className,
  );

  if (state.weekNumberCell) {
    state.weekNumberCell.className = mergeClasses(
      calendarDayGridRowClassNames.weekNumberCell,
      weekNumberCellStyles.base,
      state.weekNumberCell.className,
    );
  }
  /* eslint-enable react-hooks/immutability */

  return state;
};

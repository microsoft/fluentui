import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { CalendarGridState, CalendarGridSlots } from './CalendarGrid.types';

/**
 * Render the final JSX of CalendarGrid
 */
export const renderCalendarGrid_unstable = (state: CalendarGridState) => {
  const { slots, slotProps } = getSlots<CalendarGridSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};

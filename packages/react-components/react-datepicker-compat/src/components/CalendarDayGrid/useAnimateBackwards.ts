import * as React from 'react';
import { DayInfo } from './CalendarDayGrid';
import { useRefEffect } from '../../temp-utils/useRefEffect';

/**
 * Hook to determine whether to animate the CalendarDayGrid forwards or backwards
 * @returns true if the grid should animate backwards; false otherwise
 */
export function useAnimateBackwards(weeks: DayInfo[][]): boolean | undefined {
  const previousNavigatedDateRef = React.useRef<Date | undefined>();
  useRefEffect(() => {
    previousNavigatedDateRef.current = weeks[0][0].originalDate;
  });
  const previousNavigatedDate = previousNavigatedDateRef.current;

  if (!previousNavigatedDate || previousNavigatedDate.getTime() === weeks[0][0].originalDate.getTime()) {
    return undefined;
  } else if (previousNavigatedDate <= weeks[0][0].originalDate) {
    return false;
  } else {
    return true;
  }
}

import { DayOfWeek } from '../dateValues/dateValues';

/**
 * Returns whether provided week days are contiguous.
 * @param days - list of days in a week
 * @param isSingleWeek - decides whether the contiguous logic applies across week boundaries or not
 * @param firstDayOfWeek - decides which day of week is the first one in the order.
 */
export const isContiguous = (days: DayOfWeek[], isSingleWeek: boolean, firstDayOfWeek: DayOfWeek): boolean => {
  const daySet = new Set(days);
  let amountOfNoNeighbors = 0;
  for (const day of days) {
    const nextDay = (day + 1) % 7;
    if (!(daySet.has(nextDay) && (!isSingleWeek || firstDayOfWeek !== nextDay))) {
      amountOfNoNeighbors++;
    }
  }

  // In case the full week is provided, then each day has a neighbor
  //, otherwise the last day does not have a neighbor.
  return amountOfNoNeighbors < 2;
};

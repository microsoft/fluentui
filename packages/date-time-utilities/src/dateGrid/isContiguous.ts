import { DayOfWeek } from '../dateValues/dateValues';

/**
 * Returns whether provided week days are contiguous.
 * The end of week is wrapping.
 * @param days - list of days in a week
 */
export const isContiguous = (days: DayOfWeek[]): boolean => {
  const daySet = new Set(days);
  let amountOfNoNeighbors = 0;
  for (const day of days) {
    if (!daySet.has((day + 1) % 7)) {
      amountOfNoNeighbors++;
    }
  }

  // In case the full week is provided, then each day has a neighbor
  //, otherwise the last day does not have a neighbor.
  return amountOfNoNeighbors < 2;
};

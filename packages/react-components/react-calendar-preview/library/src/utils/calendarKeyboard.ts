// The grid supplies the focused date while Calendar retains ownership of paging and consumer cancellation.
const navigationDates = new WeakMap<Event, Date>();

export const setCalendarNavigationDate = (event: Event, date: Date): void => {
  navigationDates.set(event, date);
};

export const getCalendarNavigationDate = (event: Event): Date | undefined => {
  const date = navigationDates.get(event);
  navigationDates.delete(event);
  return date;
};

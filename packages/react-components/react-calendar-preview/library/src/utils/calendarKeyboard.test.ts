import { getCalendarNavigationDate, setCalendarNavigationDate } from './calendarKeyboard';

describe('calendar keyboard navigation dates', () => {
  it('provides a date only for the originating event and consumes it once', () => {
    const event = new Event('keydown');
    const date = new Date(2020, 8, 25);
    setCalendarNavigationDate(event, date);
    expect(getCalendarNavigationDate(new Event('keydown'))).toBeUndefined();
    expect(getCalendarNavigationDate(event)).toBe(date);
    expect(getCalendarNavigationDate(event)).toBeUndefined();
  });
});

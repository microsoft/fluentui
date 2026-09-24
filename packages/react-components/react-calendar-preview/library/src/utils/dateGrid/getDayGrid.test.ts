import { getDayGrid } from './getDayGrid';
import type { DayGridOptions } from './dateGrid.types';
import * as dateMath from '../dateMath';
import { daysOfWeek } from '../constants';

jest.mock('../dateMath', () => ({
  __esModule: true,
  ...jest.requireActual<typeof import('../dateMath')>('../dateMath'),
}));

const defaultOptions: DayGridOptions = {
  dateRangeType: 'day',
  firstDayOfWeek: 'sunday',
  firstWeekOfYear: 'firstFullWeek',
  navigatedDate: new Date(2020, 8, 18),
  today: new Date(2020, 8, 18),
};

describe('getDayGrid', () => {
  afterEach(() => jest.restoreAllMocks());

  it.each([0, -1, 1.5, Infinity, -Infinity, NaN])('rejects an invalid weeksToShow value of %s', weeksToShow => {
    expect(() => getDayGrid({ ...defaultOptions, weeksToShow })).toThrow(
      new RangeError('weeksToShow must be a positive finite integer.'),
    );
  });

  it('generates the full month with a transition row on each side', () => {
    const weeks = getDayGrid(defaultOptions);
    expect(weeks).toHaveLength(7);
    weeks.forEach((week, weekIndex) => {
      expect(week).toHaveLength(7);
      week.forEach((day, dayIndex) => {
        const expected = new Date(2020, 7, 23 + weekIndex * 7 + dayIndex);
        expect(day).toEqual({
          key: `${expected.getFullYear()}-${expected.getMonth()}-${expected.getDate()}`,
          date: String(expected.getDate()),
          originalDate: expected,
          isPlaceholder: false,
          isInMonth: expected.getMonth() === 8,
          isToday: expected.getTime() === defaultOptions.today?.getTime(),
          isSelected: false,
          isSingleSelected: false,
          isInBounds: true,
          isMarked: false,
        });
      });
    });
  });

  it.each(daysOfWeek)('aligns ordinary weeks to %s', firstDayOfWeek => {
    const weeks = getDayGrid({ ...defaultOptions, firstDayOfWeek });
    weeks.forEach(week => expect(week[0].originalDate!.getDay()).toBe(daysOfWeek.indexOf(firstDayOfWeek)));
  });

  it.each([1, 2, 3, 4, 5, 6])('includes two transition rows for %s visible weeks', weeksToShow => {
    const weeks = getDayGrid({ ...defaultOptions, weeksToShow });
    expect(weeks).toHaveLength(weeksToShow + 2);
    expect(weeks[1][0].originalDate).toEqual(new Date(2020, weeksToShow <= 4 ? 8 : 7, weeksToShow <= 4 ? 13 : 30));
  });

  it.each([
    [2021, 1, 6],
    [2020, 7, 8],
  ])('covers all days in month %s/%s with %s rows', (year, month, rowCount) => {
    const weeks = getDayGrid({ ...defaultOptions, navigatedDate: new Date(year, month, 15), firstDayOfWeek: 'monday' });
    const inMonth = weeks.flat().filter(day => day.isInMonth);
    expect(weeks).toHaveLength(rowCount);
    expect(inMonth.map(day => day.originalDate!.getDate())).toEqual(
      Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, index) => index + 1),
    );
  });

  it('uses the navigated month rather than today for isInMonth and ignores times for flags', () => {
    const days = getDayGrid({
      ...defaultOptions,
      today: new Date(2020, 7, 31, 12),
      markedDays: [new Date(2020, 8, 18, 23)],
    }).flat();
    expect(days.find(day => day.key === '2020-7-31')).toMatchObject({ isToday: true, isInMonth: false });
    expect(days.find(day => day.key === '2020-8-18')).toMatchObject({
      isToday: false,
      isInMonth: true,
      isMarked: true,
    });

    expect(days.filter(day => day.isMarked)).toHaveLength(1);
  });

  it('does not mark the same month in a different year as in-month', () => {
    const gridDays = getDayGrid({
      ...defaultOptions,
      navigatedDate: new Date(2020, 11, 1),
      weeksToShow: 53,
    }).flat();

    expect(gridDays.find(day => day.key === '2021-11-1')).toMatchObject({ isInMonth: false });
  });

  it('preserves years below 100 when advancing the civil date cursor', () => {
    const navigatedDate = dateMath.createDate(5, 0, 15);
    const grid = getDayGrid({ ...defaultOptions, navigatedDate, weeksToShow: 1 });
    expect(grid.flat().map(day => day.originalDate?.getFullYear())).toContain(5);
    expect(grid.flat().some(day => day.originalDate?.getFullYear() === 1905)).toBe(false);
  });

  it('defaults today to the current date', () => {
    jest.useFakeTimers().setSystemTime(new Date(2020, 8, 20, 12));
    try {
      expect(
        getDayGrid({ ...defaultOptions, today: undefined })
          .flat()
          .filter(day => day.isToday)
          .map(day => day.key),
      ).toEqual(['2020-8-20']);
    } finally {
      jest.useRealTimers();
    }
  });

  it('falls back to today when a JavaScript caller omits the navigated date', () => {
    // @ts-expect-error Verify the runtime fallback for an omitted required date.
    expect(getDayGrid({ ...defaultOptions, navigatedDate: undefined })).toEqual(getDayGrid(defaultOptions));
  });

  it('marks a single selected day', () => {
    const days = getDayGrid({ ...defaultOptions, selectedDate: new Date(2020, 8, 18, 12) }).flat();
    expect(days.filter(day => day.isSelected).map(day => day.key)).toEqual(['2020-8-18']);
    expect(days.filter(day => day.isSingleSelected).map(day => day.key)).toEqual(['2020-8-18']);
  });

  it.each([
    ['day', [18, 19, 20]],
    ['week', [13, 14, 15, 16, 17, 18, 19]],
    ['workWeek', [14, 15, 16, 17, 18]],
    ['month', Array.from({ length: 30 }, (_, index) => index + 1)],
  ] as const)('selects the expected %s range', (dateRangeType, expected) => {
    const days = getDayGrid({
      ...defaultOptions,
      dateRangeType,
      selectedDate: new Date(2020, 8, 18),
      daysToSelectInDayView: 3,
    }).flat();
    expect(days.filter(day => day.isSelected).map(day => day.originalDate!.getDate())).toEqual(expected);
    expect(days.some(day => day.isSingleSelected)).toBe(false);
  });

  it('clips selected ranges to inclusive bounds and separately flags restricted days', () => {
    const days = getDayGrid({
      ...defaultOptions,
      dateRangeType: 'week',
      selectedDate: new Date(2020, 8, 18),
      minDate: new Date(2020, 8, 15, 12),
      maxDate: new Date(2020, 8, 18),
      restrictedDates: [new Date(2020, 8, 16, 12)],
    }).flat();
    expect(days.filter(day => day.isSelected).map(day => day.key)).toEqual([
      '2020-8-15',
      '2020-8-16',
      '2020-8-17',
      '2020-8-18',
    ]);
    expect(days.filter(day => day.isInBounds).map(day => day.key)).toEqual(['2020-8-15', '2020-8-17', '2020-8-18']);
  });

  it('uses a full week for non-contiguous work-week days', () => {
    const days = getDayGrid({
      ...defaultOptions,
      dateRangeType: 'workWeek',
      selectedDate: new Date(2020, 8, 18),
      workWeekDays: ['monday', 'wednesday', 'friday'],
    }).flat();
    expect(days.filter(day => day.isSelected).map(day => day.originalDate!.getDate())).toEqual([
      13, 14, 15, 16, 17, 18, 19,
    ]);
  });

  it('rejects invalid and unrepresentable grid dates', () => {
    expect(() => getDayGrid({ ...defaultOptions, navigatedDate: new Date(NaN) })).toThrow(
      new RangeError('navigatedDate must be valid.'),
    );
    expect(() => getDayGrid({ ...defaultOptions, navigatedDate: new Date(-8640000000000000) })).toThrow(
      new RangeError('Cannot align an invalid or out-of-range date.'),
    );
    expect(() => getDayGrid({ ...defaultOptions, navigatedDate: new Date(8640000000000000) })).toThrow(
      new RangeError('Cannot generate a grid containing an out-of-range date.'),
    );
  });

  it('bounds alignment even if normalization never produces the requested weekday', () => {
    const alignToWeekStart = jest.spyOn(dateMath, 'getStartDateOfWeek').mockImplementation(() => {
      throw new RangeError('Could not find a representable week start within two weeks.');
    });
    expect(() => getDayGrid(defaultOptions)).toThrow(
      new RangeError('Could not find a representable week start within two weeks.'),
    );
    expect(alignToWeekStart).toHaveBeenCalledTimes(1);
  });

  it('aligns January 2012 using the runtime timezone without mocked normalization', () => {
    const skippedFriday = new Date(2011, 11, 30).getDate() !== 30;
    const options = { ...defaultOptions, navigatedDate: new Date(2012, 0, 1) };
    const mondayWeeks = getDayGrid({ ...options, firstDayOfWeek: 'monday' });
    const fridayWeeks = getDayGrid({ ...options, firstDayOfWeek: 'friday' });
    expect(mondayWeeks[1][0].originalDate).toEqual(new Date(2011, 11, 26));
    expect(fridayWeeks[1][0].originalDate).toEqual(new Date(2011, 11, skippedFriday ? 23 : 30));
    expect(
      fridayWeeks
        .flat()
        .filter(day => day.isInMonth)
        .filter(day => day.originalDate)
        .map(day => day.originalDate!.getDate()),
    ).toEqual(Array.from({ length: 31 }, (_, index) => index + 1));
    if (skippedFriday) {
      const placeholder = fridayWeeks.flatMap(week => week).find(day => day.isPlaceholder);
      expect(placeholder).toMatchObject({ key: '2011-11-30', originalDate: null, isPlaceholder: true });
      fridayWeeks.forEach(week =>
        week.forEach((day, index) => {
          if (!day.isPlaceholder) {
            expect(day.originalDate!.getDay()).toBe((5 + index) % 7);
          }
        }),
      );
    }
  });
});

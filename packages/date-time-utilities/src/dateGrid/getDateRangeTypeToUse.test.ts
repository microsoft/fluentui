import { DateRangeType, DayOfWeek } from '../dateValues/dateValues';
import * as DateGrid from './getDateRangeTypeToUse';

describe('getDateRangeTypeToUse', () => {
  it('returns incoming range type if working days are empty', () => {
    const resultDay = DateGrid.getDateRangeTypeToUse(DateRangeType.Day, undefined, DayOfWeek.Sunday);
    expect(resultDay).toBe(DateRangeType.Day);
    const resultWeek = DateGrid.getDateRangeTypeToUse(DateRangeType.Week, undefined, DayOfWeek.Sunday);
    expect(resultWeek).toBe(DateRangeType.Week);
    const resultMonth = DateGrid.getDateRangeTypeToUse(DateRangeType.Month, undefined, DayOfWeek.Sunday);
    expect(resultMonth).toBe(DateRangeType.Month);
    const resultWorkWeek = DateGrid.getDateRangeTypeToUse(DateRangeType.WorkWeek, undefined, DayOfWeek.Sunday);
    expect(resultWorkWeek).toBe(DateRangeType.WorkWeek);
  });
  it('returns Week range type if working days are non-contiguous and incoming type is WorkWeek', () => {
    const resultWorkWeek = DateGrid.getDateRangeTypeToUse(
      DateRangeType.WorkWeek,
      [DayOfWeek.Monday, DayOfWeek.Wednesday],
      DayOfWeek.Sunday,
    );
    expect(resultWorkWeek).toBe(DateRangeType.Week);
  });
  it('returns WorkWeek range type if working days are contiguous and incoming type is WorkWeek', () => {
    const resultWorkWeek = DateGrid.getDateRangeTypeToUse(
      DateRangeType.WorkWeek,
      [DayOfWeek.Monday, DayOfWeek.Tuesday],
      DayOfWeek.Sunday,
    );
    expect(resultWorkWeek).toBe(DateRangeType.WorkWeek);
  });
  // eslint-disable-next-line @fluentui/max-len
  it('returns WorkWeek range type if working days are not contiguous from Saturday to Sunday and incoming type is WorkWeek', () => {
    const resultWorkWeek = DateGrid.getDateRangeTypeToUse(
      DateRangeType.WorkWeek,
      [DayOfWeek.Saturday, DayOfWeek.Sunday],
      DayOfWeek.Sunday,
    );
    expect(resultWorkWeek).toBe(DateRangeType.Week);
  });
  // eslint-disable-next-line @fluentui/max-len
  it('returns WorkWeek range type if working days are contiguous from Saturday to Sunday and incoming type is WorkWeek', () => {
    const resultWorkWeek = DateGrid.getDateRangeTypeToUse(
      DateRangeType.WorkWeek,
      [DayOfWeek.Saturday, DayOfWeek.Sunday],
      DayOfWeek.Monday,
    );
    expect(resultWorkWeek).toBe(DateRangeType.WorkWeek);
  });
});

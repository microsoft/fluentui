import { DateRangeType, DayOfWeek } from '../dateValues/dateValues';
import * as DateGrid from './getDateRangeTypeToUse';

describe('getDateRangeTypeToUse', () => {
  it('returns incoming range type if working days are empty', () => {
    const resultDay = DateGrid.getDateRangeTypeToUse(DateRangeType.Day, undefined);
    expect(resultDay).toBe(DateRangeType.Day);
    const resultWeek = DateGrid.getDateRangeTypeToUse(DateRangeType.Week, undefined);
    expect(resultWeek).toBe(DateRangeType.Week);
    const resultMonth = DateGrid.getDateRangeTypeToUse(DateRangeType.Month, undefined);
    expect(resultMonth).toBe(DateRangeType.Month);
    const resultWorkWeek = DateGrid.getDateRangeTypeToUse(DateRangeType.WorkWeek, undefined);
    expect(resultWorkWeek).toBe(DateRangeType.WorkWeek);
  });
  it('returns Week range type if working days are non-contiguous and incoming type is WorkWeek', () => {
    const resultWorkWeek = DateGrid.getDateRangeTypeToUse(DateRangeType.WorkWeek, [
      DayOfWeek.Monday,
      DayOfWeek.Wednesday,
    ]);
    expect(resultWorkWeek).toBe(DateRangeType.Week);
  });
  it('returns WorkWeek range type if working days are contiguous and incoming type is WorkWeek', () => {
    const resultWorkWeek = DateGrid.getDateRangeTypeToUse(DateRangeType.WorkWeek, [
      DayOfWeek.Monday,
      DayOfWeek.Tuesday,
    ]);
    expect(resultWorkWeek).toBe(DateRangeType.WorkWeek);
  });
});

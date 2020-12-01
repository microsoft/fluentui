import { validateDate } from '../../../../src/components/Datepicker/validateDate';
import { IRestrictedDatesOptions, DEFAULT_CALENDAR_STRINGS } from '../../../../src/utils/date-time-utilities';

describe('validateDate', () => {
  const referenceDate = new Date(2020, 0, 1);
  const restrictedDates: IRestrictedDatesOptions = { restrictedDates: [referenceDate] };

  it('returns no error if not restricted', () => {
    const result = validateDate(referenceDate, null, {}, DEFAULT_CALENDAR_STRINGS, false);
    expect(result).toBeFalsy();
  });
  it('returns error if restricted', () => {
    const result = validateDate(referenceDate, null, restrictedDates, DEFAULT_CALENDAR_STRINGS, false);
    expect(result).toBe(DEFAULT_CALENDAR_STRINGS.isOutOfBoundsErrorMessage);
  });
  it('returns error if wrong format', () => {
    const result = validateDate(null, 'wrong', restrictedDates, DEFAULT_CALENDAR_STRINGS, false);
    expect(result).toBe(DEFAULT_CALENDAR_STRINGS.invalidInputErrorMessage);
  });
  it('returns no error if empty and not required', () => {
    const result = validateDate(null, null, restrictedDates, DEFAULT_CALENDAR_STRINGS, false);
    expect(result).toBeFalsy();
  });
  it('returns error if empty and required', () => {
    const result = validateDate(null, null, restrictedDates, DEFAULT_CALENDAR_STRINGS, true);
    expect(result).toBe(DEFAULT_CALENDAR_STRINGS.isRequiredErrorMessage);
  });
});

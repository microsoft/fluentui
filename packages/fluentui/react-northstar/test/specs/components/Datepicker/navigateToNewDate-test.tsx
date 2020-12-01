import { compareDatePart } from '../../../../src/utils/date-time-utilities';
import { navigateToNewDate } from '../../../../src/components/Datepicker/navigateToNewDate';

describe('navigateToNewDate', () => {
  const referenceDate = new Date(2020, 0, 10);

  it('Navigation works for day', () => {
    const result = navigateToNewDate(referenceDate, 'Day', 1, {}, false);
    expect(compareDatePart(result, new Date(2020, 0, 11))).toBeFalsy();
  });
  it('Navigation works for week', () => {
    const result = navigateToNewDate(referenceDate, 'Week', -1, {}, false);
    expect(compareDatePart(result, new Date(2020, 0, 3))).toBeFalsy();
  });
  it('Navigation works for month', () => {
    const result = navigateToNewDate(referenceDate, 'Month', 1, {}, false);
    expect(compareDatePart(result, new Date(2020, 1, 10))).toBeFalsy();
  });

  it('Restricted week jump can jump by bigger steps', () => {
    const result = navigateToNewDate(referenceDate, 'Week', 7, { restrictedDates: [new Date(2020, 0, 17)] }, false);
    expect(compareDatePart(result, new Date(2020, 0, 24))).toBeFalsy();
  });
  it('Restricted day backward jumps back to min', () => {
    const result = navigateToNewDate(referenceDate, 'Day', -1, { minDate: referenceDate }, false);
    expect(compareDatePart(result, referenceDate)).toBeFalsy();
  });
  it('Restricted month forward jumps back to max', () => {
    const result = navigateToNewDate(referenceDate, 'Month', 1, { maxDate: referenceDate }, false);
    expect(compareDatePart(result, referenceDate)).toBeFalsy();
  });
  it('Restricted week does not jump when can navigate to disabled dates', () => {
    const result = navigateToNewDate(referenceDate, 'Week', 7, { restrictedDates: [new Date(2020, 0, 17)] }, true);
    expect(compareDatePart(result, new Date(2020, 0, 17))).toBeFalsy();
  });
});

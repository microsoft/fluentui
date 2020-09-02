import { selectors } from './datepicker-example';

const datepicker = `.${selectors.DatepickerClassName}`;
const datepickerButton = `.${selectors.DatepickerClassName}>button`;
const datepickerCalendar = `.${selectors.CalendarClassName}`;
const datepickerCalendarCell = index => `.${selectors.CellClassName}:nth-child(${index})`;

// https://github.com/microsoft/fluent-ui-react/issues/1674
describe('Datepicker', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, datepicker);
  });

  it('Click to the button should open calendar', async () => {
    await e2e.clickOn(datepickerButton);
    expect(await e2e.exists(datepickerCalendar)).toBe(true);
  });

  it('Clicking arrow left on the first visible element of the grid should change month', async () => {
    await e2e.focusOn(datepickerButton);
    await e2e.pressKey('Enter'); // open calendar
    expect(await e2e.exists(datepickerCalendar)).toBe(true);
    expect(await e2e.isFocused(datepickerCalendarCell(32))).toBe(true); // 32 is a magic number
    expect(await e2e.textOf(datepickerCalendarCell(32))).toBe('23'); // which represents July 23, 2020, cell focused by default
    await e2e.focusOn(datepickerCalendarCell(8)); // 8 is a magic number
    expect(await e2e.textOf(datepickerCalendarCell(8))).toBe('29'); // which represents June 29, 2020 the first visible cell value

    await e2e.pressKey('ArrowLeft');
    expect(await e2e.isFocused(datepickerCalendarCell(35))).toBe(true); // 35 is a magic number
    expect(await e2e.textOf(datepickerCalendarCell(35))).toBe('28'); // which represents June 28, 2020, cell which should be focused on after the grid update
  });

  it('Clicking arrow right on the last visible element of the grid should change month', async () => {
    await e2e.focusOn(datepickerButton);
    await e2e.pressKey('Enter'); // open calendar
    expect(await e2e.exists(datepickerCalendar)).toBe(true);
    expect(await e2e.isFocused(datepickerCalendarCell(32))).toBe(true); // 32 is a magic number
    expect(await e2e.textOf(datepickerCalendarCell(32))).toBe('23'); // which represents July 23, 2020, cell focused by default
    await e2e.focusOn(datepickerCalendarCell(42)); // 42 is a magic number
    expect(await e2e.textOf(datepickerCalendarCell(42))).toBe('2'); // which represents August 2, 2020 the last visible cell value

    await e2e.pressKey('ArrowRight');
    expect(await e2e.isFocused(datepickerCalendarCell(15))).toBe(true); // 15 is a magic number
    expect(await e2e.textOf(datepickerCalendarCell(15))).toBe('3'); // which represents August 3, 2020, cell which should be focused on after the grid update
  });
});

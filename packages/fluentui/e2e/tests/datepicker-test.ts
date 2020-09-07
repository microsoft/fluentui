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
    await e2e.exists(datepickerCalendar);
  });

  it('Clicking arrow left on the first visible element of the grid should change month', async () => {
    await e2e.focusOn(datepickerButton);
    await e2e.pressKey('Enter'); // open calendar
    await e2e.exists(datepickerCalendar);
    await e2e.isFocused(datepickerCalendarCell(32)); // 32 is a magic number
    await e2e.textOf(datepickerCalendarCell(32), '23'); // which represents July 23, 2020, cell focused by default
    await e2e.focusOn(datepickerCalendarCell(8)); // 8 is a magic number
    await e2e.textOf(datepickerCalendarCell(8), '29'); // which represents June 29, 2020 the first visible cell value

    await e2e.pressKey('ArrowLeft');
    await e2e.isFocused(datepickerCalendarCell(35)); // 35 is a magic number
    await e2e.textOf(datepickerCalendarCell(35), '28'); // which represents June 28, 2020, cell which should be focused on after the grid update
  });

  it('Clicking arrow right on the last visible element of the grid should change month', async () => {
    await e2e.focusOn(datepickerButton);
    await e2e.pressKey('Enter'); // open calendar
    await e2e.exists(datepickerCalendar);
    await e2e.isFocused(datepickerCalendarCell(32)); // 32 is a magic number
    await e2e.textOf(datepickerCalendarCell(32), '23'); // which represents July 23, 2020, cell focused by default
    await e2e.focusOn(datepickerCalendarCell(42)); // 42 is a magic number
    await e2e.textOf(datepickerCalendarCell(42), '2'); // which represents August 2, 2020 the last visible cell value

    await e2e.pressKey('ArrowRight');
    await e2e.isFocused(datepickerCalendarCell(15)); // 15 is a magic number
    await e2e.textOf(datepickerCalendarCell(15), '3'); // which represents August 3, 2020, cell which should be focused on after the grid update
  });

  it('Advanced keyboard navigation works', async () => {
    await e2e.focusOn(datepickerButton);
    await e2e.pressKey('Enter'); // open calendar
    await e2e.exists(datepickerCalendar);

    await e2e.isFocused(datepickerCalendarCell(32)); // 32 is a magic number
    await e2e.textOf(datepickerCalendarCell(32), '23'); // which represents July 23, 2020, cell focused by default

    await e2e.pressKey('Home');
    await e2e.isFocused(datepickerCalendarCell(29)); // 29 is a magic number
    await e2e.textOf(datepickerCalendarCell(29), '20'); // which represents July 20, 2020, first cell in the same grid row

    await e2e.pressKey('End');
    await e2e.isFocused(datepickerCalendarCell(35)); // 35 is a magic number
    await e2e.textOf(datepickerCalendarCell(35), '26'); // which represents July 26, 2020, last cell in the same grid row

    await e2e.pressKey('PageUp');
    await e2e.isFocused(datepickerCalendarCell(14)); // 14 is a magic number
    await e2e.textOf(datepickerCalendarCell(14), '5'); // which represents July 5, 2020, first cell in the same grid column

    await e2e.pressKey('PageDown');
    await e2e.isFocused(datepickerCalendarCell(42)); // 42 is a magic number
    await e2e.textOf(datepickerCalendarCell(42), '2'); // which represents August 2, 2020, last cell in the same grid column

    await e2e.pressKey('Home', 'Control');
    await e2e.isFocused(datepickerCalendarCell(8)); // 8 is a magic number
    await e2e.textOf(datepickerCalendarCell(8), '29'); // which represents June 29, 2020, first cell in the grid

    await e2e.pressKey('End', 'Control');
    await e2e.isFocused(datepickerCalendarCell(42)); // 42 is a magic number
    await e2e.textOf(datepickerCalendarCell(42), '2'); // which represents August 2, 2020, last cell in the grid
  });
});

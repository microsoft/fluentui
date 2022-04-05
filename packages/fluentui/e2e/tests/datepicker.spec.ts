describe('Datepicker', () => {
  const selectors: any = {
    DatepickerClassName: 'ui-datepicker',
    CalendarClassName: 'ui-datepicker__calendar',
    CalendarGridRowClassName: 'ui-datepicker__calendargridrow',
    CellClassName: 'ui-datepicker__calendarcell',
    CellButtonClassName: 'ui-datepicker__calendarcellbutton',
  };

  const datepicker = `.${selectors.DatepickerClassName}`;
  const datepickerButton = `.${selectors.DatepickerClassName}>button`;
  const datepickerCalendar = `.${selectors.CalendarClassName}`;
  const datepickerInput = `.${selectors.DatepickerClassName} input`;

  const datepickerCalendarCell = index => {
    const row = Math.floor((index - 1) / 7);
    const col = index - row * 7;
    return `.${selectors.CalendarGridRowClassName}:nth-child(${row})
              >.${selectors.CellClassName}:nth-child(${col})
              >.${selectors.CellButtonClassName}`;
  };

  beforeEach(() => {
    cy.gotoTestCase(__filename, datepicker);
  });

  it('Click to the button should open calendar', () => {
    cy.clickOn(datepickerButton);
    cy.visible(datepickerCalendar);
  });

  it('Clicking arrow left on the first visible element of the grid should change month', () => {
    cy.focusOn(datepickerButton);
    cy.waitForSelectorAndPressKey(datepickerButton, '{enter}'); // open calendar
    cy.visible(datepickerCalendar);

    cy.isFocused(datepickerCalendarCell(32)); // 32 is a magic number
    cy.expectTextOf(datepickerCalendarCell(32), '23'); // which represents July 23, 2020, cell focused by default
    cy.focusOn(datepickerCalendarCell(8)); // 8 is a magic number
    cy.expectTextOf(datepickerCalendarCell(8), '29'); // which represents June 29, 2020 the first visible cell value

    cy.waitForSelectorAndPressKey(datepickerCalendar, '{leftarrow}');
    cy.isFocused(datepickerCalendarCell(35)); // 35 is a magic number
    cy.expectTextOf(datepickerCalendarCell(35), '28'); // which represents June 28, 2020, cell which should be focused on after the grid update
  });

  it('Clicking arrow right on the last visible element of the grid should change month', () => {
    cy.focusOn(datepickerButton);
    cy.waitForSelectorAndPressKey(datepickerButton, '{enter}'); // open calendar
    cy.visible(datepickerCalendar);

    cy.isFocused(datepickerCalendarCell(32)); // 32 is a magic number
    cy.expectTextOf(datepickerCalendarCell(32), '23'); // which represents July 23, 2020, cell focused by default
    cy.focusOn(datepickerCalendarCell(42)); // 42 is a magic number
    cy.expectTextOf(datepickerCalendarCell(42), '2'); // which represents August 2, 2020 the last visible cell value

    cy.waitForSelectorAndPressKey(datepickerCalendar, '{rightarrow}');
    cy.isFocused(datepickerCalendarCell(15)); // 15 is a magic number
    cy.expectTextOf(datepickerCalendarCell(15), '3'); // which represents August 3, 2020, cell which should be focused on after the grid update
  });

  it('Advanced keyboard navigation works', () => {
    cy.focusOn(datepickerButton);
    cy.waitForSelectorAndPressKey(datepickerButton, '{enter}'); // open calendar
    cy.visible(datepickerCalendar);

    cy.isFocused(datepickerCalendarCell(32)); // 32 is a magic number
    cy.expectTextOf(datepickerCalendarCell(32), '23'); // which represents July 23, 2020, cell focused by default

    cy.waitForSelectorAndPressKey(datepickerCalendar, '{home}');
    cy.isFocused(datepickerCalendarCell(29)); // 29 is a magic number
    cy.expectTextOf(datepickerCalendarCell(29), '20'); // which represents July 20, 2020, first cell in the same grid row

    cy.waitForSelectorAndPressKey(datepickerCalendar, '{end}');
    cy.isFocused(datepickerCalendarCell(35)); // 35 is a magic number
    cy.expectTextOf(datepickerCalendarCell(35), '26'); // which represents July 26, 2020, last cell in the same grid row

    cy.waitForSelectorAndPressKey(datepickerCalendar, '{pageup}');
    cy.isFocused(datepickerCalendarCell(14)); // 14 is a magic number
    cy.expectTextOf(datepickerCalendarCell(14), '5'); // which represents July 5, 2020, first cell in the same grid column

    cy.waitForSelectorAndPressKey(datepickerCalendar, '{pagedown}');
    cy.isFocused(datepickerCalendarCell(42)); // 42 is a magic number
    cy.expectTextOf(datepickerCalendarCell(42), '2'); // which represents August 2, 2020, last cell in the same grid column

    cy.waitForSelectorAndPressKey(datepickerCalendar, '{home}', 'Control');
    cy.isFocused(datepickerCalendarCell(8)); // 8 is a magic number
    cy.expectTextOf(datepickerCalendarCell(8), '29'); // which represents June 29, 2020, first cell in the grid

    cy.waitForSelectorAndPressKey(datepickerCalendar, '{end}', 'Control');
    cy.isFocused(datepickerCalendarCell(42)); // 42 is a magic number
    cy.expectTextOf(datepickerCalendarCell(42), '2'); // which represents August 2, 2020, last cell in the grid
  });

  it('Type in input works', () => {
    cy.get(datepickerInput)
      .focus()
      .clear()
      .should('have.value', '')
      .type('August 2')
      .should('have.value', 'August 2, 2001');

    cy.clickOn(datepickerButton);
    cy.visible(datepickerCalendar);
    cy.isFocused(datepickerCalendarCell(11));
  });
});

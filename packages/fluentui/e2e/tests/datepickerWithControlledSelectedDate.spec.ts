describe('Datepicker with controlled selected date', () => {
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

  const datepickerInput = `.ui-input__input`;
  const ButtonControlsSelectedDate = `.ui-button.select-next-day`;

  const datepickerCalendarCell = index => {
    const row = Math.floor((index - 1) / 7);
    const col = index - row * 7;
    return `.${selectors.CalendarGridRowClassName}:nth-child(${row})
              >.${selectors.CellClassName}:nth-child(${col})
              >.${selectors.CellButtonClassName}`;
  };

  const STARTING_DAY = {
    inputValue: 'July 23, 2020',
    date: '23',
    cellNumberInCalendar: 32, // July 23, 2020 is the 32nd cell in calendar
  };
  const NEXT_DAY = {
    inputValue: 'July 24, 2020',
    date: '24',
    cellNumberInCalendar: 33,
  };

  const expectSelectDateIsFocusedOnCalendarOpen = ({ date, cellNumberInCalendar }) => {
    cy.focusOn(datepickerButton);
    cy.waitForSelectorAndPressKey(datepickerButton, '{enter}'); // open calendar
    cy.visible(datepickerCalendar);

    cy.isFocused(datepickerCalendarCell(cellNumberInCalendar));
    cy.expectTextOf(datepickerCalendarCell(cellNumberInCalendar), date);
  };

  beforeEach(() => {
    cy.gotoTestCase(__filename, datepicker);
  });

  it('Should display default selected date on first render', () => {
    cy.visible(datepickerInput);
    cy.get(datepickerInput).should('have.value', STARTING_DAY.inputValue);
    expectSelectDateIsFocusedOnCalendarOpen(STARTING_DAY);
  });

  it('should change selected date on clicking the "Select the next day" button', () => {
    cy.clickOn(ButtonControlsSelectedDate);
    cy.get(datepickerInput).should('have.value', NEXT_DAY.inputValue);
    expectSelectDateIsFocusedOnCalendarOpen(NEXT_DAY);
  });
});

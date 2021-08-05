describe('table', () => {
  const selectors = {
    buttonClassName: 'ui-button',
    tableHeaderClass: 'ui-table__header',
    row: 'ui-table__row',
    cell: 'ui-table__cell',
    beforeTableId: 'before-table',
    afterTableId: 'after-table',
    moreOptionsButtonId: 'more-options',
    rowOnclickTestId: 'row-onclick',
    buttonInCellOnclickTestId: 'button-in-cell-onlick',
  };

  const tableHeaderClass = `.${selectors.tableHeaderClass}`;
  const buttonBeforeTable = `#${selectors.beforeTableId}`;
  const buttonAfterTable = `#${selectors.afterTableId}`;
  const tableRow = (index: number) => `.${selectors.row}:nth-child(${index + 1})`;
  const tableCell = (rowIndex: number, cellIndex: number) =>
    `.${selectors.row}:nth-child(${rowIndex + 1}) .${selectors.cell}:nth-child(${cellIndex + 1})`;
  const buttonInTheCell = (rowIndex: number, cellIndex: number, buttonIndex: number) =>
    `.${selectors.row}:nth-child(${rowIndex + 1}) .${selectors.cell}:nth-child(${cellIndex + 1}) .${
      selectors.buttonClassName
    }:nth-child(${buttonIndex + 1})`;
  const buttonInCellOnclickTest = `#${selectors.buttonInCellOnclickTestId}`;
  const rowOnclickTestButton = `#${selectors.rowOnclickTestId}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, tableHeaderClass);
    cy.focusOn(buttonBeforeTable);
    cy.waitForSelectorAndPressKey(tableHeaderClass, 'Tab'); // currently focus always land to the first cell in the header
    cy.isFocused(tableCell(0, 0));
  });

  describe('Row navigation', () => {
    it('navigate down and up on the rows', () => {
      cy.waitForSelectorAndPressKey(tableHeaderClass, '{downarrow}'); // arrow down key from the header cell will focus next row
      cy.isFocused(tableRow(1));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{downarrow}'); // arrow down key on the row will focus next row
      cy.isFocused(tableRow(2));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{uparrow}'); // arrow up key on the row will focus previous row
      cy.isFocused(tableRow(1));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{uparrow}'); // if focus goes from row to the header row then it goes to the firt cell in the header
      cy.isFocused(tableCell(0, 0));
    });

    it('navigate to the row from the cell', () => {
      cy.waitForSelectorAndPressKey(tableHeaderClass, '{downarrow}'); // arrow down key from the header cell will focus next row
      cy.isFocused(tableRow(1));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}'); //  arrow right key on the row will focus first cell in the row
      cy.isFocused(tableCell(1, 0));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{downarrow}'); // arrow down key on the cell will focus next row
      cy.isFocused(tableRow(2));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}'); //  arrow right key on the row will focus first cell in the row
      cy.isFocused(tableCell(2, 0));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{downarrow}'); // arrow down key on the cell will focus next row
      cy.isFocused(tableRow(3));
    });
  });

  describe('cell navigation', () => {
    it('in the header', () => {
      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.isFocused(tableCell(0, 1));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.isFocused(tableCell(0, 2));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.isFocused(tableCell(0, 3));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{leftarrow}');
      cy.isFocused(tableCell(0, 2));
    });

    it('in the row', () => {
      cy.waitForSelectorAndPressKey(tableHeaderClass, '{downarrow}');
      cy.isFocused(tableRow(1));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.isFocused(tableCell(1, 0));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.isFocused(tableCell(1, 1));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.isFocused(tableCell(1, 2));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.isFocused(tableCell(1, 3));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.isFocused(tableCell(1, 4));

      // Enter doesn't work properly for now. It can be hotfixed by Space
      // However, a few place are handled manually and Enter would work
      // For that reason it is replaced by NumpadEnter, which is equal to the classic enter, but it won't be replaced with Space
      // https://github.com/dmtrKovalenko/cypress-real-events/issues/8
      cy.waitForSelectorAndPressKey(tableHeaderClass, 'NumpadEnter');
      cy.isFocused(buttonInTheCell(1, 4, 0));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.isFocused(buttonInTheCell(1, 4, 1));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{esc}');
      cy.isFocused(tableCell(1, 4));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.isFocused(buttonInTheCell(1, 5, 0));
    });
  });

  describe('tab navigation', () => {
    it('tab away from row and shift+tab back to the table', () => {
      cy.waitForSelectorAndPressKey(tableHeaderClass, '{downarrow}');
      cy.isFocused(tableRow(1));

      cy.waitForSelectorAndPressKey(tableHeaderClass, 'Tab');
      cy.focusOn(buttonAfterTable);

      cy.waitForSelectorAndPressKey(tableHeaderClass, 'Tab', 'Shift');
      cy.isFocused(tableCell(0, 0));
    });

    it('tab away from header cell and shift+tab back to the table', () => {
      cy.waitForSelectorAndPressKey(tableHeaderClass, 'Tab');
      cy.focusOn(buttonAfterTable);

      cy.waitForSelectorAndPressKey(tableHeaderClass, 'Tab', 'Shift');
      cy.isFocused(tableCell(0, 0));
    });

    it('tab away from table cell and shift+tab back to the table', () => {
      cy.waitForSelectorAndPressKey(tableHeaderClass, '{downarrow}');
      cy.isFocused(tableRow(1));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.isFocused(tableCell(1, 0));

      cy.waitForSelectorAndPressKey(tableHeaderClass, 'Tab');
      cy.focusOn(buttonAfterTable);

      cy.waitForSelectorAndPressKey(tableHeaderClass, 'Tab', 'Shift');
      cy.isFocused(tableCell(0, 0));
    });
  });

  describe('onclick handling by keyboard', () => {
    it('when enter key was pressed on the row', () => {
      cy.waitForSelectorAndPressKey(tableHeaderClass, '{downarrow}');
      cy.isFocused(tableRow(1));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{enter}');
      cy.isFocused(rowOnclickTestButton);
    });

    it('when enter key was pressed on the button in the cell', () => {
      cy.waitForSelectorAndPressKey(tableHeaderClass, '{downarrow}');
      cy.isFocused(tableRow(1));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.waitForSelectorAndPressKey(tableHeaderClass, '{rightarrow}');
      cy.isFocused(buttonInTheCell(1, 5, 0));

      cy.waitForSelectorAndPressKey(tableHeaderClass, '{enter}');
      cy.isFocused(buttonInCellOnclickTest);
    });
  });
});

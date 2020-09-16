import { selectors } from './tableNavigable-example';

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

describe('Table', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, tableHeaderClass);
    await e2e.focusOn(buttonBeforeTable);
    await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'Tab'); // currently focus always land to the first cell in the header
    await e2e.isFocused(tableCell(0, 0));
  });

  describe('Row navigation', () => {
    it('navigate down and up on the rows', async () => {
      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowDown'); // arrow down key from the header cell will focus next row
      await e2e.isFocused(tableRow(1));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowDown'); // arrow down key on the row will focus next row
      await e2e.isFocused(tableRow(2));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowUp'); // arrow up key on the row will focus previous row
      await e2e.isFocused(tableRow(1));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowUp'); // if focus goes from row to the header row then it goes to the firt cell in the header
      await e2e.isFocused(tableCell(0, 0));
    });

    it('navigate to the row from the cell', async () => {
      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowDown'); // arrow down key from the header cell will focus next row
      await e2e.isFocused(tableRow(1));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight'); //  arrow right key on the row will focus first cell in the row
      await e2e.isFocused(tableCell(1, 0));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowDown'); // arrow down key on the cell will focus next row
      await e2e.isFocused(tableRow(2));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight'); //  arrow right key on the row will focus first cell in the row
      await e2e.isFocused(tableCell(2, 0));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowDown'); // arrow down key on the cell will focus next row
      await e2e.isFocused(tableRow(3));
    });
  });

  describe('cell navigation', () => {
    it('in the header', async () => {
      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.isFocused(tableCell(0, 1));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.isFocused(tableCell(0, 2));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.isFocused(tableCell(0, 3));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowLeft');
      await e2e.isFocused(tableCell(0, 2));
    });

    it('in the row', async () => {
      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowDown');
      await e2e.isFocused(tableRow(1));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.isFocused(tableCell(1, 0));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.isFocused(tableCell(1, 1));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.isFocused(tableCell(1, 2));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.isFocused(tableCell(1, 3));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.isFocused(tableCell(1, 4));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'Enter');
      await e2e.isFocused(buttonInTheCell(1, 4, 0));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.isFocused(buttonInTheCell(1, 4, 1));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'Escape');
      await e2e.isFocused(tableCell(1, 4));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.isFocused(buttonInTheCell(1, 5, 0));
    });
  });

  describe('tab navigation', () => {
    it('tab away from row and shift+tab back to the table', async () => {
      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowDown');
      await e2e.isFocused(tableRow(1));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'Tab');
      await e2e.focusOn(buttonAfterTable);

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'Tab', 'Shift');
      await e2e.isFocused(tableCell(0, 0));
    });

    it('tab away from header cell and shift+tab back to the table', async () => {
      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'Tab');
      await e2e.focusOn(buttonAfterTable);

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'Tab', 'Shift');
      await e2e.isFocused(tableCell(0, 0));
    });

    it('tab away from table cell and shift+tab back to the table', async () => {
      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowDown');
      await e2e.isFocused(tableRow(1));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.isFocused(tableCell(1, 0));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'Tab');
      await e2e.focusOn(buttonAfterTable);

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'Tab', 'Shift');
      await e2e.isFocused(tableCell(0, 0));
    });
  });

  describe('onclick handling by keyboard', () => {
    it('when enter key was pressed on the row', async () => {
      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowDown');
      await e2e.isFocused(tableRow(1));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'Enter');
      await e2e.isFocused(rowOnclickTestButton);
    });

    it('when enter key was pressed on the button in the cell', async () => {
      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowDown');
      await e2e.isFocused(tableRow(1));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'ArrowRight');
      await e2e.isFocused(buttonInTheCell(1, 5, 0));

      await e2e.waitForSelectorAndPressKey(tableHeaderClass, 'Enter');
      await e2e.isFocused(buttonInCellOnclickTest);
    });
  });
});

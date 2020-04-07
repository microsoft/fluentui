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
    await e2e.pressKey('Tab'); // currently focus always land to the first cell in the header
    expect(await e2e.isFocused(tableCell(0, 0))).toBe(true);
  });

  describe('Row navigation', () => {
    it('navigate down and up on the rows', async () => {
      await e2e.pressKey('ArrowDown'); // arrow down key from the header cell will focus next row
      expect(await e2e.isFocused(tableRow(1))).toBe(true);

      await e2e.pressKey('ArrowDown'); // arrow down key on the row will focus next row
      expect(await e2e.isFocused(tableRow(2))).toBe(true);

      await e2e.pressKey('ArrowUp'); // arrow up key on the row will focus previous row
      expect(await e2e.isFocused(tableRow(1))).toBe(true);

      await e2e.pressKey('ArrowUp'); // if focus goes from row to the header row then it goes to the firt cell in the header
      expect(await e2e.isFocused(tableCell(0, 0))).toBe(true);
    });

    it('navigate to the row from the cell', async () => {
      await e2e.pressKey('ArrowDown'); // arrow down key from the header cell will focus next row
      expect(await e2e.isFocused(tableRow(1))).toBe(true);

      await e2e.pressKey('ArrowRight'); //  arrow right key on the row will focus first cell in the row
      expect(await e2e.isFocused(tableCell(1, 0))).toBe(true);

      await e2e.pressKey('ArrowDown'); // arrow down key on the cell will focus next row
      expect(await e2e.isFocused(tableRow(2))).toBe(true);

      await e2e.pressKey('ArrowRight'); //  arrow right key on the row will focus first cell in the row
      expect(await e2e.isFocused(tableCell(2, 0))).toBe(true);

      await e2e.pressKey('ArrowDown'); // arrow down key on the cell will focus next row
      expect(await e2e.isFocused(tableRow(3))).toBe(true);
    });
  });

  describe('cell navigation', () => {
    it('in the header', async () => {
      await e2e.pressKey('ArrowRight');
      expect(await e2e.isFocused(tableCell(0, 1))).toBe(true);

      await e2e.pressKey('ArrowRight');
      expect(await e2e.isFocused(tableCell(0, 2))).toBe(true);

      await e2e.pressKey('ArrowRight');
      expect(await e2e.isFocused(tableCell(0, 3))).toBe(true);

      await e2e.pressKey('ArrowLeft');
      expect(await e2e.isFocused(tableCell(0, 2))).toBe(true);
    });

    it('in the row', async () => {
      await e2e.pressKey('ArrowDown');
      expect(await e2e.isFocused(tableRow(1))).toBe(true);

      await e2e.pressKey('ArrowRight');
      expect(await e2e.isFocused(tableCell(1, 0))).toBe(true);

      await e2e.pressKey('ArrowRight');
      expect(await e2e.isFocused(tableCell(1, 1))).toBe(true);

      await e2e.pressKey('ArrowRight');
      expect(await e2e.isFocused(tableCell(1, 2))).toBe(true);

      await e2e.pressKey('ArrowRight');
      expect(await e2e.isFocused(tableCell(1, 3))).toBe(true);

      await e2e.pressKey('ArrowRight');
      expect(await e2e.isFocused(tableCell(1, 4))).toBe(true);

      await e2e.pressKey('Enter');
      expect(await e2e.isFocused(buttonInTheCell(1, 4, 0))).toBe(true);

      await e2e.pressKey('ArrowRight');
      expect(await e2e.isFocused(buttonInTheCell(1, 4, 1))).toBe(true);

      await e2e.pressKey('Escape');
      expect(await e2e.isFocused(tableCell(1, 4))).toBe(true);

      await e2e.pressKey('ArrowRight');
      expect(await e2e.isFocused(buttonInTheCell(1, 5, 0))).toBe(true);
    });
  });

  describe('tab navigation', () => {
    it('tab away from row and shift+tab back to the table', async () => {
      await e2e.pressKey('ArrowDown');
      expect(await e2e.isFocused(tableRow(1))).toBe(true);

      await e2e.pressKey('Tab');
      await e2e.focusOn(buttonAfterTable);

      await e2e.pressKey('Tab', 'Shift');
      expect(await e2e.isFocused(tableCell(0, 0))).toBe(true);
    });

    it('tab away from header cell and shift+tab back to the table', async () => {
      await e2e.pressKey('Tab');
      await e2e.focusOn(buttonAfterTable);

      await e2e.pressKey('Tab', 'Shift');
      expect(await e2e.isFocused(tableCell(0, 0))).toBe(true);
    });

    it('tab away from table cell and shift+tab back to the table', async () => {
      await e2e.pressKey('ArrowDown');
      expect(await e2e.isFocused(tableRow(1))).toBe(true);

      await e2e.pressKey('ArrowRight');
      expect(await e2e.isFocused(tableCell(1, 0))).toBe(true);

      await e2e.pressKey('Tab');
      await e2e.focusOn(buttonAfterTable);

      await e2e.pressKey('Tab', 'Shift');
      expect(await e2e.isFocused(tableCell(0, 0))).toBe(true);
    });
  });

  describe('onclick handling by keyboard', () => {
    it('when enter key was pressed on the row', async () => {
      await e2e.pressKey('ArrowDown');
      expect(await e2e.isFocused(tableRow(1))).toBe(true);

      await e2e.pressKey('Enter');
      expect(await e2e.isFocused(rowOnclickTestButton)).toBe(true);
    });

    it('when enter key was pressed on the button in the cell', async () => {
      await e2e.pressKey('ArrowDown');
      expect(await e2e.isFocused(tableRow(1))).toBe(true);

      await e2e.pressKey('ArrowRight');
      await e2e.pressKey('ArrowRight');
      await e2e.pressKey('ArrowRight');
      await e2e.pressKey('ArrowRight');
      await e2e.pressKey('ArrowRight');
      await e2e.pressKey('ArrowRight');
      expect(await e2e.isFocused(buttonInTheCell(1, 5, 0))).toBe(true);

      await e2e.pressKey('Enter');
      expect(await e2e.isFocused(buttonInCellOnclickTest)).toBe(true);
    });
  });
});

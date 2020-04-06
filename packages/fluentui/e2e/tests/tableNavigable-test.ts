import { selectors } from './tableNavigable-example';

const tableHeaderClass = `.${selectors.tableHeaderClass}`;
const buttonBeforeTable = `#${selectors.beforeTableId}`;
//const buttonAfterTable = `#${selectors.afterTableId}`;
const tableRow = (index: number) => `.${selectors.row}:nth-child(${index + 1})`;
const tableCell = (rowIndex: number, cellIndex: number) =>
  `.${selectors.row}:nth-child(${rowIndex + 1}) .${selectors.cell}:nth-child(${cellIndex + 1})`;
const buttonInTheCell = (rowIndex: number, cellIndex: number, buttonIndex: number) =>
  `.${selectors.row}:nth-child(${rowIndex + 1}) .${selectors.cell}:nth-child(${cellIndex + 1}) .${
    selectors.buttonClassName
  }:nth-child(${buttonIndex + 1})`;

describe('Table', () => {
  describe('Row navigation', () => {
    beforeEach(async () => {
      await e2e.gotoTestCase(__filename, tableHeaderClass);
    });

    it('navigate down and up on the rows', async () => {
      await e2e.focusOn(buttonBeforeTable);

      await e2e.pressKey('Tab');
      expect(await e2e.isFocused(tableCell(0, 0))).toBe(true);

      await e2e.pressKey('ArrowDown');
      expect(await e2e.isFocused(tableRow(1))).toBe(true);

      await e2e.pressKey('ArrowDown');
      expect(await e2e.isFocused(tableRow(2))).toBe(true);

      await e2e.pressKey('ArrowUp');
      expect(await e2e.isFocused(tableRow(1))).toBe(true);

      await e2e.pressKey('ArrowUp');
      expect(await e2e.isFocused(tableCell(0, 0))).toBe(true);
    });
  });

  describe('cell navigation', () => {
    beforeEach(async () => {
      await e2e.gotoTestCase(__filename, tableHeaderClass);
      await e2e.focusOn(buttonBeforeTable);
      await e2e.pressKey('Tab');
      expect(await e2e.isFocused(tableCell(0, 0))).toBe(true);
    });

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
});

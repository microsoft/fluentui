import { tableRowBehavior } from '@fluentui/accessibility';

describe('tableRowBehavior.ts', () => {
  test('use tableHeaderCellBehavior if table row has header prop defined', () => {
    const props = {
      header: true,
    };
    const expectedResult = tableRowBehavior(props);
    expect(expectedResult.childBehaviors.cell.name).toEqual('tableHeaderCellBehavior');
  });

  test('use tableCellBehavior if table row has NOT header prop defined', () => {
    const props = {};
    const expectedResult = tableRowBehavior(props);
    expect(expectedResult.childBehaviors.cell.name).toEqual('tableCellBehavior');
  });
});

import { gridRowBehavior } from '@fluentui/accessibility';

describe('gridRowBehavior.ts', () => {
  test('use gridHeaderRowBehavior if grid row has header prop defined', () => {
    const props = {
      header: true,
    };
    const expectedResult = gridRowBehavior(props);
    expect(expectedResult.childBehaviors.cell.name).toEqual('gridHeaderCellBehavior');
  });

  test('use gridRowNestedBehavior if grid row has NOT header prop defined', () => {
    const props = {};
    const expectedResult = gridRowBehavior(props);
    expect(expectedResult.childBehaviors.cell.name).toEqual('gridCellBehavior');
  });
});

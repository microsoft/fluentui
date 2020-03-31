import { gridRowBehavior } from '@fluentui/accessibility';

describe('gridRowBehavior.ts', () => {
  test('use gridHeaderRowBehavior if grid row has header prop defined', () => {
    const props = {
      header: true,
    };
    const expectedResult = gridRowBehavior(props);
    expect(expectedResult.childBehaviors.cell.name).toEqual('gridHeaderCellBehavior');
  });

  test('return aria-selected correctly depending on prop.selected', () => {
    const props = {
      selected: true,
    };
    const expectedResultSelected = gridRowBehavior(props);
    expect(expectedResultSelected.attributes.root['aria-selected']).toBeTruthy();
    props.selected = false;
    const expectedResultNotSelected = gridRowBehavior(props);
    expect(expectedResultNotSelected.attributes.root['aria-selected']).toBeFalsy();
  });

  test('use gridRowNestedBehavior if grid row has NOT header prop defined', () => {
    const props = {};
    const expectedResult = gridRowBehavior(props);
    expect(expectedResult.childBehaviors.cell.name).toEqual('gridCellBehavior');
  });
});

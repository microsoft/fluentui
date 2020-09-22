import { treeItemAsOptionBehavior } from '@fluentui/accessibility';

describe('treeItemAsOptionBehavior', () => {
  describe('role', () => {
    test(`is 'option'`, () => {
      const expectedResult = treeItemAsOptionBehavior({});
      expect(expectedResult.attributes.root.role).toEqual('option');
    });
  });

  describe('aria-selected', () => {
    test(`is added with 'true' value to an item is selectable and selected`, () => {
      const expectedResult = treeItemAsOptionBehavior({ selectable: true, selected: true });
      expect(expectedResult.attributes.root['aria-selected']).toEqual(true);
    });

    test(`is added with 'false' value to an item is selectable and not selected`, () => {
      const expectedResult = treeItemAsOptionBehavior({ selectable: true });
      expect(expectedResult.attributes.root['aria-selected']).toEqual(false);
    });

    test(`is not added to an item that is not selectable `, () => {
      const expectedResult = treeItemAsOptionBehavior({});
      expect(expectedResult.attributes.root['aria-selected']).toBeUndefined();
    });
  });
});

import { treeTitleAsOptionBehavior } from '@fluentui/accessibility';

describe('TreeTitleBehavior', () => {
  describe('role', () => {
    test(`is added with 'option' value`, () => {
      const expectedResult = treeTitleAsOptionBehavior({});
      expect(expectedResult.attributes.root.role).toEqual('option');
    });
  });

  describe('aria-selected', () => {
    test(`is added with 'selected' prop value to a title when tree title is 'selectable'`, () => {
      const expectedResultWhenSelected = treeTitleAsOptionBehavior({
        selectable: true,
        selected: true,
      });
      const expectedResultWhenNotSelected = treeTitleAsOptionBehavior({
        selectable: true,
        selected: false,
      });
      expect(expectedResultWhenSelected.attributes.root['aria-selected']).toEqual(true);
      expect(expectedResultWhenNotSelected.attributes.root['aria-selected']).toEqual(false);
    });

    test(`is not added to a title, when tree title is NOT 'selectable'`, () => {
      const expectedResult = treeTitleAsOptionBehavior({ selectable: false });
      expect(expectedResult.attributes.root['aria-selected']).toBeUndefined();
    });
  });
});

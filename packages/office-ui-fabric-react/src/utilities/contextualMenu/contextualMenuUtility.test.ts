import { getIsChecked, hasSubmenu } from './contextualMenuUtility';
import { IContextualMenuItem } from '../../index';

describe('getIsChecked', () => {
  describe('when item can be checked', () => {
    let menuItem: IContextualMenuItem;

    beforeEach(() => {
      menuItem = { key: '123', canCheck: true };
    });

    it('returns true when isChecked', () => {
      menuItem.isChecked = true;
      expect(getIsChecked(menuItem)).toBe(true);
    });

    it('returns true when checked', () => {
      menuItem.checked = true;
      expect(getIsChecked(menuItem)).toBe(true);
    });
  });

  describe('when item isChecked', () => {
    let menuItem: IContextualMenuItem;

    beforeEach(() => {
      menuItem = { key: '123', isChecked: true };
    });

    it('returns true', () => {
      expect(getIsChecked(menuItem)).toBe(true);
    });
  });

  describe('when item checked flag is true', () => {
    let menuItem: IContextualMenuItem;

    beforeEach(() => {
      menuItem = { key: '123', checked: true };
    });

    it('returns true', () => {
      expect(getIsChecked(menuItem)).toBe(true);
    });
  });

  describe('when it is not checked', () => {
    let menuItem: IContextualMenuItem;

    beforeEach(() => {
      menuItem = { key: '123' };
    });

    it('returns false', () => {
      expect(getIsChecked(menuItem)).toBeFalsy();
    });
  });
});

describe('hasSubmenu', () => {
  describe('when there is a submenu props', () => {
    let menuItem: IContextualMenuItem;

    beforeEach(() => {
      menuItem = { key: '123', subMenuProps: { items: [] } };
    });

    it('returns true', () => {
      expect(hasSubmenu(menuItem)).toBe(true);
    });
  });

  describe('when there are items', () => {
    let menuItem: IContextualMenuItem;

    beforeEach(() => {
      menuItem = { key: '123', items: [] };
    });

    it('returns true', () => {
      expect(hasSubmenu(menuItem)).toBe(true);
    });
  });

  describe('when there are no submenu items', () => {
    let menuItem: IContextualMenuItem;

    beforeEach(() => {
      menuItem = { key: '123' };
    });

    it('returns false', () => {
      expect(hasSubmenu(menuItem)).toBe(false);
    });
  });
});

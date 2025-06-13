jest.mock('../../utilities/contextualMenu');

import '@testing-library/jest-dom';
import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ContextualMenuItemBase } from './ContextualMenuItem.base';
import { hasSubmenu } from '../../utilities/contextualMenu/index';
import type { IContextualMenuItemProps } from './ContextualMenuItem.types';
import type { IContextualMenuItem } from './ContextualMenu.types';
import type { IMenuItemClassNames } from './ContextualMenu.classNames';
import { registerIcons } from '../../Styling';

/**
 * Helper function to render a ContextualMenuItemBase with testing-library
 */
function renderContextualMenuItem(props: IContextualMenuItemProps) {
  return render(<ContextualMenuItemBase {...props} />);
}

/**
 * Helper function to get the menu item container
 */
function getMenuItemContainer(container: HTMLElement) {
  return container.querySelector('.linkContent') as HTMLElement;
}

/**
 * Helper function to get the checkmark icon
 */
function getCheckmarkIcon(container: HTMLElement) {
  return container.querySelector('.checkmarkIcon') as HTMLElement;
}

/**
 * Helper function to get the icon
 */
function getIcon(container: HTMLElement) {
  return container.querySelector('.icon') as HTMLElement;
}

/**
 * Helper function to get the submenu icon
 */
function getSubmenuIcon(container: HTMLElement) {
  return container.querySelector('.subMenuIcon') as HTMLElement;
}

describe('ContextMenuItemChildren', () => {
  describe('when a checkmark icon', () => {
    let onCheckmarkClick: jest.Mock;
    let menuItem: IContextualMenuItem;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    let menuClassNames: IMenuItemClassNames;
    let container: HTMLElement;

    beforeEach(() => {
      menuItem = { key: '123' };
      menuClassNames = getMenuItemClassNames();
      onCheckmarkClick = jest.fn();

      const result = renderContextualMenuItem({
        item: menuItem,
        classNames: menuClassNames,
        index: 1,
        hasIcons: undefined,
        onCheckmarkClick,
      });

      container = result.container;
    });

    it('renders the component with the checkmark', () => {
      expect(getMenuItemContainer(container)).toMatchSnapshot();
      expect(getMenuItemContainer(container)).toBeInTheDocument();
    });

    describe('when the checkmark is clicked', () => {
      it('invokes the onCheckmarkClick callback', () => {
        fireEvent.click(getCheckmarkIcon(container));

        expect(onCheckmarkClick).toHaveBeenCalledTimes(1);
        expect(onCheckmarkClick.mock.calls[0][0]).toEqual(menuItem);
      });
    });
  });

  describe('when hide checkmark icon for toggle command', () => {
    let onCheckmarkClick: jest.Mock;
    let menuItem: IContextualMenuItem;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    let menuClassNames: IMenuItemClassNames;
    let container: HTMLElement;

    beforeEach(() => {
      menuItem = { key: '123', canCheck: false };
      menuClassNames = getMenuItemClassNames();
      onCheckmarkClick = jest.fn();

      const result = renderContextualMenuItem({
        item: menuItem,
        classNames: menuClassNames,
        index: 1,
        hasIcons: undefined,
        onCheckmarkClick,
      });

      container = result.container;
    });

    it('renders the component with the checkmark', () => {
      expect(container).toMatchSnapshot();
      expect(getMenuItemContainer(container)).toBeInTheDocument();
    });

    describe('when the checkmark is clicked', () => {
      beforeEach(() => {
        fireEvent.click(getCheckmarkIcon(container));
      });

      it('invokes the onCheckmarkClick callback', () => {
        expect(onCheckmarkClick).toHaveBeenCalledTimes(1);
        expect(onCheckmarkClick.mock.calls[0][0]).toEqual(menuItem);
      });

      it('should not show checkmark', () => {
        const checkmark = getCheckmarkIcon(container);

        expect(checkmark).toBeInTheDocument();
        // The canCheck: false just means it shouldn't have a visible checkmark, not that the element isn't there
        expect(checkmark.getAttribute('data-icon-name')).toBeFalsy();
      });
    });
  });

  describe('when it has icons', () => {
    describe('when it has iconProps', () => {
      let menuItem: IContextualMenuItem;
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      let menuClassNames: IMenuItemClassNames;
      let container: HTMLElement;
      registerIcons({ icons: { itemIcon: 'itemIcon' } });

      beforeEach(() => {
        menuItem = { key: '123', iconProps: { iconName: 'itemIcon' }, text: 'menuItem' };
        menuClassNames = getMenuItemClassNames();

        const result = renderContextualMenuItem({
          item: menuItem,
          classNames: menuClassNames,
          index: 1,
          hasIcons: true,
        });

        container = result.container;
      });

      it('renders the icon', () => {
        expect(container).toMatchSnapshot();
        const icon = getIcon(container);
        expect(icon).toBeInTheDocument();
      });
    });

    describe('when it doesnt have iconProps', () => {
      let menuItem: IContextualMenuItem;
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      let menuClassNames: IMenuItemClassNames;
      let container: HTMLElement;

      beforeEach(() => {
        menuItem = { key: '123', iconProps: {} };
        menuClassNames = getMenuItemClassNames();

        const result = renderContextualMenuItem({
          item: menuItem,
          classNames: menuClassNames,
          index: 1,
          hasIcons: true,
        });

        container = result.container;
      });

      it('renders the icon with iconName', () => {
        expect(container).toMatchSnapshot();
        const icon = getIcon(container);
        expect(icon).toBeInTheDocument();
      });
    });
  });

  describe('when it has a sub menu', () => {
    let menuItem: IContextualMenuItem;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    let menuClassNames: IMenuItemClassNames;
    let container: HTMLElement;

    beforeEach(() => {
      (hasSubmenu as jest.Mock).mockReturnValue(true);
      menuItem = { key: '123', iconProps: {}, submenuIconProps: {} };
      menuClassNames = getMenuItemClassNames();

      const result = renderContextualMenuItem({
        item: menuItem,
        classNames: menuClassNames,
        index: 1,
        hasIcons: true,
      });

      container = result.container;
    });

    it('renders the menu icon', () => {
      expect(container).toMatchSnapshot();
      const submenuIcon = getSubmenuIcon(container);
      expect(submenuIcon).toBeInTheDocument();
    });
  });
});

// eslint-disable-next-line @typescript-eslint/no-deprecated
function getMenuItemClassNames(): IMenuItemClassNames {
  return {
    item: 'item',
    divider: '---',
    root: 'root',
    linkContent: 'linkContent',
    icon: 'icon',
    checkmarkIcon: 'checkmarkIcon',
    subMenuIcon: 'subMenuIcon',
    label: 'label',
    secondaryText: 'secondaryText',
    splitContainer: 'splitContainer',
    splitPrimary: 'splitPrimary',
    splitMenu: 'splitMenu',
    linkContentMenu: 'linkContentMenu',
    screenReaderText: 'screenReaderText',
  };
}

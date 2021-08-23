jest.mock('../../utilities/contextualMenu');

import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ContextualMenuItemBase } from './ContextualMenuItem.base';
import { hasSubmenu } from '../../utilities/contextualMenu/index';
import type { IContextualMenuItemProps } from './ContextualMenuItem.types';
import type { IContextualMenuItem } from './ContextualMenu.types';
import type { IMenuItemClassNames } from './ContextualMenu.classNames';

describe('ContextMenuItemChildren', () => {
  describe('when a checkmark icon', () => {
    let onCheckmarkClick: jest.Mock;
    let menuItem: IContextualMenuItem;
    // eslint-disable-next-line deprecation/deprecation
    let menuClassNames: IMenuItemClassNames;
    let wrapper: ShallowWrapper<IContextualMenuItemProps, {}>;

    beforeEach(() => {
      menuItem = { key: '123' };
      menuClassNames = getMenuItemClassNames();
      onCheckmarkClick = jest.fn();

      wrapper = shallow(
        <ContextualMenuItemBase
          item={menuItem}
          classNames={menuClassNames}
          index={1}
          hasIcons={undefined}
          onCheckmarkClick={onCheckmarkClick}
        />,
      );
    });

    it('renders the component with the checkmark', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('when the checkmark is clicked', () => {
      let event: jest.Mock;
      beforeEach(() => {
        event = jest.fn();
        wrapper.find('.checkmarkIcon').simulate('click', event);
      });

      it('invokes the onCheckmarkClick callback', () => {
        expect(onCheckmarkClick).toHaveBeenCalledWith(menuItem, event);
      });
    });
  });

  describe('when hide checkmark icon for toggle command', () => {
    let onCheckmarkClick: jest.Mock;
    let menuItem: IContextualMenuItem;
    // eslint-disable-next-line deprecation/deprecation
    let menuClassNames: IMenuItemClassNames;
    let wrapper: ShallowWrapper<IContextualMenuItemProps, {}>;

    beforeEach(() => {
      menuItem = { key: '123', canCheck: false };
      menuClassNames = getMenuItemClassNames();
      onCheckmarkClick = jest.fn();

      wrapper = shallow(
        <ContextualMenuItemBase
          item={menuItem}
          classNames={menuClassNames}
          index={1}
          hasIcons={undefined}
          onCheckmarkClick={onCheckmarkClick}
        />,
      );
    });

    it('renders the component with the checkmark', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('when the checkmark is clicked', () => {
      let event: jest.Mock;
      beforeEach(() => {
        event = jest.fn();
        wrapper.find('.checkmarkIcon').simulate('click', event);
      });

      it('invokes the onCheckmarkClick callback', () => {
        expect(onCheckmarkClick).toHaveBeenCalledWith(menuItem, event);
      });

      it('should not show checkmark', () => {
        expect(wrapper.find('.ms-ContextualMenu-checkmarkIcon').length).toEqual(0);
      });
    });
  });

  describe('when it has icons', () => {
    describe('when it has iconProps', () => {
      let menuItem: IContextualMenuItem;
      // eslint-disable-next-line deprecation/deprecation
      let menuClassNames: IMenuItemClassNames;
      let wrapper: ShallowWrapper<IContextualMenuItemProps, {}>;

      beforeEach(() => {
        menuItem = { key: '123', iconProps: { iconName: 'itemIcon' }, text: 'menuItem' };
        menuClassNames = getMenuItemClassNames();

        wrapper = shallow(
          <ContextualMenuItemBase item={menuItem} classNames={menuClassNames} index={1} hasIcons={true} />,
        );
      });

      it('renders the icon', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when it doesnt have iconProps', () => {
      let menuItem: IContextualMenuItem;
      // eslint-disable-next-line deprecation/deprecation
      let menuClassNames: IMenuItemClassNames;
      let wrapper: ShallowWrapper<IContextualMenuItemProps, {}>;

      beforeEach(() => {
        menuItem = { key: '123', iconProps: {} };
        menuClassNames = getMenuItemClassNames();

        wrapper = shallow(
          <ContextualMenuItemBase item={menuItem} classNames={menuClassNames} index={1} hasIcons={true} />,
        );
      });

      it('renders the icon with iconName', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('when it has a sub menu', () => {
    let menuItem: IContextualMenuItem;
    // eslint-disable-next-line deprecation/deprecation
    let menuClassNames: IMenuItemClassNames;
    let wrapper: ShallowWrapper<IContextualMenuItemProps, {}>;

    beforeEach(() => {
      (hasSubmenu as jest.Mock).mockReturnValue(true);
      menuItem = { key: '123', iconProps: {}, submenuIconProps: {} };
      menuClassNames = getMenuItemClassNames();

      wrapper = shallow(
        <ContextualMenuItemBase item={menuItem} classNames={menuClassNames} index={1} hasIcons={true} />,
      );
    });

    it('renders the menu icon', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

// eslint-disable-next-line deprecation/deprecation
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

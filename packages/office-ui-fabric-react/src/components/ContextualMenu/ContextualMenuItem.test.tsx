jest.mock('../../utilities/contextualMenu');

import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ContextualMenuItemBase } from './ContextualMenuItem.base';
import { IContextualMenuItemProps } from './ContextualMenuItem.types';
import { IContextualMenuItem } from './ContextualMenu.types';
import { IMenuItemClassNames, getItemClassNames } from './ContextualMenu.classNames';
import { hasSubmenu } from '../../utilities/contextualMenu/index';
import { createTheme } from '../../Styling';

describe('ContextMenuItemChildren', () => {
  describe('when a checkmark icon', () => {
    let onCheckmarkClick: jest.Mock;
    let menuItem: IContextualMenuItem;
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
        />
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

  describe('when it has icons', () => {
    describe('when it has iconProps', () => {
      let menuItem: IContextualMenuItem;
      let menuClassNames: IMenuItemClassNames;
      let wrapper: ShallowWrapper<IContextualMenuItemProps, {}>;

      beforeEach(() => {
        menuItem = { key: '123', iconProps: { iconName: 'itemIcon' }, text: 'menuItem' };
        menuClassNames = getMenuItemClassNames();

        wrapper = shallow(<ContextualMenuItemBase item={menuItem} classNames={menuClassNames} index={1} hasIcons={true} />);
      });

      it('renders the icon', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when it doesnt have iconProps', () => {
      let menuItem: IContextualMenuItem;
      let menuClassNames: IMenuItemClassNames;
      let wrapper: ShallowWrapper<IContextualMenuItemProps, {}>;

      beforeEach(() => {
        menuItem = { key: '123', iconProps: {} };
        menuClassNames = getMenuItemClassNames();

        wrapper = shallow(<ContextualMenuItemBase item={menuItem} classNames={menuClassNames} index={1} hasIcons={true} />);
      });

      it('renders the icon with iconName', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('when it has a sub menu', () => {
    let menuItem: IContextualMenuItem;
    let menuClassNames: IMenuItemClassNames;
    let wrapper: ShallowWrapper<IContextualMenuItemProps, {}>;

    beforeEach(() => {
      (hasSubmenu as jest.Mock).mockReturnValue(true);
      menuItem = { key: '123', iconProps: {}, submenuIconProps: {} };
      menuClassNames = getMenuItemClassNames();

      wrapper = shallow(<ContextualMenuItemBase item={menuItem} classNames={menuClassNames} index={1} hasIcons={true} />);
    });

    it('renders the menu icon', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('getItemClassNames', () => {
  // This test exists to validate that getItemClassNames signature has not changed
  // to avoid breaking internal partners relying on this private API.
  // See: https://github.com/OfficeDev/office-ui-fabric-react/pull/6738
  it('accepts an argument list of style props values', () => {
    const NoClassNamesTheme = createTheme({ disableGlobalClassNames: true });
    const isDisabled = false;
    const isExpanded = false;
    const isChecked = false;
    const isAnchorLink = false;
    const isKnownIcon = true;
    const dividerClassName = 'dividerFoo';
    const itemClassName = 'foo';
    const iconClassName = 'iconFoo';

    const itemClassNames = getItemClassNames(
      NoClassNamesTheme,
      isDisabled,
      isExpanded,
      isChecked,
      isAnchorLink,
      isKnownIcon,
      itemClassName,
      dividerClassName,
      iconClassName
    );

    expect(itemClassNames).toBeDefined();
  });

  it('applies custom classNames to style slots', () => {
    const NoClassNamesTheme = createTheme({ disableGlobalClassNames: true });
    const isDisabled = false;
    const isExpanded = false;
    const isChecked = false;
    const isAnchorLink = false;
    const isKnownIcon = true;
    const dividerClassName = 'dividerFoo';
    const itemClassName = 'foo';
    const iconClassName = 'iconFoo';

    const itemClassNames = getItemClassNames(
      NoClassNamesTheme,
      isDisabled,
      isExpanded,
      isChecked,
      isAnchorLink,
      isKnownIcon,
      itemClassName,
      dividerClassName,
      iconClassName
    );

    expect(itemClassNames.item).toContain('foo');
    expect(itemClassNames.divider).toContain('dividerFoo');
    expect(itemClassNames.icon).toContain('iconFoo');
  });
});

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
    linkContentMenu: 'linkContentMenu'
  };
}

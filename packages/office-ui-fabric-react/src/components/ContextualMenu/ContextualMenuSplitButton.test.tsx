import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { IContextualMenuItem } from './ContextualMenu.types';
import { IMenuItemClassNames } from './ContextualMenu.classNames';
import { ContextualMenuSplitButton } from './ContextualMenuSplitButton';
import { IContextualMenuSplitButtonProps } from './ContextualMenuSplitButton.types';

describe('ContextualMenuSplitButton', () => {
  describe('creates a normal split button', () => {
    let menuItem: IContextualMenuItem;
    let menuClassNames: IMenuItemClassNames;

    let wrapper: ShallowWrapper<IContextualMenuSplitButtonProps, {}>;
    beforeEach(() => {
      menuItem = { key: '123' };
      menuClassNames = getMenuItemClassNames();
      wrapper = shallow(
        <ContextualMenuSplitButton item={menuItem} classNames={menuClassNames} index={0} focusableElementIndex={0} totalItemCount={1} />
      );
    });

    it('renders the contextual menu split button correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
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
    splitContainer: 'splitContainer',
    splitPrimary: 'splitPrimary',
    splitMenu: 'splitMenu',
    linkContentMenu: 'linkContentMenu'
  };
}

import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { ContextualMenuAnchor } from './ContextualMenuAnchor';
import type { IContextualMenuItem } from '../ContextualMenu.types';
import type { IMenuItemClassNames } from '../ContextualMenu.classNames';

describe('ContextualMenuButton', () => {
  describe('creates a normal button', () => {
    let menuItem: IContextualMenuItem;
    // eslint-disable-next-line deprecation/deprecation
    let menuClassNames: IMenuItemClassNames;

    beforeEach(() => {
      menuItem = { key: '123' };
      menuClassNames = getMenuItemClassNames();
    });

    it('renders the contextual menu split button correctly', () => {
      const component = renderer.create(
        <ContextualMenuAnchor
          item={menuItem}
          classNames={menuClassNames}
          index={0}
          focusableElementIndex={0}
          totalItemCount={1}
        />,
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('invokes optional onItemClick on anchor node "click"', () => {
      const mockEvent = { foo: 'bar' };
      const onClickMock = jest.fn();
      const component = mount(
        <ContextualMenuAnchor
          item={menuItem}
          classNames={menuClassNames}
          index={0}
          focusableElementIndex={0}
          totalItemCount={1}
          hasCheckmarks={true}
          onItemClick={onClickMock}
        />,
      );
      component.find('a').simulate('click', mockEvent);
      expect(onClickMock).toHaveBeenCalledTimes(1);
      expect(onClickMock).toBeCalledWith(menuItem, expect.objectContaining(mockEvent));
    });

    it('invokes optional onItemClick on checkmark node "click"', () => {
      const mockEvent = { foo: 'bar' };
      const onClickMock = jest.fn();
      const component = mount(
        <ContextualMenuAnchor
          item={menuItem}
          classNames={menuClassNames}
          index={0}
          focusableElementIndex={0}
          totalItemCount={1}
          hasCheckmarks={true}
          onItemClick={onClickMock}
        />,
      );

      component.find('.checkmarkIcon').at(0).simulate('click', mockEvent);

      // onItemClick is invoked twice, once for Check and again for ContextualMenuItem.
      // This logic can be cleaned-up using Jest's toHaveNthReturnedWith when available.
      expect(onClickMock).toHaveBeenCalledTimes(2);
      expect(onClickMock.mock.calls[0][0]).toBe(menuItem);
      expect(onClickMock.mock.calls[0][1]).toHaveProperty('foo', 'bar');
      expect(onClickMock.mock.calls[1][0]).toBe(menuItem);
      expect(onClickMock.mock.calls[1][1]).toHaveProperty('foo', 'bar');
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

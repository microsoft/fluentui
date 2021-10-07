import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { ContextualMenuButton } from './ContextualMenuButton';
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
        <ContextualMenuButton
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

    it('invokes optional onItemClick on checkmark node "click"', () => {
      const mockEvent = { foo: 'bar' };
      const onClickMock = jest.fn();
      const component = mount(
        <ContextualMenuButton
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

      expect(onClickMock).toHaveBeenCalledTimes(1);
      expect(onClickMock).toHaveBeenCalledWith(menuItem, expect.objectContaining(mockEvent));
    });

    it('does not update when props values do not change', () => {
      const renderMock = jest.spyOn(ContextualMenuButton.prototype, 'render');
      const props = {
        item: menuItem,
        classNames: menuClassNames,
        index: 0,
        focusableElementIndex: 0,
        totalItemCount: 1,
      };
      const component = mount(<ContextualMenuButton {...props} />);

      component.setProps({ ...props });

      expect(renderMock).toHaveBeenCalledTimes(1);

      renderMock.mockRestore();
    });

    it('does update when props values do change', () => {
      const renderMock = jest.spyOn(ContextualMenuButton.prototype, 'render');
      const props = {
        item: menuItem,
        classNames: menuClassNames,
        index: 0,
        focusableElementIndex: 0,
        totalItemCount: 1,
      };
      const component = mount(<ContextualMenuButton {...props} />);

      component.setProps({ ...props, index: 1 });

      expect(renderMock).toHaveBeenCalledTimes(2);

      renderMock.mockRestore();
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

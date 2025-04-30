import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { getBySelector } from '../../../common/testUtilities';
import { ContextualMenuAnchor } from './ContextualMenuAnchor';
import type { IContextualMenuItem } from '../ContextualMenu.types';
import type { IMenuItemClassNames } from '../ContextualMenu.classNames';

describe('ContextualMenuButton', () => {
  describe('creates a normal button', () => {
    let menuItem: IContextualMenuItem;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
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
      const onClickMock = jest.fn();
      const { container } = render(
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

      const anchorElement = getBySelector(container, 'a') as HTMLAnchorElement;
      fireEvent.click(anchorElement);

      expect(onClickMock).toHaveBeenCalledTimes(1);
      expect(onClickMock.mock.calls[0][0]).toBe(menuItem);
    });

    it('invokes optional onItemClick on checkmark node "click"', () => {
      const onClickMock = jest.fn();
      const { container } = render(
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

      const checkmarkIcon = getBySelector(container, '.checkmarkIcon')!;
      fireEvent.click(checkmarkIcon);

      // onItemClick is invoked twice, once for Check and again for ContextualMenuItem.
      // This logic can be cleaned-up using Jest's toHaveNthReturnedWith when available.
      expect(onClickMock).toHaveBeenCalledTimes(2);
      expect(onClickMock.mock.calls[0][0]).toBe(menuItem);

      expect(onClickMock.mock.calls[1][0]).toBe(menuItem);
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

import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { getBySelector } from '../../../common/testUtilities';
import { ContextualMenuSplitButton } from './ContextualMenuSplitButton';
import type { IContextualMenuItem } from '../ContextualMenu.types';
import type { IMenuItemClassNames } from '../ContextualMenu.classNames';

describe('ContextualMenuSplitButton', () => {
  describe('creates a normal split button', () => {
    let menuItem: IContextualMenuItem;

    let menuClassNames: IMenuItemClassNames;

    beforeEach(() => {
      menuItem = { key: '123' };
      menuClassNames = getMenuItemClassNames();
    });

    it('renders the contextual menu split button correctly', () => {
      const { container } = render(
        <ContextualMenuSplitButton
          item={menuItem}
          classNames={menuClassNames}
          index={0}
          focusableElementIndex={0}
          totalItemCount={1}
        />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('invokes optional onItemClick on checkmark node "click"', () => {
      const onClickMock = jest.fn();
      const { container } = render(
        <ContextualMenuSplitButton
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

      expect(onClickMock).toHaveBeenCalledTimes(1);
      expect(onClickMock.mock.calls[0][0]).toEqual(expect.objectContaining(menuItem));
    });

    it('invokes item.onClick exactly once when splitbutton is clicked', () => {
      const onClickMock = jest.fn();
      const { container } = render(
        <ContextualMenuSplitButton
          item={{ ...menuItem, canCheck: true, onClick: onClickMock }}
          classNames={menuClassNames}
          index={0}
          focusableElementIndex={0}
          totalItemCount={1}
          hasCheckmarks={true}
          onItemClick={jest.fn()}
          executeItemClick={onClickMock}
        />,
      );

      const itemButton = getBySelector(container, '.splitContainer')!;
      const checkmarkIcon = getBySelector(container, '.checkmarkIcon')!;

      fireEvent.click(itemButton);
      expect(onClickMock).toHaveBeenCalledTimes(1);

      fireEvent.click(checkmarkIcon);
      expect(onClickMock).toHaveBeenCalledTimes(2);
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
    secondaryText: 'secondaryText',
    splitContainer: 'splitContainer',
    splitPrimary: 'splitPrimary',
    splitMenu: 'splitMenu',
    linkContentMenu: 'linkContentMenu',
    screenReaderText: 'screenReaderText',
  };
}

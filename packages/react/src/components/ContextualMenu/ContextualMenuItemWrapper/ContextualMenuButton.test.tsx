import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { getBySelector } from '../../../common/testUtilities';
import { ContextualMenuButton } from './ContextualMenuButton';
import type { IContextualMenuItem } from '../ContextualMenu.types';
import type { IMenuItemClassNames } from '../ContextualMenu.classNames';

describe('ContextualMenuButton', () => {
  describe('creates a normal button', () => {
    let menuItem: IContextualMenuItem;

    let menuClassNames: IMenuItemClassNames;

    beforeEach(() => {
      menuItem = { key: '123' };
      menuClassNames = getMenuItemClassNames();
    });

    it('renders the contextual menu split button correctly', () => {
      const { container } = render(
        <ContextualMenuButton
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

      const checkmarkIcon = getBySelector(container, '.checkmarkIcon')!;
      fireEvent.click(checkmarkIcon);

      expect(onClickMock).toHaveBeenCalledTimes(1);
      expect(onClickMock.mock.calls[0][0]).toBe(menuItem);
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

      // For testing component updates, we'll still use a reference to the component
      const { rerender } = render(<ContextualMenuButton {...props} />);

      rerender(<ContextualMenuButton {...props} />);

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

      const { rerender } = render(<ContextualMenuButton {...props} />);

      rerender(<ContextualMenuButton {...props} index={1} />);

      expect(renderMock).toHaveBeenCalledTimes(2);

      renderMock.mockRestore();
    });

    it('renders a description when ariaDescription is passed in', () => {
      const { container } = render(
        <ContextualMenuButton
          item={{ ...menuItem, ariaDescription: 'test' }}
          classNames={menuClassNames}
          index={0}
          focusableElementIndex={0}
          totalItemCount={1}
          hasCheckmarks={true}
        />,
      );

      const button = getBySelector(container, 'button') as HTMLButtonElement;
      const descriptionId = button.getAttribute('aria-describedby');
      expect(descriptionId).toBeTruthy();

      const descriptionEl = container.querySelector(`#${descriptionId}`);
      expect(descriptionEl?.textContent).toEqual('test');
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

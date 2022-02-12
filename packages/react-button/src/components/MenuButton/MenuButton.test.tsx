import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { MenuButton } from './MenuButton';
import { MenuButtonProps } from './MenuButton.types';

describe('MenuButton', () => {
  isConformant({
    Component: MenuButton as React.FunctionComponent<MenuButtonProps>,
    displayName: 'MenuButton',
  });

  describe('when rendered as a button', () => {
    it('renders correctly', () => {
      const result = render(<MenuButton>This is a button</MenuButton>);
      const button = result.getByRole('button');

      expect(button).toBeTruthy();
      expect(button.tagName).toBe('BUTTON');
    });

    it('can be focused', () => {
      const result = render(<MenuButton>This is a button</MenuButton>);
      const button = result.getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      button.focus();
      expect(document.activeElement).toEqual(button);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const result = render(<MenuButton disabled>This is a button</MenuButton>);
      const button = result.getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      button.focus();
      expect(document.activeElement).not.toEqual(button);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const result = render(<MenuButton disabledFocusable>This is a button</MenuButton>);
      const button = result.getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      button.focus();
      expect(document.activeElement).toEqual(button);
    });

    it('can trigger a function by being clicked', () => {
      const onClick = jest.fn();
      const result = render(<MenuButton onClick={onClick}>This is a button</MenuButton>);

      fireEvent.click(result.getByRole('button'));
      expect(onClick).toHaveBeenCalled();
    });

    it('does not trigger a function by being clicked when disabled has been passed to the component', () => {
      const onClick = jest.fn();
      const result = render(
        <MenuButton disabled onClick={onClick}>
          This is a button
        </MenuButton>,
      );

      fireEvent.click(result.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not trigger a function by being clicked when disabledFocusable has been passed to the component', () => {
      const onClick = jest.fn();
      const result = render(
        <MenuButton disabledFocusable onClick={onClick}>
          This is a button
        </MenuButton>,
      );

      fireEvent.click(result.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('when rendered as an anchor', () => {
    it('renders correctly', () => {
      const result = render(
        <MenuButton as="a" href="https://www.bing.com">
          This is a button
        </MenuButton>,
      );
      const anchor = result.getByRole('button');

      expect(anchor).toBeTruthy();
      expect(anchor.tagName).toBe('A');
    });

    it('can be focused', () => {
      const result = render(
        <MenuButton as="a" href="https://www.bing.com">
          This is a button
        </MenuButton>,
      );
      const anchor = result.getByRole('button');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).toEqual(anchor);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const result = render(
        <MenuButton as="a" disabled href="https://www.bing.com">
          This is a button
        </MenuButton>,
      );
      const anchor = result.getByRole('button');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).not.toEqual(anchor);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const result = render(
        <MenuButton as="a" disabledFocusable href="https://www.bing.com">
          This is a button
        </MenuButton>,
      );
      const anchor = result.getByRole('button');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).toEqual(anchor);
    });
  });
});

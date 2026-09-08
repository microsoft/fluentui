import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { isSlot, SLOT_ELEMENT_TYPE_SYMBOL } from '@fluentui/react-utilities';
import { isConformant } from '../../testing/isConformant';
import { SplitButton } from './SplitButton';
import { Button } from '../Button/Button';
import { MenuButton } from '../MenuButton/MenuButton';
import { useSplitButton_unstable } from './useSplitButton';
import type { SplitButtonProps } from './SplitButton.types';

describe('SplitButton', () => {
  isConformant({
    Component: SplitButton as React.FunctionComponent<SplitButtonProps>,
    displayName: 'SplitButton',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
            menuIcon: 'Test MenuIcon',
          },
        },
      ],
    },
  });

  it('renders correctly', () => {
    const { queryAllByRole } = render(<SplitButton>This is a button</SplitButton>);
    const [primaryActionButton, menuButton] = queryAllByRole('button');

    expect(primaryActionButton).toBeTruthy();
    expect(menuButton).toBeTruthy();
  });

  it('primary action button and menu button can both be focused', () => {
    const { getAllByRole } = render(<SplitButton>This is a button</SplitButton>);
    const [primaryActionButton, menuButton] = getAllByRole('button');

    expect(document.activeElement).not.toEqual(primaryActionButton);
    expect(document.activeElement).not.toEqual(menuButton);
    userEvent.tab();
    expect(document.activeElement).toEqual(primaryActionButton);
    userEvent.tab();
    expect(document.activeElement).toEqual(menuButton);
  });

  it(`neither primary action button nor menu button can be focused when disabled has been passed to the
      component`, () => {
    const { getAllByRole } = render(<SplitButton disabled>This is a button</SplitButton>);
    const [primaryActionButton, menuButton] = getAllByRole('button');

    expect(document.activeElement).not.toEqual(primaryActionButton);
    expect(document.activeElement).not.toEqual(menuButton);
    userEvent.tab();
    expect(document.activeElement).not.toEqual(primaryActionButton);
    expect(document.activeElement).not.toEqual(menuButton);
  });

  it(`primary action button and menu button can both be focused when disabledFocusable has been passed to the
      component`, () => {
    const { getAllByRole } = render(<SplitButton disabledFocusable>This is a button</SplitButton>);
    const [primaryActionButton, menuButton] = getAllByRole('button');

    expect(document.activeElement).not.toEqual(primaryActionButton);
    expect(document.activeElement).not.toEqual(menuButton);
    userEvent.tab();
    expect(document.activeElement).toEqual(primaryActionButton);
    userEvent.tab();
    expect(document.activeElement).toEqual(menuButton);
  });

  it('menu button can still be focused when disabled has been passed to the primary action button slot', () => {
    const { getAllByRole } = render(
      <SplitButton primaryActionButton={{ disabled: true }}>This is a button</SplitButton>,
    );
    const [primaryActionButton, menuButton] = getAllByRole('button');

    expect(document.activeElement).not.toEqual(primaryActionButton);
    expect(document.activeElement).not.toEqual(menuButton);
    userEvent.tab();
    expect(document.activeElement).not.toEqual(primaryActionButton);
    expect(document.activeElement).toEqual(menuButton);
  });

  it('primary action button can still be focused when disabled has been passed to the menu button slot', () => {
    const { getAllByRole } = render(<SplitButton menuButton={{ disabled: true }}>This is a button</SplitButton>);
    const [primaryActionButton, menuButton] = getAllByRole('button');

    expect(document.activeElement).not.toEqual(primaryActionButton);
    expect(document.activeElement).not.toEqual(menuButton);
    userEvent.tab();
    expect(document.activeElement).toEqual(primaryActionButton);
    userEvent.tab();
    expect(document.activeElement).not.toEqual(menuButton);
  });

  it('can trigger a function by being clicked', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(<SplitButton onClick={onClick}>This is a button</SplitButton>);
    const [primaryActionButton] = getAllByRole('button');

    userEvent.click(primaryActionButton);
    expect(onClick).toHaveBeenCalled();
  });

  it('does not trigger a function by being clicked when disabled has been passed to the component', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <SplitButton disabled primaryActionButton={{ onClick }}>
        This is a button
      </SplitButton>,
    );
    const [primaryActionButton] = getAllByRole('button');

    userEvent.click(primaryActionButton);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not trigger a function by being clicked when disabledFocusable has been passed to the component', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <SplitButton disabledFocusable primaryActionButton={{ onClick }}>
        This is a button
      </SplitButton>,
    );
    const [primaryActionButton] = getAllByRole('button');

    userEvent.click(primaryActionButton);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('can trigger a function by being clicked even when disabled has been passed to the menu button slot', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <SplitButton menuButton={{ disabled: true }} primaryActionButton={{ onClick }}>
        This is a button
      </SplitButton>,
    );
    const [primaryActionButton] = getAllByRole('button');

    userEvent.click(primaryActionButton);
    expect(onClick).toHaveBeenCalled();
  });

  it(`can trigger a function by being clicked even when disabledFocusable has been passed to the menu button
      slot`, () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <SplitButton menuButton={{ disabledFocusable: true }} primaryActionButton={{ onClick }}>
        This is a button
      </SplitButton>,
    );
    const [primaryActionButton] = getAllByRole('button');

    userEvent.click(primaryActionButton);
    expect(onClick).toHaveBeenCalled();
  });

  it(`cannot trigger a function by being clicked when disabled has been passed to the primary action button
      slot`, () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <SplitButton primaryActionButton={{ disabled: true, onClick }}>This is a button</SplitButton>,
    );
    const [primaryActionButton] = getAllByRole('button');

    userEvent.click(primaryActionButton);
    expect(onClick).not.toHaveBeenCalled();
  });

  it(`cannot trigger a function by being clicked when disabledFocusable has been passed to the primary action button
      slot`, () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <SplitButton primaryActionButton={{ disabledFocusable: true, onClick }}>This is a button</SplitButton>,
    );
    const [primaryActionButton] = getAllByRole('button');

    userEvent.click(primaryActionButton);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders the default styled menu icon (chevron) when no menu icon is provided', () => {
    const { getAllByRole } = render(<SplitButton>This is a button</SplitButton>);
    const [, menuButton] = getAllByRole('button');

    expect(menuButton.querySelector('svg')).toBeTruthy();
  });

  it('renders an explicit menu icon instead of the default chevron', () => {
    const { getAllByRole, getByText } = render(<SplitButton menuIcon="Test MenuIcon">This is a button</SplitButton>);
    const [, menuButton] = getAllByRole('button');

    expect(getByText('Test MenuIcon')).toBeTruthy();
    expect(menuButton.querySelector('svg')).toBeFalsy();
  });

  it('resolves child slot element metadata to the styled Button and MenuButton components', () => {
    const { result } = renderHook(() => useSplitButton_unstable({ children: 'This is a button' }, React.createRef()));

    const { primaryActionButton, menuButton } = result.current;

    expect(isSlot(primaryActionButton)).toBe(true);
    expect(isSlot(menuButton)).toBe(true);

    if (!isSlot(primaryActionButton) || !isSlot(menuButton)) {
      return;
    }

    expect(primaryActionButton[SLOT_ELEMENT_TYPE_SYMBOL]).toBe(Button);
    expect(menuButton[SLOT_ELEMENT_TYPE_SYMBOL]).toBe(MenuButton);
  });

  it('does not forward disabledFocusable, icon, or iconPosition to native buttons', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    try {
      const { getAllByRole, getByTestId, getByText } = render(
        <SplitButton disabledFocusable icon={<span data-testid="icon" />} iconPosition="after">
          Primary action
        </SplitButton>,
      );

      const [primaryActionButton, menuButton] = getAllByRole('button');

      // Neither native button should receive the non-standard props as DOM attributes
      expect(primaryActionButton.getAttribute('disabledfocusable')).toBeNull();
      expect(primaryActionButton.getAttribute('iconposition')).toBeNull();
      expect(menuButton.getAttribute('disabledfocusable')).toBeNull();
      expect(menuButton.getAttribute('iconposition')).toBeNull();

      // Both buttons should expose aria-disabled because disabledFocusable is true
      expect(primaryActionButton.getAttribute('aria-disabled')).toBe('true');
      expect(menuButton.getAttribute('aria-disabled')).toBe('true');

      // Primary action button should contain the icon and the label text
      expect(primaryActionButton.contains(getByTestId('icon'))).toBe(true);
      expect(primaryActionButton.contains(getByText('Primary action'))).toBe(true);

      // No React prop-forwarding warnings should have been emitted
      const propWarningPattern = /Invalid value for prop|unknown prop|non-boolean attribute/i;
      consoleErrorSpy.mock.calls.forEach(([message]) => {
        if (typeof message === 'string') {
          expect(message).not.toMatch(propWarningPattern);
        }
      });
    } finally {
      consoleErrorSpy.mockRestore();
    }
  });
});

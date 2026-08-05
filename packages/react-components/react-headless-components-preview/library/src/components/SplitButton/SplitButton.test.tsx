import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isSlot, SLOT_ELEMENT_TYPE_SYMBOL } from '@fluentui/react-utilities';
import { renderHook } from '@testing-library/react-hooks';
import { isConformant } from '../../testing/isConformant';
import { SplitButton } from './SplitButton';
import { Button } from '../Button/Button';
import { MenuButton } from '../MenuButton/MenuButton';
import { useSplitButton } from './useSplitButton';

describe('SplitButton', () => {
  isConformant({
    Component: SplitButton,
    displayName: 'SplitButton',
  });

  it('renders both the primary action button and the menu button', () => {
    const { getAllByRole } = render(<SplitButton>This is a button</SplitButton>);
    const [primaryActionButton, menuButton] = getAllByRole('button');

    expect(primaryActionButton).toBeInTheDocument();
    expect(menuButton).toBeInTheDocument();
  });

  it('forwards a ref to the root DIV element', () => {
    let rootElement: Element | null = null;
    const { container } = render(
      <SplitButton
        ref={node => {
          rootElement = node;
        }}
      >
        This is a button
      </SplitButton>,
    );

    expect(rootElement).toBeInstanceOf(HTMLDivElement);
    expect(rootElement).toBe(container.firstElementChild);
  });

  it('ships no default menu icon', () => {
    const { getAllByRole } = render(<SplitButton>This is a button</SplitButton>);
    const [, menuButton] = getAllByRole('button');

    expect(menuButton.querySelector('svg')).not.toBeInTheDocument();
  });

  it('renders a custom menuIcon slot', () => {
    const { getAllByRole } = render(
      <SplitButton menuIcon={<span data-testid="custom-menu-icon" />}>This is a button</SplitButton>,
    );
    const [, menuButton] = getAllByRole('button');

    expect(menuButton.querySelector('[data-testid="custom-menu-icon"]')).toBeInTheDocument();
  });

  it('labels the menu button using the primary action button id by default', () => {
    const { getAllByRole } = render(<SplitButton>This is a button</SplitButton>);
    const [primaryActionButton, menuButton] = getAllByRole('button');

    expect(menuButton).toHaveAttribute('aria-labelledby', primaryActionButton.id);
  });

  it('can trigger a function by clicking the primary action button', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(<SplitButton onClick={onClick}>This is a button</SplitButton>);
    const [primaryActionButton] = getAllByRole('button');

    userEvent.click(primaryActionButton);
    expect(onClick).toHaveBeenCalled();
  });

  it('propagates disabled to both child buttons via their own data-disabled attribute', () => {
    const { getAllByRole } = render(<SplitButton disabled>This is a button</SplitButton>);
    const [primaryActionButton, menuButton] = getAllByRole('button');

    expect(primaryActionButton).toHaveAttribute('data-disabled');
    expect(menuButton).toHaveAttribute('data-disabled');
  });

  it('propagates disabledFocusable to both child buttons via their own data-disabled-focusable attribute', () => {
    const { getAllByRole } = render(<SplitButton disabledFocusable>This is a button</SplitButton>);
    const [primaryActionButton, menuButton] = getAllByRole('button');

    expect(primaryActionButton).toHaveAttribute('data-disabled-focusable');
    expect(menuButton).toHaveAttribute('data-disabled-focusable');
  });

  it('allows an independent primaryActionButton override to win over propagated defaults', () => {
    const { getAllByRole } = render(
      <SplitButton disabled primaryActionButton={{ disabled: false }}>
        This is a button
      </SplitButton>,
    );
    const [primaryActionButton, menuButton] = getAllByRole('button');

    expect(primaryActionButton).not.toHaveAttribute('disabled');
    expect(menuButton).toHaveAttribute('disabled');
  });

  it('does not emit a wrapper-level data-disabled attribute', () => {
    const { container } = render(<SplitButton disabled>This is a button</SplitButton>);
    const root = container.firstElementChild as HTMLElement;

    expect(root).not.toHaveAttribute('data-disabled');
  });

  it('resolves child slot element metadata to the headless Button and MenuButton components', () => {
    const { result } = renderHook(() => useSplitButton({ children: 'This is a button' }, React.createRef()));

    const { primaryActionButton, menuButton } = result.current;

    expect(isSlot(primaryActionButton)).toBe(true);
    expect(isSlot(menuButton)).toBe(true);

    if (!isSlot(primaryActionButton) || !isSlot(menuButton)) {
      return;
    }

    expect(primaryActionButton[SLOT_ELEMENT_TYPE_SYMBOL]).toBe(Button);
    expect(menuButton[SLOT_ELEMENT_TYPE_SYMBOL]).toBe(MenuButton);
  });
});

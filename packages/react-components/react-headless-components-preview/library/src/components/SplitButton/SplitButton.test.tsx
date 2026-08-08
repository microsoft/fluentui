import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { SlotRenderFunction } from '@fluentui/react-utilities';
import { isConformant } from '../../testing/isConformant';
import { SplitButton } from './SplitButton';
import type { ButtonProps } from '../Button/Button.types';
import type { MenuButtonProps } from '../MenuButton/MenuButton.types';

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

  it('preserves default children for a primary action button render function', () => {
    const renderPrimaryActionButton: SlotRenderFunction<ButtonProps> = (_Component, slotProps) => slotProps.children;
    const { getByText } = render(
      <SplitButton primaryActionButton={{ children: renderPrimaryActionButton }}>This is a button</SplitButton>,
    );

    expect(getByText('This is a button')).toBeInTheDocument();
  });

  it('preserves undefined children for a menu button render function', () => {
    const renderMenuButton: SlotRenderFunction<MenuButtonProps> = (_Component, slotProps) => {
      expect(slotProps.children).toBeUndefined();
      return <button type="button" />;
    };
    const { getAllByRole } = render(
      <SplitButton menuButton={{ children: renderMenuButton }}>This is a button</SplitButton>,
    );

    expect(getAllByRole('button')).toHaveLength(2);
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

  it('allows an independent menuButton override to win over propagated defaults', () => {
    const { getAllByRole } = render(
      <SplitButton disabled menuButton={{ disabled: false }}>
        This is a button
      </SplitButton>,
    );
    const [primaryActionButton, menuButton] = getAllByRole('button');

    expect(primaryActionButton).toHaveAttribute('disabled');
    expect(menuButton).not.toHaveAttribute('disabled');
  });

  it('does not emit a wrapper-level data-disabled attribute', () => {
    const { container } = render(<SplitButton disabled>This is a button</SplitButton>);
    const root = container.firstElementChild as HTMLElement;

    expect(root).not.toHaveAttribute('data-disabled');
  });
});

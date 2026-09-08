import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { MenuButton } from './MenuButton';

describe('MenuButton', () => {
  isConformant({
    Component: MenuButton,
    displayName: 'MenuButton',
  });

  it('renders a default state without a default menu icon', () => {
    const result = render(<MenuButton>Open menu</MenuButton>);
    const button = result.getByRole('button', { name: 'Open menu' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    // Headless MenuButton ships no default icon; consumers provide their own.
    expect(button.querySelector('svg')).not.toBeInTheDocument();
  });

  it('reflects aria-expanded as a boolean', () => {
    const result = render(<MenuButton aria-expanded>Open menu</MenuButton>);
    const button = result.getByRole('button', { name: 'Open menu' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders a custom menuIcon slot', () => {
    const result = render(<MenuButton menuIcon={<span data-testid="custom-icon" />}>Open menu</MenuButton>);
    expect(result.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders with state data attributes', () => {
    const result = render(
      <MenuButton disabled disabledFocusable>
        Disabled
      </MenuButton>,
    );
    const button = result.getByRole('button', { name: 'Disabled' });
    expect(button).toHaveAttribute('data-disabled');
    expect(button).toHaveAttribute('data-disabled-focusable');
  });

  it('renders icon-only with the data-icon-only attribute', () => {
    const result = render(<MenuButton icon={<span>Icon</span>} aria-label="Icon menu" />);
    const button = result.getByRole('button', { name: 'Icon menu' });
    expect(button).toHaveAttribute('data-icon-only');
  });
});

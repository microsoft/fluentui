import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ToggleButton } from './ToggleButton';

describe('ToggleButton', () => {
  isConformant({
    Component: ToggleButton,
    displayName: 'ToggleButton',
  });

  it('renders a default state', () => {
    const result = render(<ToggleButton>Default ToggleButton</ToggleButton>);
    const button = result.getByRole('button', { name: 'Default ToggleButton' });
    expect(button).toBeInTheDocument();
    expect(button).toMatchInlineSnapshot(`
      <button
        aria-pressed="false"
        type="button"
      >
        Default ToggleButton
      </button>
    `);
  });

  it('renders as checked when "checked" prop is true', () => {
    const result = render(<ToggleButton checked>Checked ToggleButton</ToggleButton>);
    const button = result.getByRole('button', { name: 'Checked ToggleButton' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('data-checked');
  });

  it('renders with state data attributes', () => {
    const result = render(
      <ToggleButton disabled disabledFocusable>
        Disabled ToggleButton
      </ToggleButton>,
    );
    const button = result.getByRole('button', { name: 'Disabled ToggleButton' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-disabled');
    expect(button).toHaveAttribute('data-disabled-focusable');
  });

  it('renders <ToggleButton> with icon only', () => {
    const result = render(<ToggleButton icon={<span>Icon</span>} aria-label="Icon ToggleButton" />);
    const button = result.getByRole('button', { name: 'Icon ToggleButton' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-icon-only');
  });
});

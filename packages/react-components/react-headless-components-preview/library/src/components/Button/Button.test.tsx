import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Button } from './Button';

describe('Button', () => {
  isConformant({
    Component: Button,
    displayName: 'Button',
  });

  it('renders a default state', () => {
    const result = render(<Button>Default Button</Button>);
    const button = result.getByRole('button', { name: 'Default Button' });
    expect(button).toBeInTheDocument();
    expect(button).toMatchInlineSnapshot(`
      <button
        type="button"
      >
        Default Button
      </button>
    `);
  });

  it('renders an anchor when "as" prop is set to "a"', () => {
    const result = render(
      <Button as="a" href="https://www.microsoft.com">
        Link Button
      </Button>,
    );

    const link = result.getByRole('link', { name: 'Link Button' });

    expect(link).toBeInTheDocument();
    expect(link).toMatchInlineSnapshot(`
      <a
        href="https://www.microsoft.com"
      >
        Link Button
      </a>
    `);
  });

  it('renders with state data attributes', () => {
    const result = render(
      <Button disabled disabledFocusable>
        Disabled Button
      </Button>,
    );
    const button = result.getByRole('button', { name: 'Disabled Button' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-disabled');
    expect(button).toHaveAttribute('data-disabled-focusable');
  });

  it('renders <Button> with icon only', () => {
    const result = render(<Button icon={<span>Icon</span>} aria-label="Icon Button" />);
    const button = result.getByRole('button', { name: 'Icon Button' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-icon-only');
  });
});

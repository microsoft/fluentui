import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Button } from './Button';

describe('Button', () => {
  isConformant({
    Component: Button,
    displayName: 'Button',
    requiredProps: { children: 'Button' },
  });

  it('renders a default state', () => {
    const result = render(<Button>Default Button</Button>);
    const button = result.getByRole('button', { name: 'Default Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders an anchor when "as" prop is set to "a"', () => {
    const result = render(
      <Button as="a" href="https://www.microsoft.com">
        Link Button
      </Button>,
    );

    const link = result.getByRole('link', { name: 'Link Button' });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://www.microsoft.com');
  });

  it('renders with state data attributes', () => {
    const result = render(
      <Button disabled disabledFocusable>
        Disabled Button
      </Button>,
    );
    const button = result.getByRole('button', { name: 'Disabled Button' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-disabled', '');
    expect(button).toHaveAttribute('data-disabled-focusable', '');
  });

  it('renders <Button> with icon only', () => {
    const result = render(<Button icon={<span>Icon</span>} aria-label="Icon Button" />);
    const button = result.getByRole('button', { name: 'Icon Button' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-icon-only', '');
  });

  it('omits inactive state attributes and icon position without an icon', () => {
    const { getByRole } = render(<Button iconPosition="after">Text</Button>);
    const button = getByRole('button');
    for (const attribute of ['data-disabled', 'data-disabled-focusable', 'data-icon-only', 'data-icon-position']) {
      expect(button).not.toHaveAttribute(attribute);
    }
  });

  it.each(['before', 'after'] as const)('exposes the %s icon position only with an icon', iconPosition => {
    const { getByRole } = render(
      <Button icon={<span />} iconPosition={iconPosition}>
        Text
      </Button>,
    );
    expect(getByRole('button')).toHaveAttribute('data-icon-position', iconPosition);
    expect(getByRole('button')).not.toHaveAttribute('data-icon-only');
  });
});

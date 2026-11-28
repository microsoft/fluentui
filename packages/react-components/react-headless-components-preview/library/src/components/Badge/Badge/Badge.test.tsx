import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Badge } from '.';

describe('Badge', () => {
  isConformant({
    Component: Badge,
    displayName: 'Badge',
  });

  it('renders a default state', () => {
    const { getByText } = render(<Badge>Default Badge</Badge>);

    expect(getByText('Default Badge')).toBeInTheDocument();
  });

  it('renders with data-icon-position when icon is provided', () => {
    const { container } = render(<Badge icon={<span>★</span>}>With Icon</Badge>);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-icon-position', 'before');
  });

  it('does not render data-icon-position without icon', () => {
    const { container } = render(<Badge>No Icon</Badge>);
    const root = container.firstElementChild!;

    expect(root).not.toHaveAttribute('data-icon-position');
  });

  it('emits icon-only only when the icon slot has no accompanying content', () => {
    const { container, rerender } = render(<Badge icon="Icon" />);
    expect(container.firstElementChild).toHaveAttribute('data-icon-only');
    rerender(<Badge icon="Icon">Text</Badge>);
    expect(container.firstElementChild).not.toHaveAttribute('data-icon-only');
    rerender(<Badge icon="Icon">{0}</Badge>);
    expect(container.firstElementChild).not.toHaveAttribute('data-icon-only');
    rerender(<Badge />);
    expect(container.firstElementChild).not.toHaveAttribute('data-icon-only');
  });
});

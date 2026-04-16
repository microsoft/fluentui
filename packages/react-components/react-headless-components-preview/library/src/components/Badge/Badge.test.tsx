import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Badge } from './Badge';

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
});

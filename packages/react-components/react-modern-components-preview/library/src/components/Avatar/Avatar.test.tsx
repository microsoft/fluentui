import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  isConformant({
    Component: Avatar,
    displayName: 'Avatar',
    requiredProps: { name: 'John Doe' },
  });

  it('renders a default state', () => {
    const { getByRole } = render(<Avatar name="John Doe" />);
    const avatar = getByRole('img');

    expect(avatar).toHaveAttribute('aria-label', 'John Doe');
    expect(avatar).toHaveTextContent('JD');
    expect(avatar).toHaveAttribute('data-active-appearance', 'ring');
    expect(avatar).toHaveAttribute('data-color', 'neutral');
    expect(avatar).toHaveAttribute('data-shape', 'circular');
    expect(avatar).toHaveAttribute('data-size', '32');
  });
});

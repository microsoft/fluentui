import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  isConformant({
    Component: Avatar,
    displayName: 'Avatar',
  });

  it('renders a default state', () => {
    const { getByRole } = render(<Avatar name="John Doe" />);
    const avatar = getByRole('img');

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('aria-label', 'John Doe');
    expect(avatar).toHaveTextContent('JD');
  });
});

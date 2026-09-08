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
    expect(avatar).not.toHaveAttribute('data-active');
  });

  it.each(['active', 'inactive'] as const)('exposes and announces the %s state', active => {
    const { getByRole } = render(<Avatar name="John Doe" active={active} />);

    expect(getByRole('img')).toHaveAttribute('data-active', active);
    expect(getByRole('img')).toHaveAttribute('aria-label', `John Doe ${active}`);
  });

  it('includes the badge in the accessible name', () => {
    const { getByRole } = render(<Avatar id="avatar-id" name="John Doe" badge={{ id: 'badge-id', status: 'away' }} />);

    expect(getByRole('img', { name: 'John Doe away' })).toHaveAttribute('aria-labelledby', 'avatar-id badge-id');
    expect(getByRole('img', { name: 'away' })).toHaveAttribute('data-status', 'away');
  });

  it('preserves an explicit accessible name when a badge is present', () => {
    const { getAllByRole } = render(
      <Avatar aria-label="Custom avatar label" name="John Doe" active="active" badge={{}} />,
    );

    expect(getAllByRole('img')[0]).toHaveAttribute('aria-label', 'Custom avatar label');
    expect(getAllByRole('img')[0]).not.toHaveAttribute('aria-labelledby');
    expect(getAllByRole('img')[0]).toHaveAttribute('data-active', 'active');
  });

  it('preserves an explicit aria-labelledby when active state and a badge are present', () => {
    const { getByTestId, container } = render(
      <>
        <span id="custom-avatar-label">Custom avatar label</span>
        <Avatar
          data-testid="avatar"
          id="avatar-id"
          aria-labelledby="custom-avatar-label"
          name="John Doe"
          active="active"
          badge={{ id: 'badge-id' }}
        />
      </>,
    );

    expect(getByTestId('avatar')).toHaveAttribute('aria-labelledby', 'custom-avatar-label');
    expect(getByTestId('avatar')).not.toHaveAttribute('aria-label');
    expect(container.querySelector('#avatar-id__active')).toBeNull();
  });
});

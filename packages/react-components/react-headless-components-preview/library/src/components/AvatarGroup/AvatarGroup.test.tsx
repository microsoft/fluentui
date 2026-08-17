import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { AvatarGroup } from './AvatarGroup';
import { AvatarGroupItem } from './AvatarGroupItem/AvatarGroupItem';

describe('AvatarGroup', () => {
  isConformant({
    Component: AvatarGroup,
    displayName: 'AvatarGroup',
  });

  it('renders a default state', () => {
    const { getByRole } = render(
      <AvatarGroup>
        <AvatarGroupItem name="John Doe" />
      </AvatarGroup>,
    );

    expect(getByRole('group')).toBeInTheDocument();
  });

  it('renders its AvatarGroupItem children', () => {
    const { getAllByRole } = render(
      <AvatarGroup>
        <AvatarGroupItem name="John Doe" />
        <AvatarGroupItem name="Jane Smith" />
      </AvatarGroup>,
    );

    expect(getAllByRole('img')).toHaveLength(2);
  });

  it('forwards the layout prop through context to its items', () => {
    const { getByRole } = render(
      <AvatarGroup layout="stack">
        <AvatarGroupItem name="John Doe" />
      </AvatarGroup>,
    );

    // The group renders as a `role="group"` container regardless of layout.
    expect(getByRole('group')).toBeInTheDocument();
  });
});

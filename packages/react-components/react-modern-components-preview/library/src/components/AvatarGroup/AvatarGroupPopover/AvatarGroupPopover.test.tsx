import * as React from 'react';
import { render } from '@testing-library/react';
import { AvatarGroup } from '../AvatarGroup/AvatarGroup';
import { AvatarGroupItem } from '../AvatarGroupItem/AvatarGroupItem';
import { AvatarGroupPopover } from './AvatarGroupPopover';
import { avatarGroupPopoverClassNames } from './useAvatarGroupPopoverStyles.styles';

describe('AvatarGroupPopover', () => {
  it('inherits visual state and renders overflow content when open', () => {
    const { getByRole, getByText } = render(
      <AvatarGroup layout="stack" size={40}>
        <AvatarGroupPopover open>
          <AvatarGroupItem name="Grace Hopper" />
        </AvatarGroupPopover>
      </AvatarGroup>,
    );
    const trigger = getByRole('button');

    expect(trigger).toHaveClass(avatarGroupPopoverClassNames.triggerButton);
    expect(trigger).toHaveAttribute('data-layout', 'stack');
    expect(trigger).toHaveAttribute('data-size', '40');
    expect(trigger).toHaveAttribute('data-open');
    expect(getByText('Grace Hopper')).toBeInTheDocument();
  });
});

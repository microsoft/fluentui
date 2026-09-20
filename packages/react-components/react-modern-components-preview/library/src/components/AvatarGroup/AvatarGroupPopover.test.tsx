import * as React from 'react';
import { render } from '@testing-library/react';
import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover, avatarGroupPopoverClassNames } from './index';

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

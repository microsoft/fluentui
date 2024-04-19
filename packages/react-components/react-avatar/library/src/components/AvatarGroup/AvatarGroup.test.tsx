import * as React from 'react';
import { AvatarGroup } from './AvatarGroup';
import { AvatarGroupItem } from '../AvatarGroupItem';
import { isConformant } from '../../testing/isConformant';
import { AvatarGroupPopover } from '../AvatarGroupPopover/AvatarGroupPopover';
import { render, screen } from '@testing-library/react';

describe('AvatarGroup', () => {
  isConformant({
    Component: AvatarGroup,
    displayName: 'AvatarGroup',
    disabledTests: ['make-styles-overrides-win'],
    requiredProps: {
      children: (
        <>
          <AvatarGroupItem name="Mona Kane" />
          <AvatarGroupItem name="Allan Munger" />
          <AvatarGroupItem name="Daisy Phillips" />
          <AvatarGroupItem name="Robert Tolbert" />
          <AvatarGroupItem name="Kevin Sturgis" />
          <AvatarGroupPopover>
            <AvatarGroupItem name="Allan Munger" />
            <AvatarGroupItem name="Daisy Phillips" />
            <AvatarGroupItem name="Robert Tolbert" />
            <AvatarGroupItem name="Kevin Sturgis" />
          </AvatarGroupPopover>
        </>
      ),
    },
  });

  it('renders an icon overflow indicator when size is less than 24', () => {
    render(
      <AvatarGroup size={16}>
        <AvatarGroupItem name="Mona Kane" />
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupPopover>
          <AvatarGroupItem name="Allan Munger" />
          <AvatarGroupItem name="Daisy Phillips" />
          <AvatarGroupItem name="Robert Tolbert" />
          <AvatarGroupItem name="Kevin Sturgis" />
        </AvatarGroupPopover>
      </AvatarGroup>,
    );

    expect(screen.getByRole('button').textContent).toBe('');
  });
});

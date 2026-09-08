import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { AvatarGroup } from '../AvatarGroup';
import { AvatarGroupPopover } from '../AvatarGroupPopover/AvatarGroupPopover';
import { AvatarGroupItem } from './AvatarGroupItem';

describe('AvatarGroupItem', () => {
  isConformant({
    Component: AvatarGroupItem,
    displayName: 'AvatarGroupItem',
    disabledTests: ['has-top-level-file-extra', 'component-has-root-ref'],
  });

  it('renders the headless Avatar with computed initials', () => {
    render(
      <AvatarGroup>
        <AvatarGroupItem name="John Doe" />
      </AvatarGroup>,
    );

    expect(screen.getByRole('img', { name: 'John Doe' })).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveTextContent('JD');
  });

  it('renders as a non-overflow item (div) by default', () => {
    const { container } = render(
      <AvatarGroup>
        <AvatarGroupItem name="John Doe" />
      </AvatarGroup>,
    );

    // The item root is a `div` when not inside an AvatarGroupPopover.
    expect(container.querySelector('li')).not.toBeInTheDocument();
  });

  it('renders as an overflow item (li) with a name label inside the popover', () => {
    render(
      <AvatarGroup>
        <AvatarGroupPopover defaultOpen>
          <AvatarGroupItem name="Jane Smith" />
        </AvatarGroupPopover>
      </AvatarGroup>,
    );

    const listItem = screen.getByRole('listitem', { hidden: true });
    expect(listItem.tagName).toBe('LI');
    // The overflow label echoes the avatar name and is hidden from AT (avatar already labels it).
    const label = screen.getByText('Jane Smith');
    expect(label).toHaveAttribute('aria-hidden', 'true');
  });
});

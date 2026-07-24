import * as React from 'react';
import { render } from '@testing-library/react';
import { AvatarGroup } from '../AvatarGroup';
import { AvatarGroupPopover } from '../AvatarGroupPopover/AvatarGroupPopover';
import { AvatarGroupItem } from './AvatarGroupItem';

describe('AvatarGroupItem', () => {
  it('renders the headless Avatar with computed initials', () => {
    const { getByRole } = render(
      <AvatarGroup>
        <AvatarGroupItem name="John Doe" />
      </AvatarGroup>,
    );

    const avatar = getByRole('img');
    expect(avatar).toHaveAttribute('aria-label', 'John Doe');
    expect(avatar).toHaveTextContent('JD');
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
    const { getByRole, getByText } = render(
      <AvatarGroup>
        <AvatarGroupPopover defaultOpen>
          <AvatarGroupItem name="Jane Smith" />
        </AvatarGroupPopover>
      </AvatarGroup>,
    );

    const listItem = getByRole('listitem', { hidden: true });
    expect(listItem.tagName).toBe('LI');
    // The overflow label echoes the avatar name and is hidden from AT (avatar already labels it).
    const label = getByText('Jane Smith');
    expect(label).toHaveAttribute('aria-hidden', 'true');
  });
});

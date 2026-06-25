import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AvatarGroup } from '../AvatarGroup';
import { AvatarGroupItem } from '../AvatarGroupItem/AvatarGroupItem';
import { AvatarGroupPopover } from './AvatarGroupPopover';

const renderOverflow = (props?: { defaultOpen?: boolean }) =>
  render(
    <AvatarGroup>
      <AvatarGroupItem name="John Doe" />
      <AvatarGroupPopover {...props}>
        <AvatarGroupItem name="Jane Smith" />
        <AvatarGroupItem name="Bilal Ahmad" />
        <AvatarGroupItem name="Carlos Diaz" />
      </AvatarGroupPopover>
    </AvatarGroup>,
  );

describe('AvatarGroupPopover', () => {
  it('renders a trigger button showing the overflow count', () => {
    const { getByRole } = renderOverflow();

    const trigger = getByRole('button');
    expect(trigger).toHaveAttribute('type', 'button');
    expect(trigger).toHaveTextContent('+3');
  });

  it('caps the displayed count at 99+', () => {
    const { getByRole } = render(
      <AvatarGroup>
        <AvatarGroupPopover count={150}>
          <AvatarGroupItem name="Jane Smith" />
        </AvatarGroupPopover>
      </AvatarGroup>,
    );

    expect(getByRole('button')).toHaveTextContent('99+');
  });

  it('keeps the overflow content hidden until the trigger is clicked', () => {
    const { getByRole, getAllByRole, queryByText } = renderOverflow();

    expect(queryByText('Jane Smith')).not.toBeInTheDocument();

    userEvent.click(getByRole('button'));

    expect(getByRole('list', { hidden: true })).toBeInTheDocument();
    expect(getAllByRole('listitem', { hidden: true })).toHaveLength(3);
  });

  it('renders the overflow items when opened via defaultOpen', () => {
    const { getByText } = renderOverflow({ defaultOpen: true });

    expect(getByText('Jane Smith')).toBeInTheDocument();
    expect(getByText('Bilal Ahmad')).toBeInTheDocument();
    expect(getByText('Carlos Diaz')).toBeInTheDocument();
  });

  it('sets aria-expanded on the trigger as the popover toggles', () => {
    const { getByRole } = renderOverflow();

    const trigger = getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});

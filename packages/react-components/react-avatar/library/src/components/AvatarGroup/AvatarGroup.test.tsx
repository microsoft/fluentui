import * as React from 'react';
import { AvatarGroup } from './AvatarGroup';
import { AvatarGroupItem } from '../AvatarGroupItem';
import { isConformant } from '../../testing/isConformant';
import { AvatarGroupPopover } from '../AvatarGroupPopover/AvatarGroupPopover';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useAvatarGroupBase_unstable } from './useAvatarGroup';

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

describe('AvatarGroup DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(<AvatarGroup layout="stack" size={40} />);

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class', 'role']);
  });
});

describe('useAvatarGroupBase_unstable base hook', () => {
  it('does not forward component props to the root slot', () => {
    const { result } = renderHook(() => useAvatarGroupBase_unstable({ layout: 'pie' }, React.createRef()));

    expect(result.current.root).not.toHaveProperty('layout');
  });
});

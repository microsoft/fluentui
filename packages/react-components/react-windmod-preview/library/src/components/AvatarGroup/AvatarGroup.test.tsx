import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { AvatarGroupItem } from '../AvatarGroupItem';
import { AvatarGroup } from './AvatarGroup';
import { avatarGroupClassNames } from './useAvatarGroupStyles';

import styles from './AvatarGroup.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/avatar-group', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/avatar-group');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useAvatarGroup: (...args: Parameters<typeof actual.useAvatarGroup>) =>
      deepFreezeState(actual.useAvatarGroup(...args)),
  };
});

const renderGroup = (props: React.ComponentProps<typeof AvatarGroup> = {}) => {
  const { container } = render(<AvatarGroup {...props} />);

  return container.firstElementChild as HTMLElement;
};

describe('AvatarGroup', () => {
  isConformant({
    Component: AvatarGroup,
    displayName: 'AvatarGroup',
  });

  it('stamps the marker pair on the root, in order', () => {
    const root = renderGroup();

    expect(avatarGroupClassNames.root).toBe('fui-avatar-group group/fui-avatar-group');
    expect(root).toHaveClass('fui-avatar-group');
    expect(root).toHaveClass('group/fui-avatar-group');
    expect(root.classList[0]).toBe('fui-avatar-group');
    expect(root.classList[1]).toBe('group/fui-avatar-group');
  });

  it('defaults size to 32 and stamps it', () => {
    expect(renderGroup().getAttribute('data-size')).toBe('32');
    expect(renderGroup({ size: 56 }).getAttribute('data-size')).toBe('56');
  });

  it('leaves the headless data-layout stamp alone and adds no second layout attribute', () => {
    const root = renderGroup({ layout: 'stack' });

    expect(root.getAttribute('data-layout')).toBe('stack');
    expect(
      root
        .getAttributeNames()
        .filter(name => name.startsWith('data-'))
        .sort(),
    ).toEqual(['data-layout', 'data-size']);
  });

  it('applies the pie class only under layout="pie"', () => {
    expect(renderGroup({ layout: 'pie' }).classList).toContain(styles.pie);
    expect(renderGroup({ layout: 'spread' }).classList).not.toContain(styles.pie);
    expect(renderGroup({ layout: 'stack' }).classList).not.toContain(styles.pie);
  });

  it('publishes both layout and size on the context', () => {
    // The headless context value carries `layout` alone; without the windmod republish every
    // child falls back to the 32px default. Read structurally, through a real child.
    const { container } = render(
      <AvatarGroup size={56} layout="stack">
        <AvatarGroupItem name="Ada Lovelace" />
      </AvatarGroup>,
    );
    const item = container.querySelector<HTMLElement>('.fui-avatar-group-item');

    expect(item?.getAttribute('data-size')).toBe('56');
    expect(item?.querySelector('.fui-avatar')?.getAttribute('data-size')).toBe('56');
  });

  it('passes everything else through to the headless hook untouched', () => {
    const root = renderGroup({ id: 'group-1', 'aria-label': 'Team' });

    expect(root.id).toBe('group-1');
    expect(root.getAttribute('role')).toBe('group');
    expect(root.getAttribute('aria-label')).toBe('Team');
  });
});

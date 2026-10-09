import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Menu } from '../Menu/Menu';
import { MenuGroupHeader } from '../MenuGroupHeader/MenuGroupHeader';
import { MenuItem } from '../MenuItem/MenuItem';
import { MenuList } from '../MenuList/MenuList';
import { MenuPopover } from '../MenuPopover/MenuPopover';
import { MenuTrigger } from '../MenuTrigger/MenuTrigger';
import type { MenuGroupProps } from './MenuGroup.types';
import { MenuGroup } from './MenuGroup';
import { menuGroupClassNames, useMenuGroupStyles } from './useMenuGroupStyles';

const renderGroup = (props: MenuGroupProps = {}) => {
  const result = render(
    <Menu open>
      <MenuTrigger>
        <button>Trigger</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuGroup {...props}>
            <MenuGroupHeader>Section</MenuGroupHeader>
            <MenuItem>One</MenuItem>
          </MenuGroup>
        </MenuList>
      </MenuPopover>
    </Menu>,
  );

  return { ...result, group: result.container.querySelector<HTMLElement>('[role="group"]')! };
};

describe('MenuGroup', () => {
  isConformant({
    Component: MenuGroup,
    displayName: 'MenuGroup',
  });

  it('stamps the marker pair on the root', () => {
    const { group } = renderGroup();

    expect(group).toHaveClass('fui-menu-group');
    expect(group).toHaveClass('group/fui-menu-group');
    expect(group.classList[0]).toBe('fui-menu-group');
    expect(menuGroupClassNames.root).toBe('fui-menu-group group/fui-menu-group');
  });

  it('wires the header id to aria-labelledby', () => {
    const { group, container } = renderGroup();
    const header = container.querySelector<HTMLElement>('[role="group"] > :first-child')!;

    expect(group.getAttribute('aria-labelledby')).toBe(header.id);
    expect(header.id).not.toBe('');
  });

  it('keeps a consumer className exactly once', () => {
    const { group } = renderGroup({ className: 'consumer' });

    expect(
      group
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {} }) as never;

    const next = useMenuGroupStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

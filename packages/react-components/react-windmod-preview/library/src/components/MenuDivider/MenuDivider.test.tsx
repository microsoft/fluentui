import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Menu } from '../Menu/Menu';
import { MenuItem } from '../MenuItem/MenuItem';
import { MenuList } from '../MenuList/MenuList';
import { MenuPopover } from '../MenuPopover/MenuPopover';
import { MenuTrigger } from '../MenuTrigger/MenuTrigger';
import type { MenuDividerProps } from './MenuDivider.types';
import { MenuDivider } from './MenuDivider';
import { menuDividerClassNames, useMenuDividerStyles } from './useMenuDividerStyles';

import styles from './MenuDivider.module.css';

const renderDivider = (props: MenuDividerProps = {}) => {
  const result = render(
    <Menu open>
      <MenuTrigger>
        <button>Trigger</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>One</MenuItem>
          <MenuDivider {...props} />
          <MenuItem>Two</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>,
  );

  return { ...result, divider: result.container.querySelector<HTMLElement>('[aria-hidden="true"]')! };
};

describe('MenuDivider', () => {
  isConformant({
    Component: MenuDivider,
    displayName: 'MenuDivider',
  });

  it('stamps the marker pair on the root', () => {
    const { divider } = renderDivider();

    expect(divider).toHaveClass('fui-menu-divider');
    expect(divider).toHaveClass('group/fui-menu-divider');
    expect(divider.classList[0]).toBe('fui-menu-divider');
    expect(menuDividerClassNames.root).toBe('fui-menu-divider group/fui-menu-divider');
  });

  it('carries the root module class and stays out of the accessibility tree', () => {
    const { divider } = renderDivider();

    expect(divider).toHaveClass(styles.root);
    expect(divider.getAttribute('role')).toBe('presentation');
    expect(divider.getAttribute('aria-hidden')).toBe('true');
    expect(divider.className).not.toContain('undefined');
  });

  it('keeps a consumer className exactly once', () => {
    const { divider } = renderDivider({ className: 'consumer' });

    expect(
      divider
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(divider).toHaveClass(styles.root);
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {} }) as never;

    const next = useMenuDividerStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

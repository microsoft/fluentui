import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Menu } from '../Menu/Menu';
import { MenuItem } from '../MenuItem/MenuItem';
import { MenuPopover } from '../MenuPopover/MenuPopover';
import { MenuTrigger } from '../MenuTrigger/MenuTrigger';
import type { MenuListProps } from './MenuList.types';
import { MenuList } from './MenuList';
import { menuListClassNames, useMenuListStyles } from './useMenuListStyles';

import styles from './MenuList.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/menu', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/menu');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useMenuList: (...args: Parameters<typeof actual.useMenuList>) => deepFreezeState(actual.useMenuList(...args)),
  };
});

const renderInMenu = (props: MenuListProps = {}) => {
  const result = render(
    <Menu open>
      <MenuTrigger>
        <button>Trigger</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList {...props}>
          <MenuItem>One</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>,
  );

  return { ...result, list: result.container.querySelector<HTMLElement>('[role="menu"]')! };
};

const renderStandalone = (props: MenuListProps = {}) => {
  const result = render(
    <MenuList {...props}>
      <MenuItem>One</MenuItem>
    </MenuList>,
  );

  return { ...result, list: result.container.querySelector<HTMLElement>('[role="menu"]')! };
};

describe('MenuList', () => {
  isConformant({
    Component: MenuList,
    displayName: 'MenuList',
  });

  it('stamps the marker pair on the root', () => {
    const { list } = renderInMenu();

    expect(list).toHaveClass('fui-menu-list');
    expect(list).toHaveClass('group/fui-menu-list');
    expect(list.classList[0]).toBe('fui-menu-list');
    expect(menuListClassNames.root).toBe('fui-menu-list group/fui-menu-list');
  });

  it('carries the root module class and role', () => {
    const { list } = renderInMenu();

    expect(list).toHaveClass(styles.root);
    expect(list.getAttribute('role')).toBe('menu');
    expect(list.className).not.toContain('undefined');
  });

  it('adds the in-menu class only inside a Menu', () => {
    expect(renderInMenu().list).toHaveClass(styles.inMenu);
    expect(renderStandalone().list).not.toHaveClass(styles.inMenu);
  });

  it('leaves the focusgroup attribute untouched', () => {
    // The WICG scoped-focusgroup opt-in that replaces tabster arrow navigation — a styled layer
    // must not disturb it.
    expect(renderInMenu().list.getAttribute('focusgroup')).toBe('menu block wrap');
    expect(renderStandalone().list.getAttribute('focusgroup')).toBe('menu block wrap');
  });

  it('keeps a consumer className exactly once', () => {
    const { list } = renderInMenu({ className: 'consumer' });

    expect(
      list
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(list).toHaveClass(styles.root);
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {}, hasMenuContext: true }) as never;

    const next = useMenuListStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

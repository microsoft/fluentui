import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Menu } from '../Menu/Menu';
import { MenuGroup } from '../MenuGroup/MenuGroup';
import { MenuItem } from '../MenuItem/MenuItem';
import { MenuList } from '../MenuList/MenuList';
import { MenuPopover } from '../MenuPopover/MenuPopover';
import { MenuTrigger } from '../MenuTrigger/MenuTrigger';
import type { MenuGroupHeaderProps } from './MenuGroupHeader.types';
import { MenuGroupHeader } from './MenuGroupHeader';
import { menuGroupHeaderClassNames, useMenuGroupHeaderStyles } from './useMenuGroupHeaderStyles';

import styles from './MenuGroupHeader.module.css';

const renderHeader = (props: MenuGroupHeaderProps = {}) => {
  const result = render(
    <Menu open>
      <MenuTrigger>
        <button>Trigger</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuGroup>
            <MenuGroupHeader {...props}>Section</MenuGroupHeader>
            <MenuItem>One</MenuItem>
          </MenuGroup>
        </MenuList>
      </MenuPopover>
    </Menu>,
  );

  return { ...result, header: result.container.querySelector<HTMLElement>('[role="group"] > :first-child')! };
};

describe('MenuGroupHeader', () => {
  isConformant({
    Component: MenuGroupHeader,
    displayName: 'MenuGroupHeader',
  });

  it('stamps the marker pair on the root', () => {
    const { header } = renderHeader();

    expect(header).toHaveClass('fui-menu-group-header');
    expect(header).toHaveClass('group/fui-menu-group-header');
    expect(header.classList[0]).toBe('fui-menu-group-header');
    expect(menuGroupHeaderClassNames.root).toBe('fui-menu-group-header group/fui-menu-group-header');
  });

  it('carries the root module class', () => {
    const { header } = renderHeader();

    expect(header).toHaveClass(styles.root);
    expect(header.className).not.toContain('undefined');
  });

  it('keeps the id that MenuGroupContext supplies', () => {
    const { header, container } = renderHeader();

    expect(header.id).not.toBe('');
    expect(container.querySelector('[role="group"]')!.getAttribute('aria-labelledby')).toBe(header.id);
  });

  it('keeps a consumer className exactly once', () => {
    const { header } = renderHeader({ className: 'consumer' });

    expect(
      header
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(header).toHaveClass(styles.root);
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {} }) as never;

    const next = useMenuGroupHeaderStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

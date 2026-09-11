import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Menu } from '../Menu/Menu';
import itemStyles from '../MenuItem/MenuItem.module.css';
import { MenuList } from '../MenuList/MenuList';
import { MenuPopover } from '../MenuPopover/MenuPopover';
import { MenuTrigger } from '../MenuTrigger/MenuTrigger';
import type { MenuItemCheckboxProps } from './MenuItemCheckbox.types';
import { MenuItemCheckbox } from './MenuItemCheckbox';
import { menuItemCheckboxClassNames, useMenuItemCheckboxStyles } from './useMenuItemCheckboxStyles';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/menu', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/menu');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useMenuItemCheckbox: (...args: Parameters<typeof actual.useMenuItemCheckbox>) =>
      deepFreezeState(actual.useMenuItemCheckbox(...args)),
  };
});

const REQUIRED: MenuItemCheckboxProps = { name: 'group', value: 'a' };

const renderCheckbox = (props: Partial<MenuItemCheckboxProps> = {}, checked = false) => {
  const result = render(
    <Menu open>
      <MenuTrigger>
        <button>Trigger</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList checkedValues={checked ? { group: ['a'] } : {}}>
          <MenuItemCheckbox {...REQUIRED} {...props}>
            Item
          </MenuItemCheckbox>
        </MenuList>
      </MenuPopover>
    </Menu>,
  );

  return { ...result, item: result.container.querySelector<HTMLElement>('[role="menuitemcheckbox"]')! };
};

const Consumer = () => <i data-consumer="" />;

describe('MenuItemCheckbox', () => {
  isConformant({
    Component: MenuItemCheckbox,
    displayName: 'MenuItemCheckbox',
    requiredProps: REQUIRED as never,
  });

  it('carries BOTH marker pairs, its own first', () => {
    const { item } = renderCheckbox();

    // MenuItem's pair is load-bearing, not cosmetic: every slot class in MenuItem.module.css
    // reaches state through group-<variant>/fui-menu-item, so the checkmark would never paint
    // without it. Its own pair comes first so classList[0] is slash-free.
    expect(item.classList[0]).toBe('fui-menu-item-checkbox');
    expect(item).toHaveClass('fui-menu-item-checkbox');
    expect(item).toHaveClass('group/fui-menu-item-checkbox');
    expect(item).toHaveClass('fui-menu-item');
    expect(item).toHaveClass('group/fui-menu-item');
    expect(menuItemCheckboxClassNames.root).toBe('fui-menu-item-checkbox group/fui-menu-item-checkbox');
  });

  it('applies the MenuItem slot classes', () => {
    const { item } = renderCheckbox();
    const spans = Array.from(item.children) as HTMLElement[];

    expect(item).toHaveClass(itemStyles.root);
    expect(spans[0]).toHaveClass(itemStyles.checkmark);
    expect(spans[spans.length - 1]).toHaveClass(itemStyles.content);
  });

  it('leaves data-checked to the headless hook and never duplicates it', () => {
    expect(renderCheckbox({}, true).item.getAttribute('data-checked')).toBe('');
    expect(renderCheckbox().item.hasAttribute('data-checked')).toBe(false);
    expect(
      renderCheckbox({}, true)
        .item.getAttributeNames()
        .filter(n => n === 'data-checked'),
    ).toHaveLength(1);
    expect(renderCheckbox({}, true).item.getAttribute('aria-checked')).toBe('true');
    expect(renderCheckbox().item.getAttribute('role')).toBe('menuitemcheckbox');
  });

  it('keeps the checkmark rendered when unchecked, so the 16px gutter stays reserved', () => {
    const { item } = renderCheckbox();

    expect(item.querySelector(`.${itemStyles.checkmark}`)).not.toBeNull();
  });

  it('restores the default checkmark on every nullish input and never overrides a consumer', () => {
    const probe = (props: Partial<MenuItemCheckboxProps>) => {
      const { item } = renderCheckbox(props);
      const checkmark = item.querySelector(`.${itemStyles.checkmark}`);

      return { checkmark, svg: checkmark?.querySelector('svg'), consumer: checkmark?.querySelector('[data-consumer]') };
    };

    expect(probe({}).svg).not.toBeNull();
    expect(probe({ checkmark: {} }).svg).not.toBeNull();
    expect(probe({ checkmark: { children: undefined } }).svg).not.toBeNull();
    expect(probe({ checkmark: { children: null } }).svg).not.toBeNull();

    expect(probe({ checkmark: null }).checkmark).toBeNull();

    expect(probe({ checkmark: { children: <Consumer /> } }).consumer).not.toBeNull();
    expect(probe({ checkmark: <Consumer /> }).consumer).not.toBeNull();

    // An empty string is falsy but NOT nullish — `||` would inject a glyph Griffel does not.
    expect(probe({ checkmark: '' }).svg).toBeNull();
  });

  it('renders no submenu indicator even with hasSubmenu', () => {
    // renderMenuItemCheckbox emits five slots and submenuIndicator is not one of them — the same
    // limitation on both implementations. Pinned so a future render change is deliberate.
    const { item } = renderCheckbox({ hasSubmenu: true });

    expect(item.getAttribute('data-has-submenu')).toBe('');
    expect(item.querySelector(`.${itemStyles.submenuIndicator}`)).toBeNull();
  });

  it('keeps a consumer className exactly once', () => {
    const { item } = renderCheckbox({ className: 'consumer' });

    expect(
      item
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {} }) as never;

    const next = useMenuItemCheckboxStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

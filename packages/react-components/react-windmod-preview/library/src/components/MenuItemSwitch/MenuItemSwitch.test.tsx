import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Menu } from '../Menu/Menu';
import itemStyles from '../MenuItem/MenuItem.module.css';
import { MenuList } from '../MenuList/MenuList';
import { MenuPopover } from '../MenuPopover/MenuPopover';
import { MenuTrigger } from '../MenuTrigger/MenuTrigger';
import type { MenuItemSwitchProps } from './MenuItemSwitch.types';
import { MenuItemSwitch } from './MenuItemSwitch';
import switchStyles from './MenuItemSwitch.module.css';
import { menuItemSwitchClassNames, useMenuItemSwitchStyles } from './useMenuItemSwitchStyles';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/menu', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/menu');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useMenuItemSwitch: (...args: Parameters<typeof actual.useMenuItemSwitch>) =>
      deepFreezeState(actual.useMenuItemSwitch(...args)),
  };
});

const REQUIRED: MenuItemSwitchProps = { name: 'group', value: 'a' };

type ListProps = { hasIcons?: boolean; hasCheckmarks?: boolean };

const renderSwitch = (props: Partial<MenuItemSwitchProps> = {}, checked = false, listProps: ListProps = {}) => {
  const result = render(
    <Menu open>
      <MenuTrigger>
        <button>Trigger</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList {...listProps} checkedValues={checked ? { group: ['a'] } : {}}>
          <MenuItemSwitch {...REQUIRED} {...props}>
            Item
          </MenuItemSwitch>
        </MenuList>
      </MenuPopover>
    </Menu>,
  );

  const item = result.container.querySelector<HTMLElement>('[role="menuitemcheckbox"]')!;

  return { ...result, item, indicator: item.querySelector<HTMLElement>(`.${switchStyles.switchIndicator}`) };
};

const Consumer = () => <i data-consumer="" />;

describe('MenuItemSwitch', () => {
  isConformant({
    Component: MenuItemSwitch,
    displayName: 'MenuItemSwitch',
    requiredProps: REQUIRED as never,
  });

  it('carries BOTH marker pairs, its own first', () => {
    const { item } = renderSwitch();

    expect(item.classList[0]).toBe('fui-menu-item-switch');
    expect(item).toHaveClass('fui-menu-item-switch');
    expect(item).toHaveClass('group/fui-menu-item-switch');
    expect(item).toHaveClass('fui-menu-item');
    expect(item).toHaveClass('group/fui-menu-item');
    expect(menuItemSwitchClassNames.root).toBe('fui-menu-item-switch group/fui-menu-item-switch');
  });

  it('classes the switch indicator and renders it LAST', () => {
    const { item, indicator } = renderSwitch();
    const children = Array.from(item.children);

    expect(indicator).not.toBeNull();
    expect(children[children.length - 1]).toBe(indicator);
  });

  it('applies the MenuItem slot classes to the row it inherits', () => {
    const { item } = renderSwitch({ icon: <i data-icon="" />, secondaryContent: 'Ctrl+S' }, false, { hasIcons: true });

    expect(item).toHaveClass(itemStyles.root);
    expect(item.querySelector(`.${itemStyles.icon}`)).not.toBeNull();
    expect(item.querySelector(`.${itemStyles.content}`)).not.toBeNull();
    expect(item.querySelector(`.${itemStyles.secondaryContent}`)).not.toBeNull();
  });

  it('drops the checkmark and submenu indicator before composing MenuItem`s look', () => {
    // renderMenuItemSwitch emits neither slot, so a class minted onto them would land on nothing
    // and the DOM could never show it — the seam is only observable on the returned state.
    const state = {
      root: { className: '' },
      switchIndicator: {},
      checkmark: { className: 'given-checkmark' },
      submenuIndicator: { className: 'given-submenu' },
      components: {},
    } as never;

    const next = useMenuItemSwitchStyles(state) as unknown as Record<string, unknown>;

    expect(next.checkmark).toBeUndefined();
    expect(next.submenuIndicator).toBeUndefined();
  });

  it('renders neither slot even when the list asks for checkmarks and the item has a submenu', () => {
    const { item } = renderSwitch({ hasSubmenu: true } as Partial<MenuItemSwitchProps>, false, {
      hasCheckmarks: true,
    });

    expect(item.querySelector(`.${itemStyles.checkmark}`)).toBeNull();
    expect(item.querySelector(`.${itemStyles.submenuIndicator}`)).toBeNull();
  });

  it('stamps data-multiline from subText and reaches the indicator through it', () => {
    expect(renderSwitch({ subText: 'Supporting' }).item.getAttribute('data-multiline')).toBe('true');
    expect(renderSwitch().item.hasAttribute('data-multiline')).toBe(false);
    expect(renderSwitch({ subText: 'Supporting' }).item.querySelector(`.${itemStyles.subText}`)).not.toBeNull();
  });

  it('leaves data-checked and data-disabled to the headless hook and never duplicates them', () => {
    expect(renderSwitch({}, true).item.getAttribute('data-checked')).toBe('');
    expect(renderSwitch().item.hasAttribute('data-checked')).toBe(false);
    expect(
      renderSwitch({}, true)
        .item.getAttributeNames()
        .filter(name => name === 'data-checked'),
    ).toHaveLength(1);
    expect(renderSwitch({ disabled: true }).item.getAttribute('data-disabled')).toBe('');
  });

  it('restores the default thumb on every nullish input and never overrides a consumer', () => {
    const probe = (props: Partial<MenuItemSwitchProps>) => {
      const { indicator } = renderSwitch(props);

      return {
        indicator,
        svg: indicator?.querySelector('svg'),
        consumer: indicator?.querySelector('[data-consumer]'),
      };
    };

    expect(probe({}).svg).not.toBeNull();
    expect(probe({ switchIndicator: {} }).svg).not.toBeNull();
    expect(probe({ switchIndicator: { children: undefined } }).svg).not.toBeNull();
    expect(probe({ switchIndicator: { children: null } }).svg).not.toBeNull();

    expect(probe({ switchIndicator: null }).indicator).toBeNull();

    expect(probe({ switchIndicator: { children: <Consumer /> } }).consumer).not.toBeNull();
    expect(probe({ switchIndicator: <Consumer /> }).consumer).not.toBeNull();
    expect(probe({ switchIndicator: { children: <Consumer /> } }).svg).toBeNull();

    // An empty string is falsy but NOT nullish — `||` would inject a glyph Griffel does not.
    expect(probe({ switchIndicator: '' }).svg).toBeNull();
  });

  it('ships no forced-colors rules, because Griffel`s MenuItemSwitch ships none', () => {
    // Switch has a high-contrast ladder and MenuItemSwitch does not; the two look like siblings,
    // so this reads the SOURCE module rather than any compiled artefact.
    const source = readFileSync(join(__dirname, 'MenuItemSwitch.module.css'), 'utf8');

    expect(source.match(/forced-colors/g)).toBeNull();
    expect(source.match(/prefers-reduced-motion/g)).toBeNull();
  });

  it('keeps a consumer className exactly once', () => {
    const { item } = renderSwitch({ className: 'consumer' });

    expect(
      item
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const switchIndicator = Object.freeze({ className: 'given-indicator' }) as never;
    const state = Object.freeze({ root, switchIndicator, components: {} }) as never;

    const next = useMenuItemSwitchStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect(next.switchIndicator).not.toBe(switchIndicator);
    expect((root as { className: string }).className).toBe('given');
  });
});

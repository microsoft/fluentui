import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Menu } from '../Menu/Menu';
import itemStyles from '../MenuItem/MenuItem.module.css';
import { MenuList } from '../MenuList/MenuList';
import { MenuPopover } from '../MenuPopover/MenuPopover';
import { MenuTrigger } from '../MenuTrigger/MenuTrigger';
import type { MenuItemRadioProps } from './MenuItemRadio.types';
import { MenuItemRadio } from './MenuItemRadio';
import { menuItemRadioClassNames, useMenuItemRadioStyles } from './useMenuItemRadioStyles';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/menu', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/menu');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useMenuItemRadio: (...args: Parameters<typeof actual.useMenuItemRadio>) =>
      deepFreezeState(actual.useMenuItemRadio(...args)),
  };
});

const REQUIRED: MenuItemRadioProps = { name: 'group', value: 'a' };

const renderRadio = (props: Partial<MenuItemRadioProps> = {}, checked = false) => {
  const result = render(
    <Menu open>
      <MenuTrigger>
        <button>Trigger</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList checkedValues={checked ? { group: ['a'] } : {}}>
          <MenuItemRadio {...REQUIRED} {...props}>
            Item
          </MenuItemRadio>
        </MenuList>
      </MenuPopover>
    </Menu>,
  );

  return { ...result, item: result.container.querySelector<HTMLElement>('[role="menuitemradio"]')! };
};

const Consumer = () => <i data-consumer="" />;

describe('MenuItemRadio', () => {
  isConformant({
    Component: MenuItemRadio,
    displayName: 'MenuItemRadio',
    requiredProps: REQUIRED as never,
  });

  it('carries BOTH marker pairs, its own first', () => {
    const { item } = renderRadio();

    // See MenuItemCheckbox.test.tsx — MenuItem's pair is what makes the group variants resolve.
    expect(item.classList[0]).toBe('fui-menu-item-radio');
    expect(item).toHaveClass('fui-menu-item-radio');
    expect(item).toHaveClass('group/fui-menu-item-radio');
    expect(item).toHaveClass('fui-menu-item');
    expect(item).toHaveClass('group/fui-menu-item');
    expect(menuItemRadioClassNames.root).toBe('fui-menu-item-radio group/fui-menu-item-radio');
  });

  it('applies the MenuItem slot classes', () => {
    const { item } = renderRadio();
    const spans = Array.from(item.children) as HTMLElement[];

    expect(item).toHaveClass(itemStyles.root);
    expect(spans[0]).toHaveClass(itemStyles.checkmark);
    expect(spans[spans.length - 1]).toHaveClass(itemStyles.content);
  });

  it('leaves data-checked to the headless hook and never duplicates it', () => {
    expect(renderRadio({}, true).item.getAttribute('data-checked')).toBe('');
    expect(renderRadio().item.hasAttribute('data-checked')).toBe(false);
    expect(
      renderRadio({}, true)
        .item.getAttributeNames()
        .filter(n => n === 'data-checked'),
    ).toHaveLength(1);
    expect(renderRadio().item.getAttribute('role')).toBe('menuitemradio');
  });

  it('restores the default checkmark on every nullish input and never overrides a consumer', () => {
    const probe = (props: Partial<MenuItemRadioProps>) => {
      const { item } = renderRadio(props);
      const checkmark = item.querySelector(`.${itemStyles.checkmark}`);

      return { checkmark, svg: checkmark?.querySelector('svg'), consumer: checkmark?.querySelector('[data-consumer]') };
    };

    // The same glyph as MenuItemCheckbox — Griffel draws no radio circle.
    expect(probe({}).svg).not.toBeNull();
    expect(probe({ checkmark: {} }).svg).not.toBeNull();
    expect(probe({ checkmark: { children: undefined } }).svg).not.toBeNull();
    expect(probe({ checkmark: { children: null } }).svg).not.toBeNull();

    expect(probe({ checkmark: null }).checkmark).toBeNull();

    expect(probe({ checkmark: { children: <Consumer /> } }).consumer).not.toBeNull();
    expect(probe({ checkmark: <Consumer /> }).consumer).not.toBeNull();
    expect(probe({ checkmark: '' }).svg).toBeNull();
  });

  it('keeps a consumer className exactly once', () => {
    const { item } = renderRadio({ className: 'consumer' });

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

    const next = useMenuItemRadioStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

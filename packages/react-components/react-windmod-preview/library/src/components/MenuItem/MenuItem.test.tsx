import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Menu } from '../Menu/Menu';
import { MenuList } from '../MenuList/MenuList';
import { MenuPopover } from '../MenuPopover/MenuPopover';
import { MenuTrigger } from '../MenuTrigger/MenuTrigger';
import type { MenuItemProps } from './MenuItem.types';
import { MenuItem } from './MenuItem';
import { menuItemClassNames, useMenuItemStyles } from './useMenuItemStyles';

import styles from './MenuItem.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/menu', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/menu');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useMenuItem: (...args: Parameters<typeof actual.useMenuItem>) => deepFreezeState(actual.useMenuItem(...args)),
  };
});

type ListFlags = { hasIcons?: boolean; hasCheckmarks?: boolean };

// generateTestIdent drops the component token under jest, so MenuItem's `.root` and
// MenuPopover's `.root` stringify identically. Every element below is reached STRUCTURALLY —
// by role or by slot position — and class presence is only ever asserted against this module's
// own imported `styles` object, never by comparing two components' class strings.
const renderItem = (itemProps: MenuItemProps = {}, listFlags: ListFlags = {}) => {
  const result = render(
    <Menu open>
      <MenuTrigger>
        <button>Trigger</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList {...listFlags}>
          <MenuItem {...itemProps}>Item</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>,
  );

  return { ...result, item: result.container.querySelector<HTMLElement>('[role="menuitem"]')! };
};

/** hasSubmenu defaults from MenuTriggerContext but is a plain prop, so a submenu row needs no
 * nested Menu to reach the submenuIndicator slot. */
const renderSubmenuItem = (itemProps: MenuItemProps = {}) => renderItem({ hasSubmenu: true, ...itemProps });

const Consumer = () => <i data-consumer="" />;

describe('MenuItem', () => {
  isConformant({
    Component: MenuItem,
    displayName: 'MenuItem',
  });

  it('stamps the marker pair on the root', () => {
    const { item } = renderItem();

    expect(item).toHaveClass('fui-menu-item');
    expect(item).toHaveClass('group/fui-menu-item');
    expect(item.classList[0]).toBe('fui-menu-item');
    expect(menuItemClassNames.root).toBe('fui-menu-item group/fui-menu-item');
  });

  it('carries the root module class', () => {
    const { item } = renderItem();

    expect(item).toHaveClass(styles.root);
    expect(item.className).not.toContain('undefined');
  });

  it('gives every rendered slot its own module class', () => {
    const { item } = renderItem(
      { icon: <Consumer />, secondaryContent: 'Ctrl+S', subText: 'sub' },
      { hasIcons: true, hasCheckmarks: true },
    );

    // Reached by render order — checkmark, icon, content(subText nested), secondaryContent.
    const spans = Array.from(item.children) as HTMLElement[];

    expect(spans[0]).toHaveClass(styles.checkmark);
    expect(spans[1]).toHaveClass(styles.icon);
    expect(spans[2]).toHaveClass(styles.content);
    expect(spans[2].firstElementChild).toHaveClass(styles.subText);
    expect(spans[3]).toHaveClass(styles.secondaryContent);
  });

  it('gives the submenu indicator its own module class', () => {
    const { item } = renderSubmenuItem();
    const indicator = item.lastElementChild as HTMLElement;

    expect(item.getAttribute('data-has-submenu')).toBe('');
    expect(indicator).toHaveClass(styles.submenuIndicator);
  });

  it('stamps data-multiline only when subText is present, in the ratified spelling', () => {
    const withSubText = renderItem({ subText: 'sub' }).item;

    // The presence spelling is `true`/absent — never the headless library's own `''`.
    expect(withSubText.getAttribute('data-multiline')).toBe('true');
    expect(renderItem().item.hasAttribute('data-multiline')).toBe(false);
  });

  it('leaves the headless stamps to the headless hook, exactly once each', () => {
    const { item } = renderItem({ disabled: true });

    expect(item.getAttribute('data-disabled')).toBe('');
    expect(item.getAttributeNames().filter(name => name === 'data-disabled')).toHaveLength(1);
    expect(item.getAttribute('data-has-submenu')).toBeNull();
    expect(item.getAttribute('data-submenu-open')).toBeNull();

    // The negative direction is what proves our layer re-stamps nothing: a duplicated key in the
    // root object would overwrite rather than double the attribute, so counting occurrences on a
    // disabled row cannot see it — an ENABLED row carrying data-disabled can.
    const enabled = renderItem().item;

    expect(enabled.hasAttribute('data-disabled')).toBe(false);
    // data-multiline is the ONE attribute our layer adds, and this row has no subText.
    expect(enabled.getAttributeNames().filter(name => name.startsWith('data-'))).toEqual([]);
    // focusgroupstart is the focusgroup opt-in and must survive our layer untouched.
    expect(item.getAttribute('focusgroupstart')).toBe('');
  });

  it('restores the default chevron on every nullish input and never overrides a consumer', () => {
    // The glyph rule's 8-input matrix, as a test. `??` fires on null and undefined only.
    const hasGlyph = (props: MenuItemProps) => {
      const { item } = renderSubmenuItem(props);
      const indicator = item.lastElementChild as HTMLElement;

      return { indicator, svg: indicator?.querySelector('svg'), consumer: indicator?.querySelector('[data-consumer]') };
    };

    // 1-4: the slot exists and its children are nullish — the default glyph fills all four.
    expect(hasGlyph({}).svg).not.toBeNull();
    expect(hasGlyph({ submenuIndicator: {} }).svg).not.toBeNull();
    expect(hasGlyph({ submenuIndicator: { children: undefined } }).svg).not.toBeNull();
    expect(hasGlyph({ submenuIndicator: { children: null } }).svg).not.toBeNull();

    // 5: slot-level null removes the slot entirely.
    expect(hasGlyph({ submenuIndicator: null }).indicator).not.toHaveClass(styles.submenuIndicator);

    // 6-7: a consumer's children always win.
    expect(hasGlyph({ submenuIndicator: { children: <Consumer /> } }).consumer).not.toBeNull();
    expect(hasGlyph({ submenuIndicator: <Consumer /> }).consumer).not.toBeNull();

    // 8: an empty string is falsy but NOT nullish, so no glyph is injected — `||` would inject one.
    expect(hasGlyph({ submenuIndicator: '' }).svg).toBeNull();
  });

  it('renders no submenu indicator without a submenu', () => {
    const { item } = renderItem();

    expect(item.querySelector(`.${styles.submenuIndicator}`)).toBeNull();
  });

  it('keeps a consumer className exactly once', () => {
    const { item } = renderItem({ className: 'consumer' });

    expect(
      item
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(item).toHaveClass(styles.root);
  });

  it('gives a disabled item the secondaryContent class that carries its disabled block', () => {
    const { item } = renderItem({ disabled: true, secondaryContent: 'Ctrl+S' });
    const secondary = item.querySelector(`.${styles.secondaryContent}`);

    // The disabled look reaches this slot through group-disabled/fui-menu-item, so the class has
    // to be present on a disabled row for Griffel's shared disabled bucket to be reproduced.
    expect(secondary).not.toBeNull();
    expect(item.getAttribute('data-disabled')).toBe('');
  });

  it('passes everything else through to the headless hook untouched', () => {
    const onClick = jest.fn();
    const { item } = renderItem({ onClick, 'aria-label': 'labelled', persistOnClick: true });

    expect(item.getAttribute('aria-label')).toBe('labelled');
    item.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const content = Object.freeze({ className: 'given-content' }) as never;
    const state = Object.freeze({ root, content, components: {} }) as never;

    const next = useMenuItemStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect(next.content).not.toBe(content);
    expect((root as { className: string }).className).toBe('given');
    expect((root as Record<string, unknown>)['data-multiline']).toBeUndefined();
  });
});

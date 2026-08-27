import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Menu } from '../Menu/Menu';
import itemStyles from '../MenuItem/MenuItem.module.css';
import { MenuItemCheckbox } from '../MenuItemCheckbox/MenuItemCheckbox';
import { MenuList } from '../MenuList/MenuList';
import { MenuPopover } from '../MenuPopover/MenuPopover';
import { MenuTrigger } from '../MenuTrigger/MenuTrigger';
import type { MenuItemLinkProps } from './MenuItemLink.types';
import { MenuItemLink } from './MenuItemLink';
import linkStyles from './MenuItemLink.module.css';
import { menuItemLinkClassNames, useMenuItemLinkStyles } from './useMenuItemLinkStyles';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/menu', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/menu');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useMenuItemLink: (...args: Parameters<typeof actual.useMenuItemLink>) =>
      deepFreezeState(actual.useMenuItemLink(...args)),
  };
});

const REQUIRED: MenuItemLinkProps = { href: 'https://example.com' };

type ListProps = { hasIcons?: boolean; hasCheckmarks?: boolean; checkedValues?: Record<string, string[]> };

const renderLink = (props: Partial<MenuItemLinkProps> = {}, listProps: ListProps = {}) => {
  const result = render(
    <Menu open>
      <MenuTrigger>
        <button>Trigger</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList {...listProps}>
          <MenuItemLink {...REQUIRED} {...props}>
            Item
          </MenuItemLink>
        </MenuList>
      </MenuPopover>
    </Menu>,
  );

  return { ...result, item: result.container.querySelector<HTMLElement>('a[role="menuitem"]')! };
};

describe('MenuItemLink', () => {
  isConformant({
    Component: MenuItemLink,
    displayName: 'MenuItemLink',
    requiredProps: REQUIRED as never,
  });

  it('carries BOTH marker pairs, its own first', () => {
    const { item } = renderLink();

    // MenuItem's pair is load-bearing, not cosmetic: every slot class in MenuItem.module.css
    // reaches state through group-<variant>/fui-menu-item. Its own pair comes first so
    // classList[0] is slash-free.
    expect(item.classList[0]).toBe('fui-menu-item-link');
    expect(item).toHaveClass('fui-menu-item-link');
    expect(item).toHaveClass('group/fui-menu-item-link');
    expect(item).toHaveClass('fui-menu-item');
    expect(item).toHaveClass('group/fui-menu-item');
    expect(menuItemLinkClassNames.root).toBe('fui-menu-item-link group/fui-menu-item-link');
  });

  it('applies its own text-decoration reset class on top of MenuItem`s root class', () => {
    const { item } = renderLink();
    const names = item.getAttribute('class')!.split(/\s+/);

    // Under jest every module local named `root` hashes to the same ident (generateTestIdent
    // drops the component token), so MenuItemLink's class and MenuItem's are told apart by
    // COUNT, not by name — a bare toHaveClass would pass with either one deleted.
    const expected = linkStyles.root === itemStyles.root ? 2 : 1;

    expect(names.filter(name => name === linkStyles.root)).toHaveLength(expected);
    expect(names.filter(name => name === itemStyles.root)).toHaveLength(expected);
  });

  it('renders an anchor carrying the href', () => {
    const { item } = renderLink();

    expect(item.tagName).toBe('A');
    expect(item.getAttribute('href')).toBe('https://example.com');
  });

  it('applies the MenuItem slot classes', () => {
    const { item } = renderLink({ icon: <i data-icon="" />, secondaryContent: 'Ctrl+S' });

    expect(item.querySelector(`.${itemStyles.icon}`)).not.toBeNull();
    expect(item.querySelector(`.${itemStyles.content}`)).not.toBeNull();
    expect(item.querySelector(`.${itemStyles.secondaryContent}`)).not.toBeNull();
  });

  it('leaves data-disabled to the headless hook and never duplicates it', () => {
    expect(renderLink({ disabled: true }).item.getAttribute('data-disabled')).toBe('');
    expect(renderLink().item.hasAttribute('data-disabled')).toBe(false);
    expect(
      renderLink({ disabled: true })
        .item.getAttributeNames()
        .filter(name => name === 'data-disabled'),
    ).toHaveLength(1);
  });

  it('renders the checkmark slot EMPTY under hasCheckmarks and injects no glyph', () => {
    // Griffel's MenuItemLink paints no checkmark: its checkmark styles only reserve a hidden
    // 16px gutter, and MenuItemLinkProps has no `checked` for the visible bucket to key off.
    // Injecting one would be pixel-identical and therefore invisible to VR — this is the only
    // net that can catch it.
    const { item } = renderLink({}, { hasCheckmarks: true });
    const checkmark = item.querySelector(`.${itemStyles.checkmark}`);

    expect(checkmark).not.toBeNull();
    expect(checkmark!.childNodes).toHaveLength(0);
    expect(checkmark!.querySelector('svg')).toBeNull();
  });

  it('aligns its reserved gutter with a sibling row that does paint', () => {
    const { container } = render(
      <Menu open>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList hasCheckmarks checkedValues={{ box: ['on'] }}>
            <MenuItemLink {...REQUIRED}>Link</MenuItemLink>
            <MenuItemCheckbox name="box" value="on">
              Checked
            </MenuItemCheckbox>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    const checkmarks = container.querySelectorAll(`.${itemStyles.checkmark}`);

    expect(checkmarks).toHaveLength(2);
    expect(checkmarks[0].childNodes).toHaveLength(0);
    expect(checkmarks[1].querySelector('svg')).not.toBeNull();
  });

  it('keeps a consumer className exactly once', () => {
    const { item } = renderLink({ className: 'consumer' });

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

    const next = useMenuItemLinkStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

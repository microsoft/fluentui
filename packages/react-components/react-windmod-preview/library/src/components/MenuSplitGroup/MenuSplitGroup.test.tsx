import * as React from 'react';
import { render } from '@testing-library/react';

import { classOccurrences } from '../../testing/classOccurrences';
import { isConformant } from '../../testing/isConformant';
import { Menu } from '../Menu/Menu';
import { MenuItem } from '../MenuItem/MenuItem';
import itemStyles from '../MenuItem/MenuItem.module.css';
import { MenuItemLink } from '../MenuItemLink/MenuItemLink';
import { MenuList } from '../MenuList/MenuList';
import { MenuPopover } from '../MenuPopover/MenuPopover';
import { MenuTrigger } from '../MenuTrigger/MenuTrigger';
import { MenuSplitGroup } from './MenuSplitGroup';
import groupStyles from './MenuSplitGroup.module.css';
import { menuSplitGroupClassNames, useMenuSplitGroupStyles } from './useMenuSplitGroupStyles';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/menu', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/menu');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useMenuSplitGroup: (...args: Parameters<typeof actual.useMenuSplitGroup>) =>
      deepFreezeState(actual.useMenuSplitGroup(...args)),
  };
});

type ListProps = { hasIcons?: boolean; hasCheckmarks?: boolean };

const renderGroup = (children: React.ReactNode, listProps: ListProps = {}) => {
  const result = render(
    <Menu open>
      <MenuTrigger>
        <button>Trigger</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList {...listProps}>
          <MenuSplitGroup>{children}</MenuSplitGroup>
        </MenuList>
      </MenuPopover>
    </Menu>,
  );

  return { ...result, group: result.container.querySelector<HTMLElement>('[role="group"]')! };
};

const halves = () => (
  <>
    <MenuItem>Action</MenuItem>
    <MenuItem hasSubmenu>Trigger</MenuItem>
  </>
);

describe('MenuSplitGroup', () => {
  isConformant({
    Component: MenuSplitGroup,
    displayName: 'MenuSplitGroup',
  });

  it('carries its marker pair, its own class first', () => {
    const { group } = renderGroup(halves());

    expect(group.classList[0]).toBe('fui-menu-split-group');
    expect(group).toHaveClass('group/fui-menu-split-group');
    expect(group).toHaveClass(groupStyles.root);
    expect(menuSplitGroupClassNames.root).toBe('fui-menu-split-group group/fui-menu-split-group');
  });

  it('publishes the seam class to every half it holds, and to an anchor-rooted one', () => {
    const { group } = renderGroup(
      <>
        <MenuItemLink href="https://example.com">Action</MenuItemLink>
        <MenuItem hasSubmenu>Trigger</MenuItem>
      </>,
    );
    const [action, trigger] = Array.from(group.children) as HTMLElement[];

    // Under jest every module local named `item` hashes to the same ident, so the assertion is a
    // count on the item's own class attribute rather than a name lookup on the group's.
    expect(classOccurrences(action, groupStyles.item)).toBe(1);
    expect(classOccurrences(trigger, groupStyles.item)).toBe(1);
    expect(action.tagName).toBe('A');
  });

  it('reaches no menu item outside itself', () => {
    const { container } = render(
      <Menu open>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Outside</MenuItem>
            <MenuSplitGroup>{halves()}</MenuSplitGroup>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    const outside = container.querySelector<HTMLElement>('[role="menuitem"]')!;

    expect(classOccurrences(outside, groupStyles.item)).toBe(0);
    expect(classOccurrences(outside, itemStyles.root)).toBe(1);
  });

  it('reaches no menu item inside a submenu opened from one of its halves', () => {
    // The seam is positional, so it must stop at the group's own halves. Griffel bounds its
    // selector with a child combinator; the channel is bounded by MenuList opening a new item
    // scope, which is the same boundary — the submenu surface stays in the DOM tree under the
    // group (no portals), so nothing else would stop it.
    const { container } = render(
      <Menu open>
        <MenuTrigger>
          <button>Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuSplitGroup>
              <MenuItem>Action</MenuItem>
              <Menu open>
                <MenuTrigger>
                  <MenuItem hasSubmenu />
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem>Nested one</MenuItem>
                    <MenuItem>Nested two</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </MenuSplitGroup>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    const group = container.querySelector<HTMLElement>('[role="group"]')!;
    // :scope keeps the descendant combinator anchored to the group — without it the outer list
    // above the group satisfies the [role="menu"] half and the action half matches too.
    const nested = Array.from(group.querySelectorAll<HTMLElement>(':scope [role="menu"] [role="menuitem"]'));

    expect(nested).toHaveLength(2);
    for (const item of nested) {
      expect(classOccurrences(item, groupStyles.item)).toBe(0);
    }
  });

  it('keeps a half`s own className, and the consumer`s last', () => {
    const { group } = renderGroup(
      <>
        <MenuItem className="consumer">Action</MenuItem>
        <MenuItem hasSubmenu>Trigger</MenuItem>
      </>,
    );
    const action = group.children[0];
    const names = action.getAttribute('class')!.split(/\s+/);

    expect(classOccurrences(action, 'consumer')).toBe(1);
    expect(names.indexOf('consumer')).toBe(names.length - 1);
    expect(classOccurrences(action, groupStyles.item)).toBe(1);
  });

  it('drops the trigger half`s icon gutter under hasIcons', () => {
    // useIsInMenuSplitGroup is an identity comparison against the context default, so the group
    // has to provide a value of its own for the trigger half to lose its reserved gutters.
    const { group } = renderGroup(halves(), { hasIcons: true });
    const [action, trigger] = Array.from(group.children) as HTMLElement[];

    expect(action.querySelectorAll(`.${itemStyles.icon}`)).toHaveLength(1);
    expect(trigger.querySelectorAll(`.${itemStyles.icon}`)).toHaveLength(0);
  });

  it('drops the trigger half`s checkmark gutter under hasCheckmarks', () => {
    const { group } = renderGroup(halves(), { hasCheckmarks: true });
    const [action, trigger] = Array.from(group.children) as HTMLElement[];

    expect(action.querySelectorAll(`.${itemStyles.checkmark}`)).toHaveLength(1);
    expect(trigger.querySelectorAll(`.${itemStyles.checkmark}`)).toHaveLength(0);
  });

  it('stamps data-multiline on the reporting half, never on the group', () => {
    const { group } = renderGroup(
      <>
        <MenuItem subText="Supporting text">Action</MenuItem>
        <MenuItem hasSubmenu>Trigger</MenuItem>
      </>,
    );

    expect(group.hasAttribute('data-multiline')).toBe(false);
    expect(group.children[0].hasAttribute('data-multiline')).toBe(true);
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {}, setMultiline: () => undefined }) as never;

    const next = useMenuSplitGroupStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

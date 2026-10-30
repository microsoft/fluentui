import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Menu } from '../Menu/Menu';
import { MenuItem } from '../MenuItem/MenuItem';
import { MenuList } from '../MenuList/MenuList';
import { MenuPopover } from '../MenuPopover/MenuPopover';
import { MenuTrigger } from './MenuTrigger';
import { menuTriggerClassNames, useMenuTriggerStyles } from './useMenuTriggerStyles';

const renderTrigger = (child: React.ReactElement = <button>Trigger</button>) => {
  const result = render(
    <Menu open>
      <MenuTrigger>{child}</MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>One</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>,
  );

  return { ...result, trigger: result.container.firstElementChild as HTMLElement };
};

describe('MenuTrigger', () => {
  isConformant({
    Component: MenuTrigger,
    displayName: 'MenuTrigger',
    requiredProps: { children: <button>Trigger</button> } as never,
    // MenuTrigger renders the consumer's own element, so there is no root of its own to take a
    // ref, and it accepts no className prop.
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
  });

  it('stamps the marker pair on the cloned child', () => {
    const { trigger } = renderTrigger();

    expect(trigger.tagName).toBe('BUTTON');
    expect(trigger).toHaveClass('fui-menu-trigger');
    expect(trigger).toHaveClass('group/fui-menu-trigger');
    expect(trigger.classList[0]).toBe('fui-menu-trigger');
    expect(menuTriggerClassNames.root).toBe('fui-menu-trigger group/fui-menu-trigger');
  });

  it('keeps the child className beside the marker pair, exactly once', () => {
    const { trigger } = renderTrigger(<button className="consumer">Trigger</button>);

    expect(
      trigger
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(trigger).toHaveClass('fui-menu-trigger');
  });

  it('leaves the headless aria wiring intact', () => {
    const { trigger } = renderTrigger();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    expect(trigger.getAttribute('data-open')).toBe('');
  });

  it('is a Fluent trigger component', () => {
    expect((MenuTrigger as unknown as { isFluentTriggerComponent: boolean }).isFluentTriggerComponent).toBe(true);
  });

  it('returns new state without mutating what it was given', () => {
    const children = <button className="given">Trigger</button>;
    const state = Object.freeze({ children, isSubmenu: false });

    const next = useMenuTriggerStyles(state);

    expect(next).not.toBe(state);
    expect(next.children).not.toBe(children);
    expect((children.props as { className: string }).className).toBe('given');
  });

  it('leaves an empty trigger alone', () => {
    const state = Object.freeze({ children: null, isSubmenu: false });

    expect(useMenuTriggerStyles(state)).toBe(state);
  });
});

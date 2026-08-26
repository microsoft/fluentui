import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Menu } from '../Menu/Menu';
import { MenuItem } from '../MenuItem/MenuItem';
import { MenuList } from '../MenuList/MenuList';
import { MenuTrigger } from '../MenuTrigger/MenuTrigger';
import type { MenuPopoverProps } from './MenuPopover.types';
import { MenuPopover } from './MenuPopover';
import { menuPopoverClassNames, useMenuPopoverStyles } from './useMenuPopoverStyles';

import styles from './MenuPopover.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/menu', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/menu');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useMenuPopover: (...args: Parameters<typeof actual.useMenuPopover>) =>
      deepFreezeState(actual.useMenuPopover(...args)),
  };
});

type SurfaceProps = MenuPopoverProps & { ref?: React.Ref<HTMLDivElement> };

const renderPopover = (surfaceProps: SurfaceProps = {}) => {
  const result = render(
    <Menu open>
      <MenuTrigger>
        <button>Trigger</button>
      </MenuTrigger>
      <MenuPopover {...surfaceProps}>
        <MenuList>
          <MenuItem>One</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>,
  );

  return { ...result, surface: result.container.querySelector<HTMLElement>('[popover]')! };
};

describe('MenuPopover', () => {
  isConformant({
    Component: MenuPopover,
    displayName: 'MenuPopover',
  });

  it('stamps the marker pair on the root', () => {
    const { surface } = renderPopover();

    expect(surface).toHaveClass('fui-menu-popover');
    expect(surface).toHaveClass('group/fui-menu-popover');
    expect(surface.classList[0]).toBe('fui-menu-popover');
    expect(menuPopoverClassNames.root).toBe('fui-menu-popover group/fui-menu-popover');
  });

  it('carries the root module class', () => {
    const { surface } = renderPopover();

    expect(surface).toHaveClass(styles.root);
    expect(surface.className).not.toContain('undefined');
  });

  it('defaults popover to auto and lets a consumer override it', () => {
    // popover="auto" is mutually exclusive across a page, so a demo or VR scene that pins several
    // surfaces open needs the consumer value to win over the slot default.
    expect(renderPopover().surface.getAttribute('popover')).toBe('auto');
    expect(renderPopover({ popover: 'manual' }).surface.getAttribute('popover')).toBe('manual');
  });

  it('leaves the headless attributes alone and stamps none of its own', () => {
    const { surface } = renderPopover();

    expect(surface.getAttribute('role')).toBe('presentation');
    expect(surface.getAttributeNames().filter(name => name.startsWith('data-'))).toEqual(['data-placement']);
  });

  it('keeps a consumer className exactly once', () => {
    const { surface } = renderPopover({ className: 'consumer' });

    expect(
      surface
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(surface).toHaveClass(styles.root);
  });

  it('passes native props and the ref through', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { surface } = renderPopover({ ref, 'aria-label': 'surface', style: { opacity: 0.5 } });

    expect(ref.current).toBe(surface);
    expect(surface.getAttribute('aria-label')).toBe('surface');
    expect(surface.style.opacity).toBe('0.5');
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {} }) as never;

    const next = useMenuPopoverStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

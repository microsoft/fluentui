import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { DrawerHeaderNavigation } from './DrawerHeaderNavigation';
import { drawerHeaderNavigationClassNames, useDrawerHeaderNavigationStyles } from './useDrawerHeaderNavigationStyles';

import styles from './DrawerHeaderNavigation.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/drawer', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/drawer');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useDrawerHeaderNavigation: (...args: Parameters<typeof actual.useDrawerHeaderNavigation>) =>
      deepFreezeState(actual.useDrawerHeaderNavigation(...args)),
  };
});

// The root is located structurally and class presence asserted only against this module's own
// imported `styles` object — see OverlayDrawer.test.tsx.
const renderNavigation = (props: React.ComponentProps<typeof DrawerHeaderNavigation> = {}) => {
  const result = render(<DrawerHeaderNavigation {...props}>Drawer navigation</DrawerHeaderNavigation>);

  return { ...result, root: result.container.querySelector<HTMLElement>('nav')! };
};

describe('DrawerHeaderNavigation', () => {
  isConformant({
    Component: DrawerHeaderNavigation,
    displayName: 'DrawerHeaderNavigation',
    requiredProps: { children: 'Drawer navigation' },
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderNavigation();

    expect(root).toHaveClass('fui-drawer-header-navigation');
    expect(root).toHaveClass('group/fui-drawer-header-navigation');
    expect(root.classList[0]).toBe('fui-drawer-header-navigation');
    expect(drawerHeaderNavigationClassNames.root).toBe(
      'fui-drawer-header-navigation group/fui-drawer-header-navigation',
    );
  });

  it('carries the root module class on a nav element', () => {
    const { root } = renderNavigation();

    expect(root.tagName).toBe('NAV');
    expect(root).toHaveClass(styles.root);
    expect(root.className).not.toContain('undefined');
  });

  it('keeps a consumer className exactly once, and passes native props and the ref through', () => {
    const ref = React.createRef<HTMLElement>();
    const { root } = renderNavigation({ ref, className: 'consumer', 'aria-label': 'nav', style: { opacity: 0.5 } });

    expect(ref.current).toBe(root);
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
    expect(root.getAttribute('aria-label')).toBe('nav');
    expect(root.style.opacity).toBe('0.5');
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {} }) as never;

    const next = useDrawerHeaderNavigationStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

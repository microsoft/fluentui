import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerProvider } from '@fluentui/react-headless-components-preview/drawer';

import { isConformant } from '../../testing/isConformant';
import { DrawerHeader } from './DrawerHeader';
import { drawerHeaderClassNames, useDrawerHeaderStyles } from './useDrawerHeaderStyles';

import styles from './DrawerHeader.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/drawer', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/drawer');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useDrawerHeader: (...args: Parameters<typeof actual.useDrawerHeader>) =>
      deepFreezeState(actual.useDrawerHeader(...args)),
  };
});

// The root is located structurally and class presence asserted only against this module's own
// imported `styles` object — see OverlayDrawer.test.tsx.
const renderHeader = (props: React.ComponentProps<typeof DrawerHeader> = {}, scrollState?: string) => {
  const header = <DrawerHeader {...props}>Drawer header</DrawerHeader>;
  const result = render(
    scrollState ? (
      <DrawerProvider value={{ scrollState, setScrollState: jest.fn() } as never}>{header}</DrawerProvider>
    ) : (
      header
    ),
  );

  return { ...result, root: result.container.querySelector<HTMLElement>('header')! };
};

describe('DrawerHeader', () => {
  isConformant({
    Component: DrawerHeader,
    displayName: 'DrawerHeader',
    requiredProps: { children: 'Drawer header' },
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderHeader();

    expect(root).toHaveClass('fui-drawer-header');
    expect(root).toHaveClass('group/fui-drawer-header');
    expect(root.classList[0]).toBe('fui-drawer-header');
    expect(drawerHeaderClassNames.root).toBe('fui-drawer-header group/fui-drawer-header');
  });

  it('carries the root module class on a header element', () => {
    const { root } = renderHeader();

    expect(root.tagName).toBe('HEADER');
    expect(root).toHaveClass(styles.root);
    expect(root.className).not.toContain('undefined');
  });

  it('keeps the role="none" default and lets a consumer override it', () => {
    expect(renderHeader().root.getAttribute('role')).toBe('none');
    expect(renderHeader({ role: 'banner' }).root.getAttribute('role')).toBe('banner');
  });

  it('leaves data-scroll-state to the headless layer, stamped once, as a value', () => {
    expect(renderHeader().root.getAttribute('data-scroll-state')).toBe('none');
    expect(renderHeader({}, 'middle').root.getAttribute('data-scroll-state')).toBe('middle');
    expect(renderHeader({}, 'bottom').root.getAttribute('data-scroll-state')).toBe('bottom');
    expect(
      renderHeader()
        .root.getAttributeNames()
        .filter(name => name === 'data-scroll-state'),
    ).toHaveLength(1);
  });

  it('keeps a consumer className exactly once, and passes native props and the ref through', () => {
    const ref = React.createRef<HTMLElement>();
    const { root } = renderHeader({ ref, className: 'consumer', 'aria-label': 'header', style: { opacity: 0.5 } });

    expect(ref.current).toBe(root);
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
    expect(root.getAttribute('aria-label')).toBe('header');
    expect(root.style.opacity).toBe('0.5');
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {} }) as never;

    const next = useDrawerHeaderStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

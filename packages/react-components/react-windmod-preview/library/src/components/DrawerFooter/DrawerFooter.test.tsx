import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerProvider } from '@fluentui/react-headless-components-preview/drawer';

import { isConformant } from '../../testing/isConformant';
import { DrawerFooter } from './DrawerFooter';
import { drawerFooterClassNames, useDrawerFooterStyles } from './useDrawerFooterStyles';

import styles from './DrawerFooter.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/drawer', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/drawer');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useDrawerFooter: (...args: Parameters<typeof actual.useDrawerFooter>) =>
      deepFreezeState(actual.useDrawerFooter(...args)),
  };
});

// The root is located structurally and class presence asserted only against this module's own
// imported `styles` object — see OverlayDrawer.test.tsx.
const renderFooter = (props: React.ComponentProps<typeof DrawerFooter> = {}, scrollState?: string) => {
  const footer = <DrawerFooter {...props}>Drawer footer</DrawerFooter>;
  const result = render(
    scrollState ? (
      <DrawerProvider value={{ scrollState, setScrollState: jest.fn() } as never}>{footer}</DrawerProvider>
    ) : (
      footer
    ),
  );

  return { ...result, root: result.container.querySelector<HTMLElement>('footer')! };
};

describe('DrawerFooter', () => {
  isConformant({
    Component: DrawerFooter,
    displayName: 'DrawerFooter',
    requiredProps: { children: 'Drawer footer' },
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderFooter();

    expect(root).toHaveClass('fui-drawer-footer');
    expect(root).toHaveClass('group/fui-drawer-footer');
    expect(root.classList[0]).toBe('fui-drawer-footer');
    expect(drawerFooterClassNames.root).toBe('fui-drawer-footer group/fui-drawer-footer');
  });

  it('carries the root module class on a footer element', () => {
    const { root } = renderFooter();

    expect(root.tagName).toBe('FOOTER');
    expect(root).toHaveClass(styles.root);
    expect(root.className).not.toContain('undefined');
  });

  it('keeps the role="none" default and lets a consumer override it', () => {
    expect(renderFooter().root.getAttribute('role')).toBe('none');
    expect(renderFooter({ role: 'contentinfo' }).root.getAttribute('role')).toBe('contentinfo');
  });

  it('leaves data-scroll-state to the headless layer, stamped once, as a value', () => {
    expect(renderFooter().root.getAttribute('data-scroll-state')).toBe('none');
    expect(renderFooter({}, 'middle').root.getAttribute('data-scroll-state')).toBe('middle');
    expect(renderFooter({}, 'top').root.getAttribute('data-scroll-state')).toBe('top');
    expect(
      renderFooter()
        .root.getAttributeNames()
        .filter(name => name === 'data-scroll-state'),
    ).toHaveLength(1);
  });

  it('keeps a consumer className exactly once, and passes native props and the ref through', () => {
    const ref = React.createRef<HTMLElement>();
    const { root } = renderFooter({ ref, className: 'consumer', 'aria-label': 'footer', style: { opacity: 0.5 } });

    expect(ref.current).toBe(root);
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
    expect(root.getAttribute('aria-label')).toBe('footer');
    expect(root.style.opacity).toBe('0.5');
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {} }) as never;

    const next = useDrawerFooterStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

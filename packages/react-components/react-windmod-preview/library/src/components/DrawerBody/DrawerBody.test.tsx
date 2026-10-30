import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { DrawerBody } from './DrawerBody';
import { drawerBodyClassNames, useDrawerBodyStyles } from './useDrawerBodyStyles';

import styles from './DrawerBody.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/drawer', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/drawer');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useDrawerBody: (...args: Parameters<typeof actual.useDrawerBody>) => deepFreezeState(actual.useDrawerBody(...args)),
  };
});

// The root is located structurally and class presence asserted only against this module's own
// imported `styles` object — see OverlayDrawer.test.tsx.
const renderBody = (props: React.ComponentProps<typeof DrawerBody> = {}) => {
  const result = render(<DrawerBody {...props}>Drawer body</DrawerBody>);

  return { ...result, root: result.container.firstElementChild as HTMLElement };
};

describe('DrawerBody', () => {
  isConformant({
    Component: DrawerBody,
    displayName: 'DrawerBody',
    requiredProps: { children: 'Drawer body' },
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderBody();

    expect(root).toHaveClass('fui-drawer-body');
    expect(root).toHaveClass('group/fui-drawer-body');
    expect(root.classList[0]).toBe('fui-drawer-body');
    expect(drawerBodyClassNames.root).toBe('fui-drawer-body group/fui-drawer-body');
  });

  it('carries the root module class on a div', () => {
    const { root } = renderBody();

    expect(root.tagName).toBe('DIV');
    expect(root).toHaveClass(styles.root);
    expect(root.className).not.toContain('undefined');
  });

  it('keeps a consumer className exactly once, and passes native props and the ref through', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { root } = renderBody({ ref, className: 'consumer', 'aria-label': 'body', style: { opacity: 0.5 } });

    expect(ref.current).toBe(root);
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
    expect(root.getAttribute('aria-label')).toBe('body');
    expect(root.style.opacity).toBe('0.5');
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {} }) as never;

    const next = useDrawerBodyStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

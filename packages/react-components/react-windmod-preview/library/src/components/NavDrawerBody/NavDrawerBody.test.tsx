import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { NavDrawerBody } from './NavDrawerBody';
import { navDrawerBodyClassNames, useNavDrawerBodyStyles } from './useNavDrawerBodyStyles';

import styles from './NavDrawerBody.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/nav', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/nav');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useNavDrawerBody: (...args: Parameters<typeof actual.useNavDrawerBody>) =>
      deepFreezeState(actual.useNavDrawerBody(...args)),
  };
});

// `fuicm-root` is the same jest ident for this module and DrawerBody's, so the class this layer
// adds is counted rather than merely found — see the note in Nav.test.tsx.
const classCount = (element: HTMLElement, name: string): number =>
  element
    .getAttribute('class')!
    .split(/\s+/)
    .filter(entry => entry === name).length;

const renderBody = (props: React.ComponentProps<typeof NavDrawerBody> = {}) => {
  const result = render(<NavDrawerBody {...props}>Nav drawer body</NavDrawerBody>);

  return { ...result, root: result.container.firstElementChild as HTMLElement };
};

describe('NavDrawerBody', () => {
  isConformant({
    Component: NavDrawerBody,
    displayName: 'NavDrawerBody',
    requiredProps: { children: 'Nav drawer body' },
  });

  it('stamps the marker pair, slash-free class first', () => {
    const { root } = renderBody();

    expect(root).toHaveClass('fui-nav-drawer-body');
    expect(root).toHaveClass('group/fui-nav-drawer-body');
    expect(root.classList[0]).toBe('fui-nav-drawer-body');
    expect(navDrawerBodyClassNames.root).toBe('fui-nav-drawer-body group/fui-nav-drawer-body');
  });

  it('keeps the composed DrawerBody’s marker pair and module class beneath its own', () => {
    const { root } = renderBody();

    expect(root).toHaveClass('fui-drawer-body');
    expect(root).toHaveClass('group/fui-drawer-body');
    expect(classCount(root, styles.root)).toBe(2);
    expect(root.className).not.toContain('undefined');
  });

  it('carries the root module class on a div, and no icon slot exists to compose', () => {
    const { root } = renderBody();

    expect(root.tagName).toBe('DIV');
    expect(useNavDrawerBodyStyles({ root: {}, components: {} } as never)).not.toHaveProperty('icon');
  });

  it('keeps the headless navigation role, stamped once', () => {
    const { root } = renderBody();

    expect(root.getAttribute('role')).toBe('navigation');
    expect(root.getAttributeNames().filter(entry => entry === 'role')).toHaveLength(1);
  });

  it('keeps a consumer className exactly once, last, and passes native props and the ref through', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { root } = renderBody({ ref, className: 'consumer', 'aria-label': 'body', style: { opacity: 0.5 } });
    const names = root.getAttribute('class')!.split(/\s+/);

    expect(ref.current).toBe(root);
    expect(names.filter(entry => entry === 'consumer')).toHaveLength(1);
    expect(names[names.length - 1]).toBe('consumer');
    expect(root.getAttribute('aria-label')).toBe('body');
    expect(root.style.opacity).toBe('0.5');
  });

  it('renders the same DOM shape for absent and null children', () => {
    for (const children of [undefined, null]) {
      const { container } = render(<NavDrawerBody>{children}</NavDrawerBody>);

      expect(container.firstElementChild!.childElementCount).toBe(0);
    }
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {} }) as never;

    const next = useNavDrawerBodyStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

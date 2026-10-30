import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { NavItem } from '../NavItem/NavItem';
import { NavDrawerBody } from '../NavDrawerBody/NavDrawerBody';
import { NavDrawer } from './NavDrawer';
import { navDrawerClassNames, useNavDrawerStyles } from './useNavDrawerStyles';

import styles from './NavDrawer.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/nav', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/nav');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useNavDrawer: (...args: Parameters<typeof actual.useNavDrawer>) => deepFreezeState(actual.useNavDrawer(...args)),
  };
});

// `fuicm-root` is the same jest ident for every module in this family, so a class this layer adds
// is counted rather than merely found — see the note in Nav.test.tsx.
const classCount = (element: HTMLElement, name: string): number =>
  element
    .getAttribute('class')!
    .split(/\s+/)
    .filter(entry => entry === name).length;

const renderInline = (props: Record<string, unknown> = {}) => {
  const result = render(
    <NavDrawer type="inline" open {...props}>
      <NavDrawerBody>
        <NavItem value="1">Home</NavItem>
      </NavDrawerBody>
    </NavDrawer>,
  );

  return { ...result, root: result.container.querySelector<HTMLElement>('.fui-nav-drawer')! };
};

describe('NavDrawer', () => {
  isConformant({
    Component: NavDrawer,
    displayName: 'NavDrawer',
    requiredProps: { children: 'Nav drawer content', open: true },
  });

  it('stamps the marker pair, slash-free class first', () => {
    const { root } = renderInline();

    expect(root).toHaveClass('fui-nav-drawer');
    expect(root).toHaveClass('group/fui-nav-drawer');
    // The drawer it re-slots composes its own pair last, so classList[0] is that pair's
    // slash-free half — the whole of the nwsapi constraint componentMarkers documents.
    expect(root.classList[0]).toBe('fui-inline-drawer');
    expect(root.classList[0]).not.toContain('/');
    expect(navDrawerClassNames.root).toBe('fui-nav-drawer group/fui-nav-drawer');
  });

  it('carries its own root module class beside the drawer’s', () => {
    const { root } = renderInline();

    expect(classCount(root, styles.root)).toBe(2);
    expect(root.className).not.toContain('undefined');
  });

  it('applies the default width only while size is unset', () => {
    expect(renderInline().root).toHaveClass(styles.defaultWidth);

    for (const size of ['small', 'medium', 'large', 'full'] as const) {
      expect(renderInline({ size }).root).not.toHaveClass(styles.defaultWidth);
    }
  });

  it('passes size through to the drawer beneath, which resolves its own default', () => {
    expect(renderInline().root.getAttribute('data-size')).toBe('small');
    expect(renderInline({ size: 'large' }).root.getAttribute('data-size')).toBe('large');
  });

  it('renders the styled drawer pair for both types', () => {
    const { root } = renderInline();

    expect(root.tagName).toBe('DIV');
    expect(root).toHaveClass('fui-drawer');
    expect(root).toHaveClass('fui-inline-drawer');

    const overlay = render(<NavDrawer open>Nav drawer content</NavDrawer>).container.querySelector('dialog')!;

    expect(overlay).toHaveClass('fui-nav-drawer');
    expect(overlay).toHaveClass('fui-overlay-drawer');
  });

  it('keeps the render function a children slot function supplies', () => {
    const children = ((Root: React.ElementType, props: Record<string, unknown>) => (
      <Root {...props} data-render-function="fired" />
    )) as unknown as React.ReactNode;

    const { container } = render(
      <NavDrawer type="inline" open>
        {children}
      </NavDrawer>,
    );

    expect(container.querySelector('[data-render-function="fired"]')).toBeInTheDocument();
  });

  it.each([
    ['small', 'small'],
    ['medium', 'medium'],
    [undefined, 'medium'],
  ] as const)('publishes density %s to its rows as %s', (density, expected) => {
    const { container } = renderInline({ density });

    expect(container.querySelector('.fui-nav-item')!.getAttribute('data-density')).toBe(expected);
  });

  it('does not stamp data-density on itself', () => {
    expect(renderInline({ density: 'small' }).root.hasAttribute('data-density')).toBe(false);
  });

  it('keeps the headless stamps through the decoration, none of them duplicated', () => {
    const { root, container } = renderInline();

    // Headless puts the navigation role on the body, not on this root — see MIGRATION.
    expect(root.hasAttribute('role')).toBe(false);
    expect(container.querySelector('[role="navigation"]')).toBeInTheDocument();

    for (const name of ['data-position', 'data-size']) {
      expect(root.getAttributeNames().filter(entry => entry === name)).toHaveLength(1);
    }
  });

  it('warns about no slot mismatch in development', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    renderInline();

    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders the same DOM shape for absent and null children', () => {
    for (const children of [undefined, null]) {
      const { container } = render(
        <NavDrawer type="inline" open>
          {children}
        </NavDrawer>,
      );

      expect(container.querySelector('.fui-nav-drawer')).toBeInTheDocument();
      expect(container.querySelector('.fui-nav-drawer')!.childElementCount).toBe(0);
    }
  });

  it('keeps a consumer className exactly once, last', () => {
    const { root } = renderInline({ className: 'consumer' });
    const names = root.getAttribute('class')!.split(/\s+/);

    expect(names.filter(entry => entry === 'consumer')).toHaveLength(1);
    expect(names[names.length - 1]).toBe('consumer');
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: { root: 'div' } }) as never;

    const next = useNavDrawerStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

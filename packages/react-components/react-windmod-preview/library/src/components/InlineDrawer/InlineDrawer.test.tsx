import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import type { DrawerSize } from './InlineDrawer.types';
import { InlineDrawer } from './InlineDrawer';
import { inlineDrawerClassNames, useInlineDrawerStyles } from './useInlineDrawerStyles';

import styles from './InlineDrawer.module.css';

// Frozen-state guard — see testing/freezeState.ts, and OverlayDrawer.test.tsx for why the seam is
// the headless hook's return rather than anything earlier.
jest.mock('@fluentui/react-headless-components-preview/drawer', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/drawer');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useInlineDrawer: (...args: Parameters<typeof actual.useInlineDrawer>) =>
      deepFreezeState(actual.useInlineDrawer(...args)),
  };
});

const sizes: DrawerSize[] = ['small', 'medium', 'large', 'full'];

// The root is addressed structurally and class presence asserted only against this module's own
// imported `styles` object — see OverlayDrawer.test.tsx.
const renderDrawer = (props: React.ComponentProps<typeof InlineDrawer> = {}) => {
  const result = render(
    <InlineDrawer open {...props}>
      Drawer content
    </InlineDrawer>,
  );

  return { ...result, root: result.container.querySelector<HTMLElement>('[data-position]')! };
};

describe('InlineDrawer', () => {
  isConformant({
    Component: InlineDrawer,
    displayName: 'InlineDrawer',
    requiredProps: { children: 'Drawer content', open: true },
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderDrawer();

    expect(root).toHaveClass('fui-inline-drawer');
    expect(root).toHaveClass('group/fui-inline-drawer');
    expect(root.classList[0]).toBe('fui-inline-drawer');
    expect(inlineDrawerClassNames.root).toBe('fui-inline-drawer group/fui-inline-drawer');
  });

  it('carries the root module class', () => {
    const { root } = renderDrawer();

    expect(root).toHaveClass(styles.root);
    expect(root.className).not.toContain('undefined');
  });

  it('renders a div, never an aside, by default', () => {
    expect(renderDrawer().root.tagName).toBe('DIV');
  });

  it('stamps data-size for every size, as a value and never as a presence flag', () => {
    sizes.forEach(size => {
      expect(renderDrawer({ size }).root.getAttribute('data-size')).toBe(size);
    });
  });

  it('defaults the size to small', () => {
    expect(renderDrawer().root.getAttribute('data-size')).toBe('small');
  });

  it('stamps data-separator as "true" when set, and leaves it absent otherwise', () => {
    expect(renderDrawer({ separator: true }).root.getAttribute('data-separator')).toBe('true');

    const { root } = renderDrawer();

    expect(root).not.toHaveAttribute('data-separator');
    expect(root.getAttribute('data-separator')).not.toBe('');
  });

  it('leaves the open and position attributes to the headless layer, stamped once each', () => {
    const { root } = renderDrawer({ position: 'end' });

    expect(root.getAttribute('data-open')).toBe('');
    expect(root.getAttribute('data-position')).toBe('end');
    expect(root.getAttributeNames().filter(name => name === 'data-position')).toHaveLength(1);
    expect(root.getAttributeNames().filter(name => name === 'data-open')).toHaveLength(1);
  });

  it('hides a closed drawer from assistive technology when it stays mounted', () => {
    const result = render(
      <InlineDrawer unmountOnClose={false} open={false}>
        Drawer content
      </InlineDrawer>,
    );

    expect(result.container.querySelector('[data-position]')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders nothing when closed and unmountOnClose is true', () => {
    const result = render(<InlineDrawer open={false}>Drawer content</InlineDrawer>);

    expect(result.container).toBeEmptyDOMElement();
  });

  it('keeps a consumer className exactly once, and passes native props and the ref through', () => {
    const ref = React.createRef<HTMLElement>();
    const { root } = renderDrawer({ ref, className: 'consumer', 'aria-label': 'drawer', style: { opacity: 0.5 } });

    expect(ref.current).toBe(root);
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
    expect(root.getAttribute('aria-label')).toBe('drawer');
    expect(root.style.opacity).toBe('0.5');
  });

  it('adds no attribute the headless layer already owns', () => {
    // Asserted at the hook seam rather than in the DOM — see OverlayDrawer.test.tsx.
    const state = Object.freeze({
      root: Object.freeze({}),
      components: {},
      size: 'small',
      separator: true,
      position: 'start',
    }) as never;

    expect(Object.keys(useInlineDrawerStyles(state).root).sort()).toEqual(['className', 'data-separator', 'data-size']);
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {}, size: 'large', separator: true }) as never;

    const next = useInlineDrawerStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
    expect((root as Record<string, unknown>)['data-size']).toBeUndefined();
    expect((root as Record<string, unknown>)['data-separator']).toBeUndefined();
  });
});

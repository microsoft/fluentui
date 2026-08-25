import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import type { DrawerSize } from './OverlayDrawer.types';
import { OverlayDrawer } from './OverlayDrawer';
import { overlayDrawerClassNames, useOverlayDrawerStyles } from './useOverlayDrawerStyles';

import styles from './OverlayDrawer.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts. The seam is the
// headless hook's RETURN, not its internals: three headless Drawer hooks write to state.root
// before returning, which is their code and not this layer's convention to enforce.
jest.mock('@fluentui/react-headless-components-preview/drawer', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/drawer');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useOverlayDrawer: (...args: Parameters<typeof actual.useOverlayDrawer>) =>
      deepFreezeState(actual.useOverlayDrawer(...args)),
  };
});

const sizes: DrawerSize[] = ['small', 'medium', 'large', 'full'];

// generateTestIdent drops the component token under jest, so every module local in this package
// stringifies alike. The surface is addressed structurally and class presence is only ever
// asserted against this module's own imported `styles` object.
const renderDrawer = (props: React.ComponentProps<typeof OverlayDrawer> = {}) => {
  const result = render(
    <OverlayDrawer open {...props}>
      Drawer content
    </OverlayDrawer>,
  );

  // Scoped to this render's own container: several cases render more than once, and every drawer
  // stays in document.body until the test ends.
  return { ...result, surface: result.container.querySelector<HTMLDialogElement>('dialog')! };
};

describe('OverlayDrawer', () => {
  isConformant({
    Component: OverlayDrawer,
    displayName: 'OverlayDrawer',
    requiredProps: { children: 'Drawer content', open: true },
  });

  it('stamps the marker pair on the root', () => {
    const { surface } = renderDrawer();

    expect(surface).toHaveClass('fui-overlay-drawer');
    expect(surface).toHaveClass('group/fui-overlay-drawer');
    expect(surface.classList[0]).toBe('fui-overlay-drawer');
    expect(overlayDrawerClassNames.root).toBe('fui-overlay-drawer group/fui-overlay-drawer');
  });

  it('carries the root module class', () => {
    const { surface } = renderDrawer();

    expect(surface).toHaveClass(styles.root);
    expect(surface.className).not.toContain('undefined');
  });

  it('stamps data-size for every size, as a value and never as a presence flag', () => {
    sizes.forEach(size => {
      const { surface } = renderDrawer({ size });

      expect(surface.getAttribute('data-size')).toBe(size);
    });
  });

  it('defaults the size to small', () => {
    expect(renderDrawer().surface.getAttribute('data-size')).toBe('small');
  });

  it('has no separator prop and stamps no data-separator', () => {
    // separator is InlineDrawer-only, matching Griffel; an overlay drawer has no adjacent content
    // to separate itself from.
    const { surface } = renderDrawer({ separator: true } as never);

    expect(surface).not.toHaveAttribute('data-separator');
  });

  it('leaves the open, position and modal attributes to the headless layer, stamped once each', () => {
    const { surface } = renderDrawer({ position: 'end' });

    expect(surface.tagName).toBe('DIALOG');
    expect(surface.getAttribute('data-open')).toBe('');
    expect(surface.getAttribute('data-position')).toBe('end');
    expect(surface.getAttribute('data-modal-type')).toBe('modal');
    expect(surface.getAttribute('aria-modal')).toBe('true');
    expect(surface.getAttribute('tabindex')).toBe('-1');

    // Duplicating a headless stamp in this layer would show up here as a second occurrence.
    expect(surface.getAttributeNames().filter(name => name === 'data-position')).toHaveLength(1);
    expect(surface.getAttributeNames().filter(name => name === 'data-open')).toHaveLength(1);
  });

  it('defaults the position to start', () => {
    expect(renderDrawer().surface.getAttribute('data-position')).toBe('start');
  });

  it('gives an alert drawer the alertdialog role', () => {
    expect(renderDrawer({ modalType: 'alert' }).surface.getAttribute('data-modal-type')).toBe('alert');
  });

  it('keeps a consumer className exactly once, and passes native props and the ref through', () => {
    const ref = React.createRef<HTMLDialogElement>();
    const { surface } = renderDrawer({ ref, className: 'consumer', 'aria-label': 'drawer', style: { opacity: 0.5 } });

    expect(ref.current).toBe(surface);
    expect(
      surface
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(surface).toHaveClass(styles.root);
    expect(surface.getAttribute('aria-label')).toBe('drawer');
    expect(surface.style.opacity).toBe('0.5');
  });

  it('adds no attribute the headless layer already owns', () => {
    // A duplicate stamp of the same value is invisible in the DOM — attribute names are unique —
    // so the no-duplication rule has to be asserted where the duplicate would be introduced.
    const state = Object.freeze({ root: Object.freeze({}), components: {}, size: 'small', position: 'start' }) as never;

    expect(Object.keys(useOverlayDrawerStyles(state).root).sort()).toEqual(['className', 'data-size']);
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {}, size: 'medium' }) as never;

    const next = useOverlayDrawerStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
    expect((root as Record<string, unknown>)['data-size']).toBeUndefined();
  });
});

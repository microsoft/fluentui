import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { inlineDrawerClassNames } from '../InlineDrawer/useInlineDrawerStyles';
import { overlayDrawerClassNames } from '../OverlayDrawer/useOverlayDrawerStyles';
import { Drawer } from './Drawer';
import { drawerClassNames, useDrawerStyles } from './useDrawerStyles';

describe('Drawer', () => {
  isConformant({
    Component: Drawer,
    displayName: 'Drawer',
    requiredProps: { children: 'Drawer content', open: true },
  });

  it('renders the styled OverlayDrawer by default', () => {
    const result = render(<Drawer open>Drawer content</Drawer>);
    const surface = result.container.querySelector('dialog')!;

    expect(surface).toBeInTheDocument();
    expect(surface.tagName).toBe('DIALOG');
    expect(surface).toHaveAttribute('aria-modal', 'true');
    // The styled child, not the headless one: Drawer overrides components.root because the
    // headless type switch hard-binds its own unstyled pair.
    expect(surface).toHaveClass('fui-overlay-drawer');
  });

  it('renders the styled InlineDrawer for type="inline"', () => {
    const result = render(
      <Drawer type="inline" open>
        Drawer content
      </Drawer>,
    );
    const root = result.container.querySelector<HTMLElement>('[data-position]')!;

    expect(root.tagName).toBe('DIV');
    expect(root).not.toHaveAttribute('aria-modal');
    expect(root).toHaveClass('fui-inline-drawer');
    expect(result.container.querySelector('dialog')).toBeNull();
  });

  it('stamps its own marker pair alongside the child drawer’s', () => {
    const result = render(<Drawer open>Drawer content</Drawer>);
    const surface = result.container.querySelector('dialog')!;

    expect(surface).toHaveClass('fui-drawer');
    expect(surface).toHaveClass('group/fui-drawer');
    expect(surface).toHaveClass('fui-overlay-drawer');
    expect(surface).toHaveClass('group/fui-overlay-drawer');
    // The child drawer composes its own pair first and appends this one, so classList[0] is the
    // child's slash-free marker — which is all the nwsapi constraint componentMarkers documents
    // requires.
    expect(surface.classList[0]).toBe('fui-overlay-drawer');
    expect(drawerClassNames.root).toBe('fui-drawer group/fui-drawer');
    expect(overlayDrawerClassNames.root).toBe('fui-overlay-drawer group/fui-overlay-drawer');
    expect(inlineDrawerClassNames.root).toBe('fui-inline-drawer group/fui-inline-drawer');
  });

  it('passes the look props and everything else through to the drawer it selects', () => {
    const overlay = render(
      <Drawer open size="large" position="end">
        Drawer content
      </Drawer>,
    ).container.querySelector('dialog')!;

    expect(overlay.getAttribute('data-size')).toBe('large');
    expect(overlay.getAttribute('data-position')).toBe('end');

    const inline = render(
      <Drawer type="inline" open size="full" separator position="bottom">
        Drawer content
      </Drawer>,
    ).container.querySelector<HTMLElement>('[data-position]')!;

    expect(inline.getAttribute('data-size')).toBe('full');
    expect(inline.getAttribute('data-position')).toBe('bottom');
    expect(inline.getAttribute('data-separator')).toBe('true');
  });

  it('keeps a consumer className exactly once', () => {
    const surface = render(
      <Drawer open className="consumer">
        Drawer content
      </Drawer>,
    ).container.querySelector('dialog')!;

    expect(
      surface
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: { root: 'div' } }) as never;

    const next = useDrawerStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

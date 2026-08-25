import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Popover } from '../Popover/Popover';
import type { PopoverProps, PopoverSize } from '../Popover/Popover.types';
import { PopoverTrigger } from '../PopoverTrigger/PopoverTrigger';
import type { PopoverSurfaceProps } from './PopoverSurface.types';
import { PopoverSurface } from './PopoverSurface';
import { popoverSurfaceClassNames, usePopoverSurfaceStyles } from './usePopoverSurfaceStyles';

import styles from './PopoverSurface.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/popover', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/popover');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    usePopoverSurface: (...args: Parameters<typeof actual.usePopoverSurface>) =>
      deepFreezeState(actual.usePopoverSurface(...args)),
  };
});

const sizes: PopoverSize[] = ['small', 'medium', 'large'];
const paddingClasses: Record<PopoverSize, string> = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

// generateTestIdent drops the component token under jest, so every module local in this package
// stringifies alike. The surface is addressed structurally and class presence is only ever
// asserted against this module's own imported `styles` object.
type SurfaceProps = PopoverSurfaceProps & { ref?: React.Ref<HTMLDialogElement> };

const renderSurface = (popoverProps: Partial<PopoverProps> = {}, surfaceProps: SurfaceProps = {}) => {
  const result = render(
    <Popover defaultOpen {...popoverProps}>
      <PopoverTrigger>
        <button>Trigger</button>
      </PopoverTrigger>
      <PopoverSurface {...surfaceProps}>Content</PopoverSurface>
    </Popover>,
  );

  return { ...result, surface: result.container.querySelector<HTMLElement>('[data-popover-surface]')! };
};

describe('PopoverSurface', () => {
  isConformant({
    Component: PopoverSurface,
    displayName: 'PopoverSurface',
  });

  it('stamps the marker pair on the root', () => {
    const { surface } = renderSurface();

    expect(surface).toHaveClass('fui-popover-surface');
    expect(surface).toHaveClass('group/fui-popover-surface');
    expect(surface.classList[0]).toBe('fui-popover-surface');
    expect(popoverSurfaceClassNames.root).toBe('fui-popover-surface group/fui-popover-surface');
  });

  it('carries the root module class', () => {
    const { surface } = renderSurface();

    expect(surface).toHaveClass(styles.root);
    expect(surface.className).not.toContain('undefined');
  });

  it('selects the padding class and stamps data-size for every size', () => {
    sizes.forEach(size => {
      const { surface } = renderSurface({ size });

      expect(surface.getAttribute('data-size')).toBe(size);
      expect(surface).toHaveClass(paddingClasses[size]);

      sizes
        .filter(other => other !== size && paddingClasses[other] !== paddingClasses[size])
        .forEach(other => expect(surface).not.toHaveClass(paddingClasses[other]));
    });
  });

  it('defaults the size to medium', () => {
    const { surface } = renderSurface();

    expect(surface.getAttribute('data-size')).toBe('medium');
    expect(surface).toHaveClass(styles.medium);
  });

  it('selects the appearance class, and neither one by default', () => {
    expect(renderSurface({ appearance: 'inverted' }).surface).toHaveClass(styles.inverted);
    expect(renderSurface({ appearance: 'brand' }).surface).toHaveClass(styles.brand);

    const { surface } = renderSurface();

    expect(surface).not.toHaveClass(styles.inverted);
    expect(surface).not.toHaveClass(styles.brand);
  });

  it('keeps a consumer className exactly once', () => {
    const { surface } = renderSurface({}, { className: 'consumer' });

    expect(
      surface
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(surface).toHaveClass(styles.root);
  });

  it('leaves the open-state attributes to the headless hook', () => {
    const { surface } = renderSurface();

    // The headless library's own presence spelling, stamped once each — our layer adds data-size
    // and nothing else.
    expect(surface.getAttribute('data-open')).toBe('');
    expect(surface.getAttribute('data-popover-surface')).toBe('');
    expect(surface.id).toMatch(/^fui-popover-surface-/);
    expect(surface.getAttributeNames().sort()).toEqual([
      'class',
      'data-open',
      'data-placement',
      'data-popover-surface',
      'data-size',
      'id',
      'popover',
      'role',
      'style',
    ]);
  });

  it('takes its id from the popover, because the trigger points aria-details at it', () => {
    const { surface, getByRole } = renderSurface();

    expect(getByRole('button').getAttribute('aria-details')).toBe(surface.id);

    // The id is the popover's to own — a surface-level id would break the pairing the trigger
    // already published, so `Popover`'s `id` prop is the channel.
    expect(renderSurface({ id: 'given' }).surface.id).toBe('given');
    expect(renderSurface({}, { id: 'ignored' }).surface.id).toMatch(/^fui-popover-surface-/);
  });

  it('lets a consumer set the popover type', () => {
    // popover="auto" is mutually exclusive across a page, so a demo that pins several open needs
    // this prop to win over the slot default.
    expect(renderSurface().surface.getAttribute('popover')).toBe('auto');
    expect(renderSurface({}, { popover: 'manual' }).surface.getAttribute('popover')).toBe('manual');
  });

  it('takes its role from trapFocus', () => {
    expect(renderSurface().surface.getAttribute('role')).toBe('group');
    expect(renderSurface({ trapFocus: true }).surface.getAttribute('role')).toBe('dialog');
  });

  it('renders the arrow only with withArrow, and reaches it without a class', () => {
    const { surface } = renderSurface({ withArrow: true });
    const arrow = surface.querySelector('[data-arrow]')!;

    // The headless renderer gives the arrow no className channel, so the module reaches it as a
    // descendant of the root — see PopoverSurface.module.css.
    expect(arrow).not.toBeNull();
    expect(arrow.getAttribute('class')).toBeNull();
    expect(arrow.parentElement).toBe(surface);
    expect(surface.firstElementChild).toBe(arrow);

    expect(renderSurface().surface.querySelector('[data-arrow]')).toBeNull();
  });

  it('passes native props and the ref through', () => {
    const ref = React.createRef<HTMLDialogElement>();
    const { surface } = renderSurface({}, { ref, 'aria-label': 'surface', style: { opacity: 0.5 } });

    expect(ref.current).toBe(surface);
    expect(surface.getAttribute('aria-label')).toBe('surface');
    expect(surface.style.opacity).toBe('0.5');
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {}, size: 'small' }) as never;

    const next = usePopoverSurfaceStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
    expect((root as Record<string, unknown>)['data-size']).toBeUndefined();
  });
});

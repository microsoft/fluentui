import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from '../TeachingPopover/TeachingPopover';
import type { TeachingPopoverProps } from '../TeachingPopover/TeachingPopover.types';
import { TeachingPopoverTrigger } from '../TeachingPopoverTrigger/TeachingPopoverTrigger';
import { popoverSurfaceClassNames } from '../PopoverSurface/usePopoverSurfaceStyles';
import type { TeachingPopoverSurfaceProps } from './TeachingPopoverSurface.types';
import { TeachingPopoverSurface } from './TeachingPopoverSurface';
import { teachingPopoverSurfaceClassNames, useTeachingPopoverSurfaceStyles } from './useTeachingPopoverSurfaceStyles';

import popoverStyles from '../PopoverSurface/PopoverSurface.module.css';
import styles from './TeachingPopoverSurface.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/teaching-popover', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/teaching-popover');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTeachingPopoverSurface: (...args: Parameters<typeof actual.useTeachingPopoverSurface>) =>
      deepFreezeState(actual.useTeachingPopoverSurface(...args)),
  };
});

type SurfaceProps = TeachingPopoverSurfaceProps & { ref?: React.Ref<HTMLDialogElement> };

const renderSurface = (popoverProps: Partial<TeachingPopoverProps> = {}, surfaceProps: SurfaceProps = {}) => {
  const result = render(
    <TeachingPopover defaultOpen {...popoverProps}>
      <TeachingPopoverTrigger>
        <button>Trigger</button>
      </TeachingPopoverTrigger>
      <TeachingPopoverSurface {...surfaceProps}>Content</TeachingPopoverSurface>
    </TeachingPopover>,
  );

  return { ...result, surface: result.container.querySelector<HTMLElement>('[data-popover-surface]')! };
};

const classCount = (element: HTMLElement, name: string) =>
  element
    .getAttribute('class')!
    .split(/\s+/)
    .filter(one => one === name).length;

describe('TeachingPopoverSurface', () => {
  isConformant({
    Component: TeachingPopoverSurface,
    displayName: 'TeachingPopoverSurface',
  });

  it('stamps BOTH marker pairs, teaching first and each in order', () => {
    const { surface } = renderSurface();
    const names = surface.getAttribute('class')!.split(/\s+/);

    expect(names[0]).toBe('fui-teaching-popover-surface');
    expect(names.indexOf('fui-teaching-popover-surface')).toBeLessThan(
      names.indexOf('group/fui-teaching-popover-surface'),
    );
    expect(names.indexOf('fui-popover-surface')).toBeLessThan(names.indexOf('group/fui-popover-surface'));

    expect(teachingPopoverSurfaceClassNames.root).toBe(
      'fui-teaching-popover-surface group/fui-teaching-popover-surface',
    );
    expect(popoverSurfaceClassNames.root).toBe('fui-popover-surface group/fui-popover-surface');
  });

  it('keeps the Popover group marker, which every arrow placement rule keys on', () => {
    // Measured: removing `group/fui-popover-surface` moves every arrow placement inset and
    // collapses its rotation, while removing the bare identity class moves no pixel at all.
    const { surface } = renderSurface();

    expect(surface).toHaveClass('group/fui-popover-surface');
    expect(surface).toHaveClass('fui-popover-surface');
  });

  it('carries its own l2 class BESIDE the composed Popover root class', () => {
    // generateTestIdent drops the component token, so both modules' `.root` stringify alike:
    // the only jest-visible signature of the l2 class is that the name appears TWICE.
    const { surface } = renderSurface();

    expect(styles.root).toBe(popoverStyles.root);
    expect(classCount(surface, styles.root)).toBe(2);
  });

  it('composes the Popover styles hook, so size still selects a padding class', () => {
    expect(renderSurface({ size: 'small' }).surface).toHaveClass(popoverStyles.small);
    expect(renderSurface({ size: 'large' }).surface).toHaveClass(popoverStyles.large);

    const { surface } = renderSurface();

    expect(surface).toHaveClass(popoverStyles.medium);
    expect(surface.getAttribute('data-size')).toBe('medium');
  });

  it('leaves the headless attributes alone and never duplicates one', () => {
    const { surface } = renderSurface();

    expect(surface.getAttribute('data-open')).toBe('');
    expect(surface.getAttribute('data-popover-surface')).toBe('');
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

  it('renders the arrow by default, and reaches it without a class', () => {
    const { surface } = renderSurface();
    const arrow = surface.querySelector('[data-arrow]')!;

    expect(arrow).not.toBeNull();
    expect(arrow.getAttribute('class')).toBeNull();
    expect(surface.firstElementChild).toBe(arrow);
  });

  it('keeps a consumer className exactly once', () => {
    const { surface } = renderSurface({}, { className: 'consumer' });

    expect(classCount(surface, 'consumer')).toBe(1);
    expect(surface).toHaveClass(styles.root);
  });

  it('passes native props and the ref through', () => {
    const ref = React.createRef<HTMLDialogElement>();
    const { surface } = renderSurface({}, { ref, 'aria-label': 'surface' });

    expect(ref.current).toBe(surface);
    expect(surface.getAttribute('aria-label')).toBe('surface');
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {}, size: 'medium' }) as never;

    const next = useTeachingPopoverSurfaceStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});

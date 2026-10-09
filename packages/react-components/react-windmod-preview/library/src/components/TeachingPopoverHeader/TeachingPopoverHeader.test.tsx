import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from '../TeachingPopover/TeachingPopover';
import type { TeachingPopoverProps } from '../TeachingPopover/TeachingPopover.types';
import { TeachingPopoverSurface } from '../TeachingPopoverSurface/TeachingPopoverSurface';
import { TeachingPopoverTrigger } from '../TeachingPopoverTrigger/TeachingPopoverTrigger';
import type { TeachingPopoverHeaderProps } from './TeachingPopoverHeader.types';
import { TeachingPopoverHeader } from './TeachingPopoverHeader';
import { teachingPopoverHeaderClassNames } from './useTeachingPopoverHeaderStyles';

import styles from './TeachingPopoverHeader.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/teaching-popover', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/teaching-popover');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTeachingPopoverHeader: (...args: Parameters<typeof actual.useTeachingPopoverHeader>) =>
      deepFreezeState(actual.useTeachingPopoverHeader(...args)),
  };
});

const renderHeader = (
  headerProps: TeachingPopoverHeaderProps = {},
  popoverProps: Partial<TeachingPopoverProps> = {},
) => {
  const result = render(
    <TeachingPopover defaultOpen {...popoverProps}>
      <TeachingPopoverTrigger>
        <button>Trigger</button>
      </TeachingPopoverTrigger>
      <TeachingPopoverSurface>
        <TeachingPopoverHeader {...headerProps}>Header text</TeachingPopoverHeader>
      </TeachingPopoverSurface>
    </TeachingPopover>,
  );

  const root = result.container.querySelector<HTMLElement>('.fui-teaching-popover-header')!;

  return {
    ...result,
    root,
    icon: root?.querySelector<HTMLElement>(`.${CSS.escape(styles.icon)}`)!,
    dismiss: root?.querySelector<HTMLElement>('[aria-label="dismiss"]')!,
  };
};

describe('TeachingPopoverHeader', () => {
  isConformant({
    Component: TeachingPopoverHeader,
    displayName: 'TeachingPopoverHeader',
  });

  it('stamps the marker pair in order', () => {
    const { root } = renderHeader();
    const names = root.getAttribute('class')!.split(/\s+/);

    expect(names[0]).toBe('fui-teaching-popover-header');
    expect(names[1]).toBe('group/fui-teaching-popover-header');
    expect(teachingPopoverHeaderClassNames.root).toBe('fui-teaching-popover-header group/fui-teaching-popover-header');
  });

  it('carries the root module class', () => {
    const { root } = renderHeader();

    expect(root).toHaveClass(styles.root);
    expect(root.className).not.toContain('undefined');
  });

  it('classes the icon and the dismiss button', () => {
    const { icon, dismiss } = renderHeader();

    expect(icon).toHaveClass(styles.icon);
    expect(dismiss).toHaveClass(styles.dismissButton);
  });

  it('repaints every part under brand, and none of them otherwise', () => {
    const brand = renderHeader({}, { appearance: 'brand' });

    expect(brand.root).toHaveClass(styles.brand);
    expect(brand.icon).toHaveClass(styles.iconBrand);
    expect(brand.dismiss).toHaveClass(styles.dismissBrand);

    const neutral = renderHeader();

    expect(neutral.root).not.toHaveClass(styles.brand);
    expect(neutral.icon).not.toHaveClass(styles.iconBrand);
    expect(neutral.dismiss).not.toHaveClass(styles.dismissBrand);

    const inverted = renderHeader({}, { appearance: 'inverted' });

    expect(inverted.root).not.toHaveClass(styles.brand);
  });

  it('restores the default glyphs the headless hook leaves empty', () => {
    const { icon, dismiss } = renderHeader();

    expect(icon.querySelector('svg')).not.toBeNull();
    expect(dismiss.querySelector('svg')).not.toBeNull();
  });

  it('lets consumer children win, and a null slot removes it', () => {
    const own = renderHeader({ icon: { children: <span data-own="" /> }, dismissButton: { children: 'x' } });

    expect(own.icon.querySelector('[data-own]')).not.toBeNull();
    expect(own.icon.querySelector('svg')).toBeNull();
    expect(own.dismiss).toHaveTextContent('x');
    expect(own.dismiss.querySelector('svg')).toBeNull();

    const removed = renderHeader({ icon: null, dismissButton: null });

    expect(removed.root.querySelector(`.${CSS.escape(styles.icon)}`)).toBeNull();
    expect(removed.root.querySelector('[aria-label="dismiss"]')).toBeNull();
  });

  it('keeps the headless dismiss behaviour through the styles hook', async () => {
    const { dismiss, container } = renderHeader();

    await userEvent.click(dismiss);

    expect(container.querySelector('[data-popover-surface]')).toBeNull();
  });

  it('keeps a consumer className exactly once', () => {
    const { root } = renderHeader({ className: 'consumer' });

    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(one => one === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
  });
});

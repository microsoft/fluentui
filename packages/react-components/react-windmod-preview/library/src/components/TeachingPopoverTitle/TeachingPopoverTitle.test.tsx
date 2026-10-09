import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from '../TeachingPopover/TeachingPopover';
import type { TeachingPopoverProps } from '../TeachingPopover/TeachingPopover.types';
import { TeachingPopoverSurface } from '../TeachingPopoverSurface/TeachingPopoverSurface';
import { TeachingPopoverTrigger } from '../TeachingPopoverTrigger/TeachingPopoverTrigger';
import type { TeachingPopoverTitleProps } from './TeachingPopoverTitle.types';
import { TeachingPopoverTitle } from './TeachingPopoverTitle';
import { teachingPopoverTitleClassNames } from './useTeachingPopoverTitleStyles';

import styles from './TeachingPopoverTitle.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/teaching-popover', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/teaching-popover');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTeachingPopoverTitle: (...args: Parameters<typeof actual.useTeachingPopoverTitle>) =>
      deepFreezeState(actual.useTeachingPopoverTitle(...args)),
  };
});

const renderTitle = (titleProps: TeachingPopoverTitleProps = {}, popoverProps: Partial<TeachingPopoverProps> = {}) => {
  const result = render(
    <TeachingPopover defaultOpen {...popoverProps}>
      <TeachingPopoverTrigger>
        <button>Trigger</button>
      </TeachingPopoverTrigger>
      <TeachingPopoverSurface>
        <TeachingPopoverTitle {...titleProps}>Title text</TeachingPopoverTitle>
      </TeachingPopoverSurface>
    </TeachingPopover>,
  );

  const root = result.container.querySelector<HTMLElement>('.fui-teaching-popover-title')!;

  return { ...result, root, dismiss: root?.querySelector<HTMLElement>('button')! };
};

describe('TeachingPopoverTitle', () => {
  isConformant({
    Component: TeachingPopoverTitle,
    displayName: 'TeachingPopoverTitle',
  });

  it('stamps the marker pair in order', () => {
    const { root } = renderTitle();
    const names = root.getAttribute('class')!.split(/\s+/);

    expect(names[0]).toBe('fui-teaching-popover-title');
    expect(names[1]).toBe('group/fui-teaching-popover-title');
    expect(teachingPopoverTitleClassNames.root).toBe('fui-teaching-popover-title group/fui-teaching-popover-title');
  });

  it('renders an h2 carrying the root module class', () => {
    const { root } = renderTitle();

    expect(root.tagName).toBe('H2');
    expect(root).toHaveClass(styles.root);
    expect(root.className).not.toContain('undefined');
  });

  it('renders the dismiss button only when the consumer asks for it, and classes it', () => {
    expect(renderTitle().dismiss).toBeNull();

    const { dismiss } = renderTitle({ dismissButton: {} });

    expect(dismiss).toHaveClass(styles.dismissButton);
    expect(dismiss.querySelector('svg')).not.toBeNull();
  });

  it('repaints the root and the dismiss button under brand, and neither otherwise', () => {
    const brand = renderTitle({ dismissButton: {} }, { appearance: 'brand' });

    expect(brand.root).toHaveClass(styles.brand);
    expect(brand.dismiss).toHaveClass(styles.dismissBrand);

    const neutral = renderTitle({ dismissButton: {} });

    expect(neutral.root).not.toHaveClass(styles.brand);
    expect(neutral.dismiss).not.toHaveClass(styles.dismissBrand);
  });

  it('lets consumer children win over the default glyph', () => {
    const { dismiss } = renderTitle({ dismissButton: { children: 'x' } });

    expect(dismiss).toHaveTextContent('x');
    expect(dismiss.querySelector('svg')).toBeNull();
  });

  it('keeps the headless dismiss behaviour through the styles hook', async () => {
    const { dismiss, container } = renderTitle({ dismissButton: {} });

    await userEvent.click(dismiss);

    expect(container.querySelector('[data-popover-surface]')).toBeNull();
  });

  it('keeps a consumer className exactly once', () => {
    const { root } = renderTitle({ className: 'consumer' });

    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(one => one === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
  });
});

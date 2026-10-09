import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from '../TeachingPopover/TeachingPopover';
import type { TeachingPopoverProps } from '../TeachingPopover/TeachingPopover.types';
import { TeachingPopoverSurface } from '../TeachingPopoverSurface/TeachingPopoverSurface';
import { TeachingPopoverTrigger } from '../TeachingPopoverTrigger/TeachingPopoverTrigger';
import type { TeachingPopoverFooterProps } from './TeachingPopoverFooter.types';
import { TeachingPopoverFooter } from './TeachingPopoverFooter';
import { teachingPopoverFooterClassNames } from './useTeachingPopoverFooterStyles';

import buttonStyles from '../Button/Button.module.css';
import styles from './TeachingPopoverFooter.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/teaching-popover', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/teaching-popover');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTeachingPopoverFooter: (...args: Parameters<typeof actual.useTeachingPopoverFooter>) =>
      deepFreezeState(actual.useTeachingPopoverFooter(...args)),
  };
});

const defaultFooter: TeachingPopoverFooterProps = {
  primary: { children: 'Next' },
  secondary: { children: 'Back' },
};

const renderFooter = (
  footerProps: TeachingPopoverFooterProps = defaultFooter,
  popoverProps: Partial<TeachingPopoverProps> = {},
) => {
  const result = render(
    <TeachingPopover defaultOpen {...popoverProps}>
      <TeachingPopoverTrigger>
        <button>Trigger</button>
      </TeachingPopoverTrigger>
      <TeachingPopoverSurface>
        <TeachingPopoverFooter {...footerProps} />
      </TeachingPopoverSurface>
    </TeachingPopover>,
  );

  const root = result.container.querySelector<HTMLElement>('.fui-teaching-popover-footer')!;
  const buttons = Array.from(root?.querySelectorAll<HTMLElement>('.fui-button') ?? []);

  return { ...result, root, primary: buttons[0], secondary: buttons[1], buttons };
};

describe('TeachingPopoverFooter', () => {
  isConformant({
    Component: TeachingPopoverFooter,
    displayName: 'TeachingPopoverFooter',
    requiredProps: defaultFooter as never,
  });

  it('stamps the marker pair in order', () => {
    const { root } = renderFooter();
    const names = root.getAttribute('class')!.split(/\s+/);

    expect(names[0]).toBe('fui-teaching-popover-footer');
    expect(names[1]).toBe('group/fui-teaching-popover-footer');
    expect(teachingPopoverFooterClassNames.root).toBe('fui-teaching-popover-footer group/fui-teaching-popover-footer');
  });

  it('carries the root module class', () => {
    const { root } = renderFooter();

    expect(root).toHaveClass(styles.root);
    expect(root.className).not.toContain('undefined');
  });

  it('renders both slots as windmod Buttons', () => {
    const { buttons, primary, secondary } = renderFooter();

    // The Button marker pair, not the tag name: the elementType swap is what is under test.
    expect(buttons).toHaveLength(2);
    expect(primary).toHaveClass('group/fui-button');
    expect(secondary).toHaveClass('group/fui-button');
    expect(primary).toHaveTextContent('Next');
    expect(secondary).toHaveTextContent('Back');
  });

  it('renders only the primary when no secondary is supplied', () => {
    const { buttons } = renderFooter({ primary: { children: 'Only' } });

    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveTextContent('Only');
  });

  it('selects the root layout class per footerLayout, horizontal by default', () => {
    expect(renderFooter(defaultFooter).root).toHaveClass(styles.horizontal);
    expect(renderFooter({ ...defaultFooter, footerLayout: 'horizontal' }).root).toHaveClass(styles.horizontal);
    expect(renderFooter({ ...defaultFooter, footerLayout: 'horizontal' }).root).not.toHaveClass(styles.vertical);

    const vertical = renderFooter({ ...defaultFooter, footerLayout: 'vertical' });

    expect(vertical.root).toHaveClass(styles.vertical);
    expect(vertical.root).not.toHaveClass(styles.horizontal);
  });

  it('selects the button layout class per footerLayout, on BOTH buttons', () => {
    const horizontal = renderFooter(defaultFooter);

    expect(horizontal.primary).toHaveClass(styles.buttonHorizontal);
    expect(horizontal.secondary).toHaveClass(styles.buttonHorizontal);
    expect(horizontal.primary).not.toHaveClass(styles.buttonVertical);

    const vertical = renderFooter({ ...defaultFooter, footerLayout: 'vertical' });

    expect(vertical.primary).toHaveClass(styles.buttonVertical);
    expect(vertical.secondary).toHaveClass(styles.buttonVertical);
    expect(vertical.primary).not.toHaveClass(styles.buttonHorizontal);
  });

  it('overrides the Button size class it lands on, whichever layout', () => {
    // The layout buckets re-assert the Button's own resting minimum width and radius, so at the
    // default size they are invisible. A small Button is where the override is observable: its
    // own base narrows to 64px and the footer class puts it back to 96.
    const { primary } = renderFooter({
      primary: { children: 'Next', size: 'small' },
    });

    expect(primary).toHaveClass(buttonStyles.root);
    expect(primary).toHaveClass(styles.buttonHorizontal);
  });

  it('inverts the emphasis roles under brand', () => {
    // The un-emphasised slot passes no appearance at all, so the Button falls back to its own
    // 'secondary' default — which is exactly what Griffel's `undefined` defaultProp produces.
    const neutral = renderFooter();

    expect(neutral.primary.getAttribute('data-appearance')).toBe('primary');
    expect(neutral.secondary.getAttribute('data-appearance')).toBe('secondary');

    const brand = renderFooter(defaultFooter, { appearance: 'brand' });

    expect(brand.primary.getAttribute('data-appearance')).toBe('secondary');
    expect(brand.secondary.getAttribute('data-appearance')).toBe('primary');
  });

  it('lets a consumer appearance win over the role default', () => {
    const { primary } = renderFooter({ ...defaultFooter, primary: { children: 'Next', appearance: 'outline' } });

    expect(primary.getAttribute('data-appearance')).toBe('outline');
  });

  it('applies the brand overrides per slot, and neither one otherwise', () => {
    const brand = renderFooter(defaultFooter, { appearance: 'brand' });

    expect(brand.primary).toHaveClass(styles.brandPrimary);
    expect(brand.secondary).toHaveClass(styles.brandSecondary);
    expect(brand.primary).not.toHaveClass(styles.brandSecondary);
    expect(brand.secondary).not.toHaveClass(styles.brandPrimary);

    const neutral = renderFooter();

    expect(neutral.primary).not.toHaveClass(styles.brandPrimary);
    expect(neutral.secondary).not.toHaveClass(styles.brandSecondary);
  });

  it('wires the auto-close handler to the SECONDARY when there is one, and to nothing else', async () => {
    const { secondary, container } = renderFooter();

    await userEvent.click(secondary);

    expect(container.querySelector('[data-popover-surface]')).toBeNull();
  });

  it('leaves the primary alone when a secondary exists', async () => {
    const { primary, container } = renderFooter();

    await userEvent.click(primary);

    // Griffel wires exactly one — clicking the other must NOT close.
    expect(container.querySelector('[data-popover-surface]')).not.toBeNull();
  });

  it('falls back to the primary when there is no secondary', async () => {
    const { buttons, container } = renderFooter({ primary: { children: 'Only' } });

    await userEvent.click(buttons[0]);

    expect(container.querySelector('[data-popover-surface]')).toBeNull();
  });

  it('keeps a consumer onClick beside the auto-close handler', async () => {
    const onClick = jest.fn();
    const { secondary, container } = renderFooter({ ...defaultFooter, secondary: { children: 'Back', onClick } });

    await userEvent.click(secondary);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(container.querySelector('[data-popover-surface]')).toBeNull();
  });

  it('lets consumer children win over the slots', () => {
    const result = render(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>
          <TeachingPopoverFooter {...defaultFooter}>
            <button data-own="">Own</button>
          </TeachingPopoverFooter>
        </TeachingPopoverSurface>
      </TeachingPopover>,
    );

    const root = result.container.querySelector<HTMLElement>('.fui-teaching-popover-footer')!;

    expect(root.querySelector('[data-own]')).not.toBeNull();
    expect(root.querySelectorAll('.fui-button')).toHaveLength(0);
    expect(root).toHaveClass(styles.root);
  });

  it('keeps a consumer className exactly once', () => {
    const { root } = renderFooter({ ...defaultFooter, className: 'consumer' });

    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(one => one === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
  });
});

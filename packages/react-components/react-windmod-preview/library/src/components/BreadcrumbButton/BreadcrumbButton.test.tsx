import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { BreadcrumbButton } from './BreadcrumbButton';
import type { BreadcrumbButtonState } from './BreadcrumbButton.types';
import { breadcrumbButtonClassNames, useBreadcrumbButtonStyles } from './useBreadcrumbButtonStyles';

import buttonStyles from '../Button/Button.module.css';
import styles from './BreadcrumbButton.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/breadcrumb', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/breadcrumb');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useBreadcrumbButton: (...args: Parameters<typeof actual.useBreadcrumbButton>) =>
      deepFreezeState(actual.useBreadcrumbButton(...args)),
  };
});

const sizes = ['small', 'medium', 'large'] as const;

// The jest css-module proxy drops the component and hash segments, so Button's `root` and
// BreadcrumbButton's `root` are the same string — only the occurrence count distinguishes them.
const occurrences = (className: string, target: string): number =>
  className.split(' ').filter(name => name === target).length;

const iconOf = (root: HTMLElement): HTMLElement => {
  const icon = root.querySelector<HTMLElement>('span');

  if (!icon) {
    throw new Error('BreadcrumbButton rendered no icon slot');
  }

  return icon;
};

// The styles hooks widen the root with their data attributes internally but return the
// component's declared state type, so a stamp is read back through this cast.
const stampsOf = (root: object): Record<string, string | undefined> => root as Record<string, string | undefined>;

const Glyph = (): React.ReactElement => <i data-testid="glyph" />;

describe('BreadcrumbButton', () => {
  isConformant({
    Component: BreadcrumbButton,
    displayName: 'BreadcrumbButton',
  });

  it('stamps its own marker pair and the composed Button pair', () => {
    const { getByTestId } = render(<BreadcrumbButton data-testid="root">Go</BreadcrumbButton>);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-breadcrumb-button');
    expect(root).toHaveClass('group/fui-breadcrumb-button');
    expect(root).toHaveClass('fui-button');
    expect(root).toHaveClass('group/fui-button');
    expect(root.classList[0]).toBe('fui-breadcrumb-button');
    expect(breadcrumbButtonClassNames.root).toBe('fui-breadcrumb-button group/fui-breadcrumb-button');
  });

  it('carries the root class of both stylesheets', () => {
    const { getByTestId } = render(<BreadcrumbButton data-testid="root">Go</BreadcrumbButton>);

    expect(occurrences(getByTestId('root').className, styles.root)).toBe(2);
  });

  it('carries the icon class of both stylesheets', () => {
    const { getByTestId } = render(
      <BreadcrumbButton data-testid="root" icon={<Glyph />}>
        Go
      </BreadcrumbButton>,
    );

    expect(occurrences(iconOf(getByTestId('root')).className, styles.icon)).toBe(2);
  });

  it('pins appearance and shape', () => {
    const { getByTestId } = render(<BreadcrumbButton data-testid="root">Go</BreadcrumbButton>);

    const root = getByTestId('root');

    expect(root.getAttribute('data-appearance')).toBe('subtle');
    // `rounded` is Button's base look and owns no class, so the pin reads as the absence of the
    // other two shapes.
    expect(root).not.toHaveClass(buttonStyles.circular);
    expect(root).not.toHaveClass(buttonStyles.square);
  });

  it('takes its size from the breadcrumb context, defaulting to medium', () => {
    const { getByTestId } = render(
      <>
        <BreadcrumbButton data-testid="loose">Go</BreadcrumbButton>
        {sizes.map(size => (
          <Breadcrumb key={size} size={size}>
            <BreadcrumbButton data-testid={size}>Go</BreadcrumbButton>
          </Breadcrumb>
        ))}
      </>,
    );

    expect(getByTestId('loose').getAttribute('data-size')).toBe('medium');

    for (const size of sizes) {
      expect(getByTestId(size).getAttribute('data-size')).toBe(size);
    }
  });

  it('stamps the four Button attributes the headless breadcrumb hook omits', () => {
    const { getByTestId } = render(
      <>
        <BreadcrumbButton data-testid="plain">Go</BreadcrumbButton>
        <BreadcrumbButton data-testid="disabled" disabled>
          Go
        </BreadcrumbButton>
        <BreadcrumbButton data-testid="disabled-focusable" disabledFocusable>
          Go
        </BreadcrumbButton>
        <BreadcrumbButton data-testid="icon-only" icon={<Glyph />} aria-label="Go" />
      </>,
    );

    const plain = getByTestId('plain');

    expect(plain.hasAttribute('data-disabled')).toBe(false);
    expect(plain.hasAttribute('data-disabled-focusable')).toBe(false);
    expect(plain.hasAttribute('data-icon-only')).toBe(false);
    expect(plain.hasAttribute('data-icon-position')).toBe(false);

    expect(getByTestId('disabled').getAttribute('data-disabled')).toBe('true');
    expect(getByTestId('disabled-focusable').getAttribute('data-disabled-focusable')).toBe('true');

    const iconOnly = getByTestId('icon-only');

    expect(iconOnly.getAttribute('data-icon-only')).toBe('true');
    expect(iconOnly.getAttribute('data-icon-position')).toBe('before');
    expect(iconOnly.hasAttribute('data-empty')).toBe(true);
  });

  // `iconPosition` is honoured by the base hook but absent from both libraries' props types, so
  // the trailing-glyph stamp is only reachable at the hook seam.
  it('stamps the icon position it is given, and nothing without an icon', () => {
    const withIcon = {
      appearance: 'subtle',
      components: { root: 'button', icon: 'span' },
      icon: {},
      iconPosition: 'after',
      root: { as: 'button' },
      shape: 'rounded',
      size: 'medium',
    } as unknown as BreadcrumbButtonState;

    const withoutIcon = { ...withIcon, icon: undefined } as unknown as BreadcrumbButtonState;

    expect(stampsOf(useBreadcrumbButtonStyles(withIcon).root)['data-icon-position']).toBe('after');
    expect(stampsOf(useBreadcrumbButtonStyles(withoutIcon).root)['data-icon-position']).toBeUndefined();
  });

  it('leaves the headless current contract intact through the composition', () => {
    const { getByTestId } = render(
      <>
        <BreadcrumbButton data-testid="plain">Go</BreadcrumbButton>
        <BreadcrumbButton data-testid="current" current>
          Go
        </BreadcrumbButton>
      </>,
    );

    const current = getByTestId('current');

    expect(current.getAttribute('data-current')).toBe('');
    expect(current.getAttribute('aria-current')).toBe('page');
    expect(current.getAttribute('aria-disabled')).toBe('true');
    // A current entry is inert but still reachable: aria-disabled, never the disabled attribute.
    expect(current.hasAttribute('disabled')).toBe(false);
    expect(getByTestId('plain').hasAttribute('data-current')).toBe(false);
  });

  it('renders an anchor when the consumer supplies href', () => {
    const { getByTestId } = render(
      <>
        <BreadcrumbButton data-testid="link" href="#a">
          Go
        </BreadcrumbButton>
        <BreadcrumbButton data-testid="inert" href="#a" current disabled>
          Go
        </BreadcrumbButton>
      </>,
    );

    const link = getByTestId('link');

    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('#a');

    // The ARIA button behaviour strips href from a disabled anchor, so the current-plus-disabled
    // anchor is the one cell where the disabled look has to come from data-disabled alone.
    const inert = getByTestId('inert');

    expect(inert.tagName).toBe('A');
    expect(inert.hasAttribute('href')).toBe(false);
    expect(inert.getAttribute('data-current')).toBe('');
    expect(inert.getAttribute('data-disabled')).toBe('true');
    expect(inert.getAttribute('aria-disabled')).toBe('true');
  });

  it('passes consumer props through to the root', () => {
    const { getByTestId } = render(
      <BreadcrumbButton data-testid="root" id="bc-btn" className="consumer" style={{ margin: 2 }}>
        Go
      </BreadcrumbButton>,
    );

    const root = getByTestId('root');

    expect(root.id).toBe('bc-btn');
    expect(root).toHaveClass('consumer');
    expect(occurrences(root.className, 'consumer')).toBe(1);
    expect(root.style.margin).toBe('2px');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'subtle',
      components: { root: 'button', icon: 'span' },
      disabled: true,
      icon: { className: 'consumer-icon' },
      iconPosition: 'before',
      root: { as: 'button', className: 'consumer' },
      shape: 'rounded',
      size: 'large',
    } as unknown as BreadcrumbButtonState;

    const styled = useBreadcrumbButtonStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-disabled');
    expect(state.icon!.className).toBe('consumer-icon');
    expect(stampsOf(styled.root)['data-disabled']).toBe(true);
    expect(stampsOf(styled.root)['data-icon-position']).toBe('before');
    expect(stampsOf(styled.root)['data-size']).toBe('large');
    expect(styled.root.className).toContain('consumer');
    expect(occurrences(styled.icon!.className!, styles.icon)).toBe(2);
  });

  it('renders no icon slot when the consumer supplies none', () => {
    const state = {
      appearance: 'subtle',
      components: { root: 'button', icon: 'span' },
      root: { as: 'button' },
      shape: 'rounded',
      size: 'medium',
    } as unknown as BreadcrumbButtonState;

    expect(useBreadcrumbButtonStyles(state).icon).toBeUndefined();
  });
});

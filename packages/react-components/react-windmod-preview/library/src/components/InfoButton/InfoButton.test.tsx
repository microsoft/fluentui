import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { InfoButton } from './InfoButton';
import type { InfoButtonSize, InfoButtonState } from './InfoButton.types';
import { infoButtonClassNames, useInfoButtonStyles } from './useInfoButtonStyles';

import styles from './InfoButton.module.css';

// Every props object the headless hook was called with, in call order.
const hookCalls: Record<string, unknown>[] = [];

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/info-label', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/info-label');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useInfoButton: (props: Record<string, unknown>, ref: unknown) => {
      hookCalls.push(props);

      return deepFreezeState(actual.useInfoButton(props, ref));
    },
  };
});

const sizes: InfoButtonSize[] = ['small', 'medium', 'large'];

// Read structurally, never by class query: generateTestIdent drops the component token under
// jest, so two components' locals stringify identically and a bare class comparison proves
// nothing.
const parts = (baseElement: HTMLElement) => {
  const button = baseElement.querySelector('button')!;

  return {
    button,
    glyphs: Array.from(button.querySelectorAll('svg')),
    surface: baseElement.querySelector('[data-popover-surface]'),
  };
};

describe('InfoButton', () => {
  beforeEach(() => {
    hookCalls.length = 0;
  });

  isConformant({
    Component: InfoButton,
    displayName: 'InfoButton',
    requiredProps: { info: 'Example info' },
  });

  it('carries the marker pair in order', () => {
    const { button } = parts(render(<InfoButton info="i" />).baseElement);

    expect(button).toHaveClass('fui-info-button');
    expect(button).toHaveClass('group/fui-info-button');
    expect(button.classList[0]).toBe('fui-info-button');
    expect(button.className).toContain(infoButtonClassNames.root);
  });

  it('applies the root class', () => {
    const { button } = parts(render(<InfoButton info="i" />).baseElement);

    expect(button).toHaveClass(styles.root);
  });

  it('stamps data-size, defaulting to medium', () => {
    const fallback = render(<InfoButton info="i" />);

    expect(parts(fallback.baseElement).button).toHaveAttribute('data-size', 'medium');
    fallback.unmount();

    for (const size of sizes) {
      const scoped = render(<InfoButton info="i" size={size} />);

      expect(parts(scoped.baseElement).button).toHaveAttribute('data-size', size);
      scoped.unmount();
    }
  });

  it('restores the size-keyed default glyph pair', () => {
    const widths: Record<InfoButtonSize, string> = { small: '12', medium: '16', large: '20' };

    for (const size of sizes) {
      const scoped = render(<InfoButton info="i" size={size} />);
      const { glyphs } = parts(scoped.baseElement);

      expect(glyphs).toHaveLength(2);
      expect(glyphs.map(glyph => glyph.getAttribute('data-variant'))).toEqual(['filled', 'regular']);
      // Presence alone would pass against a constant glyph; the rendered box is the identity.
      expect(glyphs.map(glyph => glyph.getAttribute('width'))).toEqual([widths[size], widths[size]]);
      scoped.unmount();
    }
  });

  it("lets a consumer's children win", () => {
    const { baseElement } = render(
      <InfoButton info="i">
        <span data-consumer="">C</span>
      </InfoButton>,
    );
    const { button, glyphs } = parts(baseElement);

    expect(glyphs).toHaveLength(0);
    expect(button.querySelector('[data-consumer]')).toBeTruthy();
  });

  // Ratified D1 divergence: the fallback fires on null as well as undefined, so `null` restores
  // the glyph here while Griffel renders nothing. Migration note MN-7.
  it('renders the default glyph for null children', () => {
    const { baseElement } = render(<InfoButton info="i">{null}</InfoButton>);

    expect(parts(baseElement).glyphs).toHaveLength(2);
  });

  it('maps its own size onto the popover size', () => {
    const popoverSizes: Record<InfoButtonSize, string> = { small: 'small', medium: 'small', large: 'medium' };

    for (const size of sizes) {
      const scoped = render(<InfoButton info="i" size={size} popover={{ open: true }} />);

      expect(parts(scoped.baseElement).surface).toHaveAttribute('data-size', popoverSizes[size]);
      scoped.unmount();
    }
  });

  it('selects the surface typography from its own size', () => {
    const scopedSmall = render(<InfoButton info="i" size="medium" popover={{ open: true }} />);

    expect(parts(scopedSmall.baseElement).surface).toHaveClass(styles.infoSmallMedium);
    expect(parts(scopedSmall.baseElement).surface).not.toHaveClass(styles.infoLarge);
    scopedSmall.unmount();

    const scopedLarge = render(<InfoButton info="i" size="large" popover={{ open: true }} />);

    expect(parts(scopedLarge.baseElement).surface).toHaveClass(styles.infoLarge);
    expect(parts(scopedLarge.baseElement).surface).not.toHaveClass(styles.infoSmallMedium);
    expect(parts(scopedLarge.baseElement).surface).toHaveClass(styles.info);
    scopedLarge.unmount();
  });

  it('leaves the headless data-open stamp alone, and does not duplicate it', () => {
    const closed = render(<InfoButton info="i" />);

    expect(parts(closed.baseElement).button.hasAttribute('data-open')).toBe(false);
    closed.unmount();

    const open = render(<InfoButton info="i" popover={{ open: true }} />);
    const { button } = parts(open.baseElement);

    expect(button).toHaveAttribute('data-open', '');
    expect(button.outerHTML.match(/data-open/g)).toHaveLength(1);
  });

  it('renders the windmod PopoverSurface, arrow included', () => {
    const { baseElement } = render(<InfoButton info="i" popover={{ open: true }} />);
    const { surface } = parts(baseElement);

    expect(surface).toHaveClass('fui-popover-surface');
    // The arrow carries no className of its own; every arrow rule is nested inside the surface's
    // own class, so a surface without it has no arrow CSS at all.
    expect(surface!.firstElementChild).toHaveAttribute('data-arrow');
    expect(surface!.firstElementChild!.getAttribute('class')).toBeNull();
  });

  it('does not warn about a slot/components mismatch', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    render(<InfoButton info="i" popover={{ open: true }} />);

    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('passes everything else through to the headless hook', () => {
    render(<InfoButton info="i" size="large" id="own" aria-label="custom" />);

    expect(hookCalls).toHaveLength(1);
    expect(hookCalls[0]).toEqual({ info: 'i', id: 'own', 'aria-label': 'custom' });
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'button', popover: 'div', info: 'div' },
      root: { as: 'button', className: 'consumer' },
      popover: {},
      info: { className: 'consumer-info' },
      size: 'large',
    } as unknown as InfoButtonState;

    const styled = useInfoButtonStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root).not.toHaveProperty('data-size');
    expect(state.root.className).toBe('consumer');
    expect(state.info.className).toBe('consumer-info');
    expect(styled.root.className).toContain('consumer');
    expect(styled.info.className).toContain('consumer-info');
  });
});

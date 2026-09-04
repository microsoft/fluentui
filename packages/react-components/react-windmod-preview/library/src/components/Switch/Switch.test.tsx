import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { classOccurrences } from '../../testing/classOccurrences';
import { isConformant } from '../../testing/isConformant';
import { Switch } from './Switch';
import type { SwitchState } from './Switch.types';
import { switchClassNames, useSwitchStyles } from './useSwitchStyles';

import styles from './Switch.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/switch', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/switch');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useSwitch: (...args: Parameters<typeof actual.useSwitch>) => deepFreezeState(actual.useSwitch(...args)),
  };
});

const sizes = ['medium', 'small'] as const;
const positions = ['after', 'before', 'above'] as const;

// `input` is the primary slot, so every native prop — data-testid included — lands on the <input>;
// the root is only reachable through the container. The indicator is the root's only <div>, read
// structurally so a dropped module class cannot hide it.
const parts = (root: HTMLElement) => ({
  root,
  input: root.querySelector<HTMLInputElement>('input')!,
  indicator: root.querySelector<HTMLElement>('div'),
  label: root.querySelector<HTMLLabelElement>('label'),
});

const renderSwitch = (props: React.ComponentProps<typeof Switch> = {}) => {
  const { container } = render(<Switch {...props} />);

  return parts(container.firstElementChild as HTMLElement);
};

const glyph = (indicator: HTMLElement | null) => {
  const svg = indicator?.querySelector('svg');

  return (
    svg && {
      width: svg.getAttribute('width'),
      viewBox: svg.getAttribute('viewBox'),
      d: svg.querySelector('path')!.getAttribute('d'),
    }
  );
};

describe('Switch', () => {
  isConformant({
    Component: Switch,
    displayName: 'Switch',
    primarySlot: 'input',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderSwitch();

    expect(root).toHaveClass('fui-switch');
    expect(root).toHaveClass('group/fui-switch');
    expect(root.classList[0]).toBe('fui-switch');
    expect(switchClassNames.root).toBe('fui-switch group/fui-switch');
  });

  it('stamps the peer marker on the input and nowhere else', () => {
    const { root, input, indicator, label } = renderSwitch({ label: 'Hello' });

    expect(input).toHaveClass('peer/fui-switch');
    expect(classOccurrences(input, 'peer/fui-switch')).toBe(1);
    expect(root).not.toHaveClass('peer/fui-switch');
    expect(indicator).not.toHaveClass('peer/fui-switch');
    expect(label).not.toHaveClass('peer/fui-switch');
  });

  it('keeps the input classList[0] slash-free', () => {
    positions.forEach(labelPosition => {
      [undefined, 'Hello'].forEach(label => {
        const { input } = renderSwitch({ label, labelPosition });

        expect(input.classList[0]).toBe(styles.input);
        expect(input.classList[0]).not.toContain('/');
      });
    });
  });

  it('applies one module class per slot, and never a class belonging to another slot', () => {
    const { root, input, indicator, label } = renderSwitch({ label: 'Hello' });
    const owners = [
      [root, styles.root],
      [input, styles.input],
      [indicator, styles.indicator],
      [label, styles.label],
    ] as const;

    owners.forEach(([element, own]) => {
      expect(element).toHaveClass(own);

      owners.forEach(([, other]) => {
        if (other !== own) {
          expect(element).not.toHaveClass(other);
        }
      });
    });
  });

  it('adds the anchored class to the input only when a label exists', () => {
    positions.forEach(labelPosition => {
      expect(renderSwitch({ label: 'Hello', labelPosition }).input).toHaveClass(styles.anchored);
      expect(renderSwitch({ labelPosition }).input).not.toHaveClass(styles.anchored);
    });
  });

  it('adds the labelAbove class to the indicator only for a label positioned above', () => {
    expect(renderSwitch({ label: 'Hello', labelPosition: 'above' }).indicator).toHaveClass(styles.labelAbove);
    expect(renderSwitch({ labelPosition: 'above' }).indicator).not.toHaveClass(styles.labelAbove);
    expect(renderSwitch({ label: 'Hello', labelPosition: 'after' }).indicator).not.toHaveClass(styles.labelAbove);
    expect(renderSwitch({ label: 'Hello', labelPosition: 'before' }).indicator).not.toHaveClass(styles.labelAbove);
  });

  it('stamps data-size on the root alone', () => {
    expect(renderSwitch().root.getAttribute('data-size')).toBe('medium');

    sizes.forEach(size => {
      const { root, input, indicator, label } = renderSwitch({ size, label: 'Hello' });

      expect(root.getAttribute('data-size')).toBe(size);
      expect(input.hasAttribute('data-size')).toBe(false);
      expect(indicator!.hasAttribute('data-size')).toBe(false);
      expect(label!.hasAttribute('data-size')).toBe(false);
    });
  });

  it('restores the thumb glyph, unconditionally', () => {
    const expected = { width: '1em', viewBox: '0 0 20 20', d: expect.stringMatching(/^M10 2a8 8/) };

    expect(glyph(renderSwitch().indicator)).toEqual(expected);
    expect(glyph(renderSwitch({ defaultChecked: true }).indicator)).toEqual(expected);
    expect(glyph(renderSwitch({ disabled: true }).indicator)).toEqual(expected);

    sizes.forEach(size => {
      expect(glyph(renderSwitch({ size }).indicator)).toEqual(expected);
    });
  });

  it('lets a consumer glyph win over the restored one', () => {
    const { indicator } = renderSwitch({ indicator: { children: <i data-custom="" /> } });

    expect(indicator!.querySelector('[data-custom]')).not.toBeNull();
    expect(indicator!.querySelector('svg')).toBeNull();
  });

  it('keeps both the resolved slot props and the glyph for a childless indicator object', () => {
    const { indicator } = renderSwitch({ indicator: { className: 'x', id: 'track' } });

    expect(indicator).toHaveClass(styles.indicator);
    expect(indicator).toHaveClass('x');
    expect(indicator!.id).toBe('track');
    expect(indicator!.querySelector('svg')).not.toBeNull();
  });

  it('keeps the glyph for indicator children undefined and for children null', () => {
    expect(renderSwitch({ indicator: { children: undefined } }).indicator!.querySelector('svg')).not.toBeNull();
    expect(renderSwitch({ indicator: { children: null } }).indicator!.querySelector('svg')).not.toBeNull();
  });

  it('treats falsy-but-present indicator children as consumer content', () => {
    // The fallback is nullish-coalescing, matching Griffel's `children ??= glyph`: 0, '' and false
    // are content a consumer supplied, not an absent glyph.
    ([0, '', false] as const).forEach(children => {
      expect(renderSwitch({ indicator: { children } }).indicator!.querySelector('svg')).toBeNull();
    });

    expect(renderSwitch({ indicator: { children: 0 } }).indicator!.textContent).toBe('0');
  });

  it('still renders the indicator for indicator={null}, because the slot always renders', () => {
    // The cast is the point: unlike an optional slot, this one rejects `null` at the type level, so
    // only a consumer reaching past the types can get here — and even then the slot still renders.
    const { root, indicator } = renderSwitch({ indicator: null, label: 'Hello' } as unknown as React.ComponentProps<
      typeof Switch
    >);

    expect(indicator).not.toBeNull();
    expect(indicator).toHaveClass(styles.indicator);
    expect(root.children).toHaveLength(3);
  });

  it('keeps the headless aria-hidden default on the indicator', () => {
    expect(renderSwitch().indicator!.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders no label slot without a label prop', () => {
    const { root, label } = renderSwitch();

    expect(label).toBeNull();
    expect(root.children).toHaveLength(2);
  });

  it('keeps a consumer className on the label slot', () => {
    const { label } = renderSwitch({ label: { children: 'Hello', className: 'x' } });

    expect(label).toHaveClass(styles.label);
    expect(label).toHaveClass('x');
    expect(label!.textContent).toBe('Hello');
  });

  it('orders the input first and the label around the indicator', () => {
    const after = renderSwitch({ label: 'Hello' });

    expect(after.root.children[0]).toBe(after.input);
    expect(after.root.children[1]).toBe(after.indicator);
    expect(after.root.children[2]).toBe(after.label);

    (['before', 'above'] as const).forEach(labelPosition => {
      const leading = renderSwitch({ label: 'Hello', labelPosition });

      expect(leading.root.children[0]).toBe(leading.input);
      expect(leading.root.children[1]).toBe(leading.label);
      expect(leading.root.children[2]).toBe(leading.indicator);
    });
  });

  it('leaves the headless data attributes alone, including the controlled-only data-checked', () => {
    const plain = renderSwitch();

    expect(plain.root.hasAttribute('data-checked')).toBe(false);
    expect(plain.root.hasAttribute('data-disabled')).toBe(false);
    expect(plain.root.hasAttribute('data-disabled-focusable')).toBe(false);
    expect(plain.root.getAttribute('data-label-position')).toBe('after');

    expect(renderSwitch({ checked: true, onChange: jest.fn() }).root.getAttribute('data-checked')).toBe('');

    const disabled = renderSwitch({ disabled: true });

    expect(disabled.root.getAttribute('data-disabled')).toBe('');
    expect(disabled.root.hasAttribute('data-disabled-focusable')).toBe(false);
    expect(disabled.input.disabled).toBe(true);

    const disabledFocusable = renderSwitch({ disabledFocusable: true });

    expect(disabledFocusable.root.getAttribute('data-disabled')).toBe('');
    expect(disabledFocusable.root.getAttribute('data-disabled-focusable')).toBe('');
    expect(disabledFocusable.input.getAttribute('aria-disabled')).toBe('true');
    expect(disabledFocusable.input.disabled).toBe(false);

    positions.forEach(labelPosition => {
      expect(renderSwitch({ labelPosition }).root.getAttribute('data-label-position')).toBe(labelPosition);
    });
  });

  it('carries no data-checked in uncontrolled mode, before or after a toggle', () => {
    // Canary: the headless hook stamps data-checked from the `checked` prop, so an uncontrolled
    // Switch is genuinely checked with no attribute to show for it. The peer marker exists because
    // of this; if upstream fixes the stamp, this test goes red.
    const { root, input } = renderSwitch({ defaultChecked: true });

    expect(input.checked).toBe(true);
    expect(root.hasAttribute('data-checked')).toBe(false);

    fireEvent.click(input);

    expect(input.checked).toBe(false);
    expect(root.hasAttribute('data-checked')).toBe(false);
  });

  it('passes the controlled machinery through untouched', () => {
    const onChange = jest.fn();
    const { root, input } = renderSwitch({ checked: false, onChange });

    fireEvent.click(input);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ checked: true });
    expect(input.checked).toBe(false);
    expect(root.hasAttribute('data-checked')).toBe(false);
  });

  it('splits native props onto the input and root props onto the root', () => {
    const { root, input } = renderSwitch({
      className: 'consumer',
      'data-testid': 't',
      id: 'my-id',
      required: true,
    } as React.ComponentProps<typeof Switch>);

    expect(input.id).toBe('my-id');
    expect(input.required).toBe(true);
    expect(input.getAttribute('data-testid')).toBe('t');
    expect(root.hasAttribute('data-testid')).toBe(false);
    expect(root).toHaveClass('consumer');
    expect(input).not.toHaveClass('consumer');
  });

  it('keeps a consumer className on the root exactly once', () => {
    const { root } = renderSwitch({ className: 'consumer' });

    expect(classOccurrences(root, 'consumer')).toBe(1);
    expect(classOccurrences(root, styles.root)).toBe(1);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'div', input: 'input', indicator: 'div', label: 'label' },
      indicator: { className: 'consumer-indicator' },
      input: { className: 'native' },
      label: { className: 'consumer-label' },
      labelPosition: 'above',
      root: { className: 'consumer' },
      size: 'small',
    } as unknown as SwitchState;

    const styled = useSwitchStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.input).not.toBe(state.input);
    expect(styled.indicator).not.toBe(state.indicator);
    expect(styled.label).not.toBe(state.label);

    expect(state.root.className).toBe('consumer');
    expect(state.input.className).toBe('native');
    expect(state.indicator.className).toBe('consumer-indicator');
    expect(state.label!.className).toBe('consumer-label');
    expect('data-size' in state.root).toBe(false);

    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(switchClassNames.root);
    expect(styled.input.className).toContain('native');
    expect(styled.input.className).toContain('peer/fui-switch');
    expect(styled.input.className).toContain(styles.anchored);
    expect(styled.indicator.className).toContain('consumer-indicator');
    expect(styled.indicator.className).toContain(styles.labelAbove);
    expect(styled.label!.className).toContain('consumer-label');
  });

  it('renders the full pipeline against a frozen headless state without throwing', () => {
    expect(() => render(<Switch label="Hello" />)).not.toThrow();
    const onChange = jest.fn();

    expect(() => render(<Switch checked onChange={onChange} />)).not.toThrow();
    expect(() => render(<Switch checked indicator={{ className: 'consumer' }} onChange={onChange} />)).not.toThrow();
  });
});

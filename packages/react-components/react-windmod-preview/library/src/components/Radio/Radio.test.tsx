import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Radio } from './Radio';
import type { RadioState } from './Radio.types';
import { radioClassNames, useRadioStyles } from './useRadioStyles';

import styles from './Radio.module.css';

const positions = ['after', 'below'] as const;

// `input` is the primary slot, so every native prop — data-testid included — lands on the <input>;
// the root is only reachable through the container. The indicator is the root's only <div>, read
// structurally so a dropped module class cannot hide it.
const parts = (root: HTMLElement) => ({
  root,
  input: root.querySelector<HTMLInputElement>('input')!,
  indicator: root.querySelector<HTMLElement>('div')!,
  label: root.querySelector<HTMLLabelElement>('label'),
});

const renderRadio = (props: React.ComponentProps<typeof Radio> = {}) => {
  const { container } = render(<Radio {...props} />);

  return parts(container.firstElementChild as HTMLElement);
};

// classList is an ordered set, so a duplicated token is only visible in the raw attribute.
const occurrences = (element: Element, token: string) =>
  element
    .getAttribute('class')!
    .split(/\s+/)
    .filter(candidate => candidate === token).length;

describe('Radio', () => {
  isConformant({
    Component: Radio,
    displayName: 'Radio',
    primarySlot: 'input',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderRadio();

    expect(root).toHaveClass('fui-radio');
    expect(root).toHaveClass('group/fui-radio');
    expect(root.classList[0]).toBe('fui-radio');
    expect(radioClassNames.root).toBe('fui-radio group/fui-radio');
  });

  it('stamps the peer marker on the input and nowhere else', () => {
    const { root, input, indicator, label } = renderRadio({ label: 'A' });

    expect(input).toHaveClass('peer/fui-radio');
    expect(occurrences(input, 'peer/fui-radio')).toBe(1);
    expect(root).not.toHaveClass('peer/fui-radio');
    expect(indicator).not.toHaveClass('peer/fui-radio');
    expect(label).not.toHaveClass('peer/fui-radio');
  });

  it('keeps the input classList[0] slash-free', () => {
    positions.forEach(labelPosition => {
      [undefined, 'A'].forEach(label => {
        const { input } = renderRadio({ label, labelPosition });

        expect(input.classList[0]).toBe(styles.input);
        expect(input.classList[0]).not.toContain('/');
      });
    });
  });

  it('applies one module class per slot, and never a class belonging to another slot', () => {
    const { root, input, indicator, label } = renderRadio({ label: 'A' });
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

  it('takes the default-indicator branch when the indicator has no children', () => {
    const { indicator } = renderRadio({ label: 'A' });

    expect(indicator).toHaveClass(styles.defaultIndicator);
    expect(indicator).not.toHaveClass(styles.customIndicator);
  });

  it('takes the custom-indicator branch when the indicator has children', () => {
    const { indicator } = renderRadio({ indicator: { children: <i data-testid="glyph" /> } });

    expect(indicator).toHaveClass(styles.customIndicator);
    expect(indicator).not.toHaveClass(styles.defaultIndicator);
    expect(indicator.querySelector('[data-testid="glyph"]')).not.toBeNull();
  });

  it('treats a childless indicator object as the default branch', () => {
    // A className is not children — the gate reads indicator.children, not slot truthiness.
    const { indicator } = renderRadio({ indicator: { className: 'x' } });

    expect(indicator).toHaveClass('x');
    expect(indicator).toHaveClass(styles.defaultIndicator);
    expect(indicator).not.toHaveClass(styles.customIndicator);
  });

  it('still renders the indicator for indicator={null}, because the slot always renders', () => {
    // The cast is the point: unlike an optional slot, this one rejects `null` at the type level, so
    // only a consumer reaching past the types can get here — and even then the slot still renders.
    const { root, indicator } = renderRadio({ indicator: null, label: 'A' } as unknown as React.ComponentProps<
      typeof Radio
    >);

    expect(indicator).not.toBeNull();
    expect(indicator).toHaveClass(styles.indicator);
    expect(indicator).toHaveClass(styles.defaultIndicator);
    expect(root.children).toHaveLength(3);
  });

  it('renders no default dot glyph — the dot is the indicator ::after on both sides', () => {
    // Griffel's styled useRadio swaps only the label slot's elementType, so its indicator is an
    // empty <div> too. There is no default glyph to restore and no icon import.
    const { indicator } = renderRadio({ label: 'A' });

    expect(indicator.childNodes).toHaveLength(0);
    expect(indicator.querySelector('svg')).toBeNull();
  });

  it('keeps the headless aria-hidden default on the indicator', () => {
    expect(renderRadio().indicator.getAttribute('aria-hidden')).toBe('true');
  });

  it('keeps a consumer className on the label slot and the headless htmlFor wiring', () => {
    const { input, label } = renderRadio({ label: { children: 'A', className: 'x' } });

    expect(label).toHaveClass(styles.label);
    expect(label).toHaveClass('x');
    expect(label!.textContent).toBe('A');
    expect(label!.getAttribute('for')).toBe(input.id);
    expect(input.id).not.toBe('');
  });

  it('renders no label slot without a label prop', () => {
    const { root, label } = renderRadio();

    expect(label).toBeNull();
    expect(root.children).toHaveLength(2);
  });

  it('orders the input, indicator and label identically for both label positions', () => {
    // DOM order is fixed — labelPosition never reorders it (contrast Switch).
    positions.forEach(labelPosition => {
      const { root, input, indicator, label } = renderRadio({ label: 'A', labelPosition });

      expect(root.children[0]).toBe(input);
      expect(root.children[1]).toBe(indicator);
      expect(root.children[2]).toBe(label);
    });
  });

  it('leaves the headless data attributes alone', () => {
    const plain = renderRadio();

    expect(plain.root.hasAttribute('data-disabled')).toBe(false);
    expect(plain.root.getAttribute('data-label-position')).toBe('after');

    const disabled = renderRadio({ disabled: true, label: 'A' });

    expect(disabled.root.getAttribute('data-disabled')).toBe('');
    expect(disabled.input.disabled).toBe(true);

    positions.forEach(labelPosition => {
      // Stamped on every Radio, label or no label — never a label-presence test.
      expect(renderRadio({ labelPosition }).root.getAttribute('data-label-position')).toBe(labelPosition);
      expect(renderRadio({ label: 'A', labelPosition }).root.getAttribute('data-label-position')).toBe(labelPosition);
    });
  });

  it('carries no data-checked on the root in either mode', () => {
    // Canary: the headless Radio publishes no checked state at all, so the peer marker is the only
    // styling route. If upstream starts stamping it, this test goes red and the decision can be
    // revisited.
    const uncontrolled = renderRadio({ defaultChecked: true });

    expect(uncontrolled.input.checked).toBe(true);
    expect(uncontrolled.root.hasAttribute('data-checked')).toBe(false);

    const controlled = renderRadio({ checked: true, onChange: jest.fn() });

    expect(controlled.input.checked).toBe(true);
    expect(controlled.root.hasAttribute('data-checked')).toBe(false);
  });

  it('renders a standalone radio with no name and a working defaultChecked', () => {
    const { input } = renderRadio({ defaultChecked: true, label: 'A', value: 'a' });

    expect(input.getAttribute('name')).toBeNull();
    expect(input.checked).toBe(true);
    expect(input.value).toBe('a');
  });

  it('fires onChange with the radio value', () => {
    const onChange = jest.fn();
    const { input } = renderRadio({ onChange, value: 'a' });

    fireEvent.click(input);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'a' });
  });

  it('renders no required asterisk', () => {
    // Griffel's Label never renders one for Radio either — `required` reaches the input, not the
    // label. Measured on both sides; the only control in this family with no asterisk gap.
    const { input, label } = renderRadio({ label: 'A', required: true });

    expect(input.required).toBe(true);
    expect(label!.children).toHaveLength(0);
    expect(label!.textContent).toBe('A');
  });

  it('splits native props onto the input and root props onto the root', () => {
    const { root, input } = renderRadio({
      className: 'consumer',
      'data-testid': 't',
      id: 'my-id',
    } as React.ComponentProps<typeof Radio>);

    expect(input.id).toBe('my-id');
    expect(input.getAttribute('data-testid')).toBe('t');
    expect(root.hasAttribute('data-testid')).toBe(false);
    expect(root).toHaveClass('consumer');
    expect(input).not.toHaveClass('consumer');
  });

  it('keeps a consumer className on the root exactly once', () => {
    const { root } = renderRadio({ className: 'consumer' });

    expect(occurrences(root, 'consumer')).toBe(1);
    expect(occurrences(root, styles.root)).toBe(1);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'span', input: 'input', indicator: 'div', label: 'label' },
      indicator: { className: 'consumer-indicator' },
      input: { className: 'native' },
      label: { className: 'consumer-label' },
      labelPosition: 'after',
      root: { className: 'consumer' },
    } as unknown as RadioState;

    const styled = useRadioStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.input).not.toBe(state.input);
    expect(styled.indicator).not.toBe(state.indicator);
    expect(styled.label).not.toBe(state.label);

    expect(state.root.className).toBe('consumer');
    expect(state.input.className).toBe('native');
    expect(state.indicator.className).toBe('consumer-indicator');
    expect(state.label!.className).toBe('consumer-label');

    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(radioClassNames.root);
    expect(styled.input.className).toContain('native');
    expect(styled.input.className).toContain('peer/fui-radio');
    expect(styled.indicator.className).toContain('consumer-indicator');
    expect(styled.indicator.className).toContain(styles.defaultIndicator);
    expect(styled.label!.className).toContain('consumer-label');
  });
});

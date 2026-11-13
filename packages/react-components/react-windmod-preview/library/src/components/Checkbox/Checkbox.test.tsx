import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { classOccurrences } from '../../testing/classOccurrences';
import { isConformant } from '../../testing/isConformant';
import { Checkbox } from './Checkbox';
import type { CheckboxState } from './Checkbox.types';
import { checkboxClassNames, useCheckboxStyles } from './useCheckboxStyles';

import styles from './Checkbox.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/checkbox', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/checkbox');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useCheckbox: (...args: Parameters<typeof actual.useCheckbox>) => deepFreezeState(actual.useCheckbox(...args)),
  };
});

const sizes = ['medium', 'large'] as const;

// `input` is the primary slot, so every native prop — data-testid included — lands on the <input>;
// the root is only reachable through the container. The indicator is the root's only <div>, read
// structurally so a dropped module class cannot hide it.
const parts = (root: HTMLElement) => ({
  root,
  input: root.querySelector<HTMLInputElement>('input')!,
  indicator: root.querySelector<HTMLElement>('div'),
  label: root.querySelector<HTMLLabelElement>('label'),
});

const renderCheckbox = (props: React.ComponentProps<typeof Checkbox> = {}) => {
  const { container } = render(<Checkbox {...props} />);

  return parts(container.firstElementChild as HTMLElement);
};

const glyph = (indicator: HTMLElement | null) => {
  const svg = indicator?.querySelector('svg');

  return svg && { width: svg.getAttribute('width'), d: svg.querySelector('path')!.getAttribute('d') };
};

describe('Checkbox', () => {
  isConformant({
    Component: Checkbox,
    displayName: 'Checkbox',
    primarySlot: 'input',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderCheckbox();

    expect(root).toHaveClass('fui-checkbox');
    expect(root).toHaveClass('group/fui-checkbox');
    expect(root.classList[0]).toBe('fui-checkbox');
    expect(checkboxClassNames.root).toBe('fui-checkbox group/fui-checkbox');
  });

  it('applies one module class per slot, and never a class belonging to another slot', () => {
    const { root, input, indicator, label } = renderCheckbox({ label: 'Hello', shape: 'circular' });
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

      if (element !== indicator) {
        expect(element).not.toHaveClass(styles.circular);
      }
    });
  });

  it('adds the circular class to the indicator only for shape="circular"', () => {
    expect(renderCheckbox({ shape: 'circular' }).indicator).toHaveClass(styles.circular);
    expect(renderCheckbox().indicator).not.toHaveClass(styles.circular);
    expect(renderCheckbox({ shape: 'square' }).indicator).not.toHaveClass(styles.circular);
  });

  it('stamps data-size on the root alone', () => {
    expect(renderCheckbox().root.getAttribute('data-size')).toBe('medium');

    sizes.forEach(size => {
      const { root, input, indicator, label } = renderCheckbox({ size, label: 'Hello' });

      expect(root.getAttribute('data-size')).toBe(size);
      expect(input.hasAttribute('data-size')).toBe(false);
      expect(indicator!.hasAttribute('data-size')).toBe(false);
      expect(label!.hasAttribute('data-size')).toBe(false);
    });
  });

  it('restores the checkmark glyph, sized by the size prop', () => {
    expect(glyph(renderCheckbox({ defaultChecked: true }).indicator)).toEqual({
      width: '12',
      d: expect.stringMatching(/^M9\.76 3\.2c/),
    });
    expect(glyph(renderCheckbox({ defaultChecked: true, size: 'large' }).indicator)).toEqual({
      width: '16',
      d: expect.stringMatching(/^M14\.05 3\.49c/),
    });
  });

  it('restores the mixed glyph, branching on shape before size', () => {
    expect(glyph(renderCheckbox({ checked: 'mixed' }).indicator)).toEqual({
      width: '12',
      d: expect.stringMatching(/^M2 4c0-1\.1/),
    });
    expect(glyph(renderCheckbox({ checked: 'mixed', size: 'large' }).indicator)).toEqual({
      width: '16',
      d: expect.stringMatching(/^M2 4\.5A2\.5/),
    });

    sizes.forEach(size => {
      expect(glyph(renderCheckbox({ checked: 'mixed', shape: 'circular', size }).indicator)).toEqual({
        width: '1em',
        d: expect.stringMatching(/^M10 2a8 8/),
      });
    });
  });

  it('renders the indicator without a glyph while unchecked', () => {
    const { indicator } = renderCheckbox();

    expect(indicator).not.toBeNull();
    expect(indicator!.querySelector('svg')).toBeNull();
  });

  it('lets a consumer glyph win over the restored one', () => {
    const { indicator } = renderCheckbox({ defaultChecked: true, indicator: <i data-custom="" /> });

    expect(indicator!.querySelector('[data-custom]')).not.toBeNull();
    expect(indicator!.querySelector('svg')).toBeNull();
  });

  it('keeps both the resolved slot props and the glyph for a childless indicator object', () => {
    const { indicator } = renderCheckbox({ defaultChecked: true, indicator: { className: 'x', id: 'box' } });

    expect(indicator).toHaveClass(styles.indicator);
    expect(indicator).toHaveClass('x');
    expect(indicator!.id).toBe('box');
    expect(indicator!.querySelector('svg')).not.toBeNull();
  });

  it('keeps the glyph for indicator={{ children: undefined }} and for children: null', () => {
    expect(
      renderCheckbox({ defaultChecked: true, indicator: { children: undefined } }).indicator!.querySelector('svg'),
    ).not.toBeNull();
    expect(
      renderCheckbox({ defaultChecked: true, indicator: { children: null } }).indicator!.querySelector('svg'),
    ).not.toBeNull();
  });

  it('treats falsy-but-present indicator children as consumer content', () => {
    // The fallback is nullish-coalescing, matching Griffel's `children ??= glyph`: 0, '' and false
    // are content a consumer supplied, not an absent glyph.
    ([0, '', false] as const).forEach(children => {
      const { indicator } = renderCheckbox({ defaultChecked: true, indicator: { children } });

      expect(indicator!.querySelector('svg')).toBeNull();
    });

    expect(renderCheckbox({ defaultChecked: true, indicator: { children: 0 } }).indicator!.textContent).toBe('0');
  });

  it('removes the indicator slot for indicator={null}', () => {
    const { root, indicator } = renderCheckbox({ defaultChecked: true, indicator: null });

    expect(indicator).toBeNull();
    expect(root.querySelector('svg')).toBeNull();
    expect(root.children).toHaveLength(1);
  });

  it('keeps the headless aria-hidden default on the indicator, glyph or not', () => {
    expect(renderCheckbox().indicator!.getAttribute('aria-hidden')).toBe('true');
    expect(renderCheckbox({ defaultChecked: true }).indicator!.getAttribute('aria-hidden')).toBe('true');
  });

  it('keeps the circular class at both sizes', () => {
    sizes.forEach(size => {
      expect(renderCheckbox({ shape: 'circular', size }).indicator).toHaveClass(styles.circular);
    });
  });

  it('renders no label slot without a label prop', () => {
    const { root, label } = renderCheckbox();

    expect(label).toBeNull();
    expect(root.children).toHaveLength(2);
  });

  it('keeps a consumer className on the label slot', () => {
    const { label } = renderCheckbox({ label: { children: 'Hello', className: 'x' } });

    expect(label).toHaveClass(styles.label);
    expect(label).toHaveClass('x');
    expect(label!.textContent).toBe('Hello');
  });

  it('orders the slots input, then label around the indicator', () => {
    const after = renderCheckbox({ label: 'Hello' });

    expect(after.root.children[0]).toBe(after.input);
    expect(after.root.children[1]).toBe(after.indicator);
    expect(after.root.children[2]).toBe(after.label);

    const before = renderCheckbox({ label: 'Hello', labelPosition: 'before' });

    expect(before.root.children[0]).toBe(before.input);
    expect(before.root.children[1]).toBe(before.label);
    expect(before.root.children[2]).toBe(before.indicator);
  });

  it('leaves the headless data attributes alone', () => {
    const unchecked = renderCheckbox();

    expect(unchecked.root.hasAttribute('data-checked')).toBe(false);
    expect(unchecked.root.hasAttribute('data-disabled')).toBe(false);
    expect(unchecked.root.getAttribute('data-label-position')).toBe('after');

    expect(renderCheckbox({ checked: true }).root.getAttribute('data-checked')).toBe('');
    expect(renderCheckbox({ checked: 'mixed' }).root.getAttribute('data-checked')).toBe('mixed');
    expect(renderCheckbox({ disabled: true }).root.getAttribute('data-disabled')).toBe('');
    expect(renderCheckbox({ labelPosition: 'before' }).root.getAttribute('data-label-position')).toBe('before');
  });

  it('carries both data-disabled and data-checked when disabled and checked', () => {
    const { root } = renderCheckbox({ defaultChecked: true, disabled: true });

    expect(root.getAttribute('data-disabled')).toBe('');
    expect(root.getAttribute('data-checked')).toBe('');
  });

  it('carries data-disabled alongside data-checked="mixed", glyph included', () => {
    const { root, indicator } = renderCheckbox({ checked: 'mixed', disabled: true });

    expect(root.getAttribute('data-disabled')).toBe('');
    expect(root.getAttribute('data-checked')).toBe('mixed');
    expect(glyph(indicator)).toEqual({ width: '12', d: expect.stringMatching(/^M2 4c0-1\.1/) });
  });

  it('recomputes the glyph as a controlled checked value transitions mixed → true → false', () => {
    const onChange = jest.fn();
    const { rerender, container } = render(<Checkbox checked="mixed" label="Hello" onChange={onChange} />);
    const { root, indicator } = parts(container.firstElementChild as HTMLElement);

    expect(root.getAttribute('data-checked')).toBe('mixed');
    expect(glyph(indicator)).toEqual({ width: '12', d: expect.stringMatching(/^M2 4c0-1\.1/) });

    rerender(<Checkbox checked label="Hello" onChange={onChange} />);
    expect(root.getAttribute('data-checked')).toBe('');
    expect(glyph(indicator)).toEqual({ width: '12', d: expect.stringMatching(/^M9\.76 3\.2c/) });

    rerender(<Checkbox checked={false} label="Hello" onChange={onChange} />);
    expect(root.hasAttribute('data-checked')).toBe(false);
    expect(indicator!.querySelector('svg')).toBeNull();
  });

  it('passes the uncontrolled tri-state machinery through untouched', () => {
    const onChange = jest.fn();
    const { root, input } = renderCheckbox({ defaultChecked: 'mixed', onChange });

    expect(root.getAttribute('data-checked')).toBe('mixed');

    fireEvent.click(input);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ checked: true });
    expect(root.getAttribute('data-checked')).toBe('');
  });

  it('passes the controlled tri-state machinery through untouched', () => {
    const onChange = jest.fn();
    const { root, input } = renderCheckbox({ checked: false, onChange });

    fireEvent.click(input);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(root.hasAttribute('data-checked')).toBe(false);
  });

  it('splits native props onto the input and root props onto the root', () => {
    const { root, input } = renderCheckbox({
      className: 'consumer',
      'data-testid': 't',
      id: 'my-id',
      required: true,
    } as React.ComponentProps<typeof Checkbox>);

    expect(input.id).toBe('my-id');
    expect(input.required).toBe(true);
    expect(input.getAttribute('data-testid')).toBe('t');
    expect(root.hasAttribute('data-testid')).toBe(false);
    expect(root).toHaveClass('consumer');
    expect(input).not.toHaveClass('consumer');
  });

  it('keeps a consumer className on the root exactly once', () => {
    const { root } = renderCheckbox({ className: 'consumer' });

    expect(classOccurrences(root, 'consumer')).toBe(1);
    expect(classOccurrences(root, styles.root)).toBe(1);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'span', input: 'input', indicator: 'div', label: 'label' },
      checked: true,
      indicator: { className: 'consumer-indicator' },
      input: { className: 'native' },
      label: { className: 'consumer-label' },
      root: { className: 'consumer' },
      shape: 'circular',
      size: 'large',
    } as unknown as CheckboxState;

    const styled = useCheckboxStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.input).not.toBe(state.input);
    expect(styled.indicator).not.toBe(state.indicator);
    expect(styled.label).not.toBe(state.label);

    expect(state.root.className).toBe('consumer');
    expect(state.input.className).toBe('native');
    expect(state.indicator!.className).toBe('consumer-indicator');
    expect(state.label!.className).toBe('consumer-label');
    expect('data-size' in state.root).toBe(false);

    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(checkboxClassNames.root);
    expect(styled.input.className).toContain('native');
    expect(styled.indicator!.className).toContain('consumer-indicator');
    expect(styled.indicator!.className).toContain(styles.circular);
    expect(styled.label!.className).toContain('consumer-label');
  });

  it('renders the full pipeline against a frozen headless state without throwing', () => {
    expect(() => render(<Checkbox label="Hello" />)).not.toThrow();
    const onChange = jest.fn();

    expect(() => render(<Checkbox checked onChange={onChange} />)).not.toThrow();
    expect(() => render(<Checkbox checked="mixed" onChange={onChange} />)).not.toThrow();
    expect(() => render(<Checkbox checked indicator={null} onChange={onChange} />)).not.toThrow();
  });
});

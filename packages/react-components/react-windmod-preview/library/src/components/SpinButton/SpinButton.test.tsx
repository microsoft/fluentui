import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { SpinButton } from './SpinButton';
import type { SpinButtonState } from './SpinButton.types';
import { spinButtonClassNames, useSpinButtonStyles } from './useSpinButtonStyles';

import styles from './SpinButton.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/spin-button', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/spin-button');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useSpinButton: (...args: Parameters<typeof actual.useSpinButton>) => deepFreezeState(actual.useSpinButton(...args)),
  };
});

const appearances = ['outline', 'underline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium'] as const;

// `input` is the primary slot, so every native prop — data-testid included — lands on the
// <input>; the root is only reachable through the container. The two steppers are read in DOM
// order, which renderSpinButton fixes as input → increment → decrement.
const parts = (root: HTMLElement) => {
  const buttons = root.querySelectorAll<HTMLButtonElement>('button');

  return {
    root,
    input: root.querySelector<HTMLInputElement>('input')!,
    increment: buttons[0],
    decrement: buttons[1],
  };
};

const renderSpinButton = (props: React.ComponentProps<typeof SpinButton> = {}) => {
  const { container } = render(<SpinButton {...props} />);

  return parts(container.firstElementChild as HTMLElement);
};

// `fuicm-filled` is a prefix of three sibling idents and `fuicm-button` of two, so a substring
// assertion would pass vacuously; every class check below goes through toHaveClass.
describe('SpinButton', () => {
  isConformant({
    Component: SpinButton,
    displayName: 'SpinButton',
    primarySlot: 'input',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderSpinButton();

    expect(root).toHaveClass('fui-spin-button');
    expect(root).toHaveClass('group/fui-spin-button');
    expect(root.classList[0]).toBe('fui-spin-button');
    expect(spinButtonClassNames.root).toBe('fui-spin-button group/fui-spin-button');
  });

  it('applies one module class per slot', () => {
    const { root, input, increment, decrement } = renderSpinButton();

    expect(root).toHaveClass(styles.root);
    expect(input).toHaveClass(styles.input);
    expect(input).not.toHaveClass(styles.root);

    expect(increment).toHaveClass(styles.button);
    expect(increment).toHaveClass(styles.increment);
    expect(increment).not.toHaveClass(styles.decrement);

    expect(decrement).toHaveClass(styles.button);
    expect(decrement).toHaveClass(styles.decrement);
    expect(decrement).not.toHaveClass(styles.increment);
  });

  it('maps every appearance onto its own class set, at both sizes', () => {
    const expected: Record<(typeof appearances)[number], string[]> = {
      outline: [styles.outlineInteractive],
      underline: [styles.underline, styles.underlineInteractive],
      'filled-darker': [styles.filledDarker, styles.filled, styles.filledInteractive],
      'filled-lighter': [styles.filledLighter, styles.filled, styles.filledInteractive],
    };
    const all = [
      styles.underline,
      styles.filledDarker,
      styles.filledLighter,
      styles.filled,
      styles.outlineInteractive,
      styles.underlineInteractive,
      styles.filledInteractive,
    ];

    sizes.forEach(size =>
      appearances.forEach(appearance => {
        const { root } = renderSpinButton({ appearance, size });

        expect(root).toHaveAttribute('data-size', size);
        expected[appearance].forEach(className => expect(root).toHaveClass(className));
        all
          .filter(className => !expected[appearance].includes(className))
          .forEach(className => expect(root).not.toHaveClass(className));
      }),
    );
  });

  it('gives the steppers a class only for the two filled appearances', () => {
    const expected: Record<(typeof appearances)[number], string | undefined> = {
      outline: undefined,
      underline: undefined,
      'filled-darker': styles.buttonFilledDarker,
      'filled-lighter': styles.buttonFilledLighter,
    };

    appearances.forEach(appearance => {
      const { increment, decrement } = renderSpinButton({ appearance });

      [increment, decrement].forEach(button => {
        [styles.buttonFilledDarker, styles.buttonFilledLighter].forEach(className => {
          if (className === expected[appearance]) {
            expect(button).toHaveClass(className);
          } else {
            expect(button).not.toHaveClass(className);
          }
        });
      });
    });
  });

  it('defaults to outline / medium', () => {
    const { root } = renderSpinButton();

    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root).toHaveClass(styles.outlineInteractive);
    expect(root).not.toHaveClass(styles.underline);
    expect(root).not.toHaveClass(styles.filled);
  });

  it('drops every interactive and invalid class when disabled', () => {
    appearances.forEach(appearance => {
      const { root, increment, decrement } = renderSpinButton({ appearance, disabled: true, 'aria-invalid': true });

      expect(root).toHaveClass(styles.disabled);
      expect(root).not.toHaveClass(styles.invalid);
      [styles.outlineInteractive, styles.underlineInteractive, styles.filledInteractive].forEach(className =>
        expect(root).not.toHaveClass(className),
      );
      expect(increment).toBeDisabled();
      expect(decrement).toBeDisabled();
    });
  });

  it('reads aria-invalid with Griffel’s predicate, not the root over-stamp', () => {
    expect(renderSpinButton({ 'aria-invalid': true }).root).toHaveClass(styles.invalid);
    expect(renderSpinButton({ 'aria-invalid': 'true' }).root).toHaveClass(styles.invalid);
    expect(renderSpinButton({ 'aria-invalid': false }).root).not.toHaveClass(styles.invalid);
    expect(renderSpinButton({ 'aria-invalid': 'grammar' }).root).not.toHaveClass(styles.invalid);
  });

  it('carries the headless data-invalid over-stamp without styling on it', () => {
    const { root } = renderSpinButton({ 'aria-invalid': 'grammar' });

    expect(root).toHaveAttribute('data-invalid', 'grammar');
    expect(root).not.toHaveClass(styles.invalid);
  });

  it('disables both steppers for readOnly while the root stays enabled', () => {
    const { root, input, increment, decrement } = renderSpinButton({ readOnly: true, defaultValue: 5 });

    expect(increment).toBeDisabled();
    expect(decrement).toBeDisabled();
    expect(root).not.toHaveAttribute('data-disabled');
    expect(root).not.toHaveClass(styles.disabled);
    expect(input).not.toBeDisabled();
  });

  it('stamps data-spin-active on the stepper the keyboard is spinning', () => {
    const { input, increment, decrement } = renderSpinButton({ defaultValue: 5 });

    expect(increment).not.toHaveAttribute('data-spin-active');
    expect(decrement).not.toHaveAttribute('data-spin-active');

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(increment).toHaveAttribute('data-spin-active', 'true');
    expect(decrement).not.toHaveAttribute('data-spin-active');

    fireEvent.keyUp(input, { key: 'ArrowUp' });
    expect(increment).not.toHaveAttribute('data-spin-active');
    expect(decrement).not.toHaveAttribute('data-spin-active');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(decrement).toHaveAttribute('data-spin-active', 'true');
    expect(increment).not.toHaveAttribute('data-spin-active');
  });

  it('disables the stepper at the matching bound', () => {
    const atMax = renderSpinButton({ value: 10, min: 0, max: 10, onChange: () => undefined });
    expect(atMax.increment).toBeDisabled();
    expect(atMax.decrement).toBeEnabled();
    expect(atMax.root).toHaveAttribute('data-at-bound', 'max');

    const atMin = renderSpinButton({ value: 0, min: 0, max: 10, onChange: () => undefined });
    expect(atMin.decrement).toBeDisabled();
    expect(atMin.increment).toBeEnabled();
    expect(atMin.root).toHaveAttribute('data-at-bound', 'min');

    const atBoth = renderSpinButton({ value: 3, min: 3, max: 3, onChange: () => undefined });
    expect(atBoth.increment).toBeDisabled();
    expect(atBoth.decrement).toBeDisabled();
    expect(atBoth.root).toHaveAttribute('data-at-bound', 'both');
  });

  it('restores a different chevron in each stepper', () => {
    const { increment, decrement } = renderSpinButton();
    const path = (button: HTMLElement) => button.querySelector('svg path')!.getAttribute('d')!;

    expect(increment.querySelector('svg')).not.toBeNull();
    expect(decrement.querySelector('svg')).not.toBeNull();
    expect(path(increment)).toMatch(/^M3\.15 10\.35/);
    expect(path(decrement)).toMatch(/^M3\.15 5\.65/);
    expect(path(increment)).not.toBe(path(decrement));
  });

  it.each([
    ['element shorthand', <i key="i" data-custom="" />],
    ['children shorthand', { children: <i data-custom="" /> }],
  ])('lets a consumer glyph win over the default (%s)', (_label, value) => {
    const { increment, decrement } = renderSpinButton({
      incrementButton: value as never,
      decrementButton: value as never,
    });

    expect(increment.querySelector('[data-custom]')).not.toBeNull();
    expect(increment.querySelector('svg')).toBeNull();
    expect(decrement.querySelector('[data-custom]')).not.toBeNull();
    expect(decrement.querySelector('svg')).toBeNull();
  });

  it('keeps both the consumer className and the default glyph', () => {
    const { increment, decrement } = renderSpinButton({
      incrementButton: { className: 'mine' },
      decrementButton: { className: 'mine' },
    });

    [increment, decrement].forEach(button => {
      expect(button).toHaveClass('mine');
      expect(button).toHaveClass(styles.button);
      expect(button.querySelector('svg')).not.toBeNull();
    });
    expect(increment).toHaveClass(styles.increment);
    expect(decrement).toHaveClass(styles.decrement);
  });

  it('keeps a consumer className on the input slot exactly once', () => {
    const { input } = renderSpinButton({ input: { className: 'mine' } });

    expect(input).toHaveClass(styles.input);
    // classList is an ordered set, so a duplicated token is only visible in the raw attribute.
    expect(
      input
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'mine'),
    ).toHaveLength(1);
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
  ])('falls back to the glyph when children are %s', (_label, children) => {
    const { increment, decrement } = renderSpinButton({
      incrementButton: { children },
      decrementButton: { children },
    });

    expect(increment.querySelector('svg')).not.toBeNull();
    expect(decrement.querySelector('svg')).not.toBeNull();
  });

  it('keeps the stepper accessibility defaults through the restoration', () => {
    const { increment, decrement } = renderSpinButton();

    [increment, decrement].forEach(button => {
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('tabindex', '-1');
    });
    expect(increment).toHaveAttribute('aria-label', 'Increment value');
    expect(decrement).toHaveAttribute('aria-label', 'Decrement value');
  });

  it('steps the value from either stepper', () => {
    const onChange = jest.fn();
    const up = renderSpinButton({ defaultValue: 5, onChange });
    fireEvent.mouseDown(up.increment);
    expect(up.input.value).toBe('6');
    expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 6 });

    const down = renderSpinButton({ defaultValue: 5 });
    fireEvent.mouseDown(down.decrement);
    expect(down.input.value).toBe('4');
  });

  it('fires a consumer onMouseDown alongside the step', () => {
    const onMouseDown = jest.fn();
    const { input, increment } = renderSpinButton({ defaultValue: 5, incrementButton: { onMouseDown } });

    fireEvent.mouseDown(increment);

    expect(onMouseDown).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('6');
  });

  it('renders input, increment, decrement in that order', () => {
    const { root } = renderSpinButton();

    expect(Array.from(root.children).map(child => child.tagName)).toEqual(['INPUT', 'BUTTON', 'BUTTON']);
  });

  it('routes native props to the input and className/style to the root', () => {
    const { root, input } = renderSpinButton({
      id: 'my-id',
      name: 'q',
      required: true,
      readOnly: true,
      placeholder: 'ph',
      'data-testid': 'target',
      className: 'mine',
      style: { width: 100 },
    } as React.ComponentProps<typeof SpinButton>);

    expect(input).toHaveAttribute('id', 'my-id');
    expect(input).toHaveAttribute('name', 'q');
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveAttribute('placeholder', 'ph');
    expect(input).toHaveAttribute('data-testid', 'target');
    expect(input).toHaveAttribute('role', 'spinbutton');
    expect(input).toHaveAttribute('type', 'text');
    expect(root).toHaveClass('mine');
    expect(root).toHaveStyle({ width: '100px' });
    expect(root).not.toHaveAttribute('data-testid');
  });

  it('keeps the uncontrolled value and steps it', () => {
    const { input } = renderSpinButton({ defaultValue: 5 });

    expect(input.value).toBe('5');
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input.value).toBe('6');
  });

  it('leaves a controlled value to the consumer', () => {
    const onChange = jest.fn();
    const { input } = renderSpinButton({ value: 5, onChange });

    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input.value).toBe('5');
    expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 6 });
  });

  it('shows displayValue instead of the raw value', () => {
    const { input } = renderSpinButton({ value: 1, displayValue: '$1.00', onChange: () => undefined });

    expect(input.value).toBe('$1.00');
    expect(input).toHaveAttribute('aria-valuetext', '$1.00');
  });

  it('renders an empty value for value={null}', () => {
    const { input } = renderSpinButton({ value: null, onChange: () => undefined });

    expect(input.value).toBe('');
    expect(input).not.toHaveAttribute('aria-valuenow');
  });

  it('appends a consumer className to the root exactly once', () => {
    // classList is an ordered set, so a duplicated token is only visible in the raw attribute.
    const { root } = renderSpinButton({ className: 'mine' });
    const occurrences = root
      .getAttribute('class')!
      .split(/\s+/)
      .filter(name => name === 'mine');

    expect(occurrences).toHaveLength(1);
  });

  it('stamps data-size on the root and nothing else of its own', () => {
    const { root, increment, decrement } = renderSpinButton({ size: 'small' });

    expect(root).toHaveAttribute('data-size', 'small');
    expect(
      Array.from(root.attributes)
        .map(attribute => attribute.name)
        .sort(),
    ).toEqual(['class', 'data-size']);
    expect(increment).not.toHaveAttribute('data-size');
    expect(decrement).not.toHaveAttribute('data-size');
  });

  it('leaves the state it was handed untouched', () => {
    const state = {
      appearance: 'filled-darker',
      size: 'small',
      spinState: 'up',
      components: {},
      atBound: 'none',
      root: { className: 'root-original' },
      input: { className: 'input-original', disabled: false },
      incrementButton: { className: 'increment-original' },
      decrementButton: { className: 'decrement-original' },
    } as unknown as SpinButtonState;

    const styled = useSpinButtonStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.input).not.toBe(state.input);
    expect(styled.incrementButton).not.toBe(state.incrementButton);
    expect(styled.decrementButton).not.toBe(state.decrementButton);
    expect(state.root.className).toBe('root-original');
    expect(state.input.className).toBe('input-original');
    expect(state.incrementButton.className).toBe('increment-original');
    expect(state.decrementButton.className).toBe('decrement-original');
    expect(state.root).not.toHaveProperty('data-size');
    expect(state.incrementButton).not.toHaveProperty('data-spin-active');
    expect(state.decrementButton).not.toHaveProperty('data-spin-active');
  });
});

import * as React from 'react';
import { render } from '@testing-library/react';

import { classOccurrences } from '../../testing/classOccurrences';
import { isConformant } from '../../testing/isConformant';
import { Slider } from './Slider';
import type { SliderState } from './Slider.types';
import { sliderClassNames, useSliderStyles } from './useSliderStyles';

import styles from './Slider.module.css';

// `input` is the primary slot, so every native prop — data-testid included — lands on the
// <input>; the root is only reachable through the container. Render order is input, rail, thumb.
const renderSlider = (props: React.ComponentProps<typeof Slider> = {}) => {
  const { container } = render(<Slider {...props} />);
  const root = container.firstElementChild as HTMLElement;
  const [input, rail, thumb] = Array.from(root.children) as HTMLElement[];

  return { input: input as HTMLInputElement, rail, root, thumb };
};

const progressOf = (root: HTMLElement) => root.style.getPropertyValue('--fui-Slider--progress');

describe('Slider', () => {
  isConformant({
    Component: Slider,
    displayName: 'Slider',
    primarySlot: 'input',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderSlider();

    expect(root).toHaveClass('fui-slider');
    expect(root).toHaveClass('group/fui-slider');
    expect(root.classList[0]).toBe('fui-slider');
    expect(sliderClassNames.root).toBe('fui-slider group/fui-slider');
  });

  it('applies one module class per slot', () => {
    const { input, rail, root, thumb } = renderSlider();

    expect(root.children).toHaveLength(3);
    expect(input.tagName).toBe('INPUT');
    expect(input.type).toBe('range');

    const slots = { input, rail, root, thumb };
    const classes = { input: styles.input, rail: styles.rail, root: styles.root, thumb: styles.thumb };

    (Object.keys(slots) as Array<keyof typeof slots>).forEach(slot => {
      expect(slots[slot]).toHaveClass(classes[slot]);
      (Object.keys(classes) as Array<keyof typeof classes>)
        .filter(other => other !== slot)
        .forEach(other => expect(slots[slot]).not.toHaveClass(classes[other]));
    });
  });

  it('stamps data-size on the root alone, defaulting to medium', () => {
    const medium = renderSlider();

    expect(medium.root.getAttribute('data-size')).toBe('medium');

    (['small', 'medium'] as const).forEach(size => {
      const { input, rail, root, thumb } = renderSlider({ size });

      expect(root.getAttribute('data-size')).toBe(size);
      expect(input.hasAttribute('data-size')).toBe(false);
      expect(rail.hasAttribute('data-size')).toBe(false);
      expect(thumb.hasAttribute('data-size')).toBe(false);
    });
  });

  it('keeps the look prop off the range input', () => {
    (['small', 'medium'] as const).forEach(size => {
      expect(renderSlider({ size }).input.hasAttribute('size')).toBe(false);
    });

    // `size` is on react-utilities' input allow-list, so a forwarded one reaches the primary slot;
    // React then drops it for a non-numeric value. Only a numeric probe shows the destructure,
    // rather than that coercion, is what keeps the look prop off the input.
    const numeric = renderSlider({ size: 16 } as unknown as React.ComponentProps<typeof Slider>);

    expect(numeric.input.hasAttribute('size')).toBe(false);
  });

  it('leaves the headless state stamps alone and adds none of its own', () => {
    const resting = renderSlider();

    expect(resting.root.hasAttribute('data-disabled')).toBe(false);
    expect(resting.root.hasAttribute('data-vertical')).toBe(false);
    expect(resting.root.hasAttribute('data-orientation')).toBe(false);

    const off = renderSlider({ disabled: false, vertical: false });

    expect(off.root.hasAttribute('data-disabled')).toBe(false);
    expect(off.root.hasAttribute('data-vertical')).toBe(false);

    const disabled = renderSlider({ disabled: true });

    expect(disabled.root.getAttribute('data-disabled')).toBe('');
    expect(disabled.input.disabled).toBe(true);

    const vertical = renderSlider({ vertical: true });

    expect(vertical.root.getAttribute('data-vertical')).toBe('');
    expect(vertical.root.hasAttribute('data-orientation')).toBe(false);
    expect(vertical.input.getAttribute('orient')).toBe('vertical');
  });

  it('forwards min, max and step to the input as native attributes', () => {
    const remapped = renderSlider({ max: 10, min: -5, step: 2 }).input;

    expect(remapped.getAttribute('min')).toBe('-5');
    expect(remapped.getAttribute('max')).toBe('10');
    expect(remapped.getAttribute('step')).toBe('2');

    const defaults = renderSlider().input;

    expect(defaults.hasAttribute('min')).toBe(false);
    expect(defaults.hasAttribute('max')).toBe(false);
    expect(defaults.hasAttribute('step')).toBe(false);
  });

  it('leaves the root carrying the headless-computed inline custom properties', () => {
    const controlled = renderSlider({ value: 50 });

    expect(progressOf(controlled.root)).toBe('50%');
    expect(controlled.root.style.getPropertyValue('--fui-Slider--direction')).toBe('90deg');

    expect(progressOf(renderSlider({ defaultValue: 25 }).root)).toBe('25%');
    expect(progressOf(renderSlider({ max: 10, min: 0, value: 5 }).root)).toBe('50%');
    expect(progressOf(renderSlider({ max: 50, min: -50, value: -25 }).root)).toBe('25%');

    const stepped = renderSlider({ step: 10, value: 50 });

    expect(stepped.root.style.getPropertyValue('--fui-Slider--steps-percent')).toBe('10%');
    expect(renderSlider({ value: 50 }).root.style.getPropertyValue('--fui-Slider--steps-percent')).toBe('');
    expect(renderSlider({ step: 0, value: 50 }).root.style.getPropertyValue('--fui-Slider--steps-percent')).toBe('');
  });

  it('leaves value clamping to the headless hook', () => {
    const above = renderSlider({ value: 150 });

    expect(above.input.value).toBe('100');
    expect(progressOf(above.root)).toBe('100%');

    const below = renderSlider({ value: -10 });

    expect(below.input.value).toBe('0');
    expect(progressOf(below.root)).toBe('0%');
  });

  it('keeps a consumer className on the root exactly once', () => {
    const { input, root } = renderSlider({ className: 'consumer' });

    expect(classOccurrences(root, 'consumer')).toBe(1);
    expect(root).toHaveClass(styles.root);
    expect(input).not.toHaveClass('consumer');
  });

  it('keeps the resolved slot props of every shorthand', () => {
    const { input, rail, thumb } = renderSlider({
      input: { className: 'i', id: 'field' },
      rail: { className: 'r', id: 'track' },
      thumb: { className: 't', id: 'knob' },
    });

    expect(rail).toHaveClass(styles.rail);
    expect(rail).toHaveClass('r');
    expect(rail.id).toBe('track');
    expect(thumb).toHaveClass(styles.thumb);
    expect(thumb).toHaveClass('t');
    expect(thumb.id).toBe('knob');
    expect(input).toHaveClass(styles.input);
    expect(input).toHaveClass('i');
    expect(input.id).toBe('field');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { input: 'input', rail: 'div', root: 'div', thumb: 'div' },
      input: { className: 'native' },
      rail: { className: 'consumer-rail' },
      root: { className: 'consumer', style: { '--fui-Slider--progress': '50%' } },
      size: 'small',
      thumb: { className: 'consumer-thumb' },
    } as unknown as SliderState;

    const styled = useSliderStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.rail).not.toBe(state.rail);
    expect(styled.thumb).not.toBe(state.thumb);
    expect(styled.input).not.toBe(state.input);

    expect(state.root.className).toBe('consumer');
    expect(state.rail.className).toBe('consumer-rail');
    expect(state.thumb.className).toBe('consumer-thumb');
    expect(state.input.className).toBe('native');
    expect('data-size' in state.root).toBe(false);

    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(sliderClassNames.root);
    expect(styled.rail.className).toContain('consumer-rail');
    expect(styled.thumb.className).toContain('consumer-thumb');
    expect(styled.input.className).toContain('native');
  });

  it('leaves the root inline style untouched', () => {
    const state = {
      components: { input: 'input', rail: 'div', root: 'div', thumb: 'div' },
      input: {},
      rail: {},
      root: { style: { '--fui-Slider--direction': '90deg', '--fui-Slider--progress': '50%' } },
      size: 'medium',
      thumb: {},
    } as unknown as SliderState;

    const styled = useSliderStyles(state);

    expect(styled.root.style).toBe(state.root.style);
    expect(styled.root.style).toEqual({ '--fui-Slider--direction': '90deg', '--fui-Slider--progress': '50%' });
  });

  it('passes the input slot props through the styles hook', () => {
    const onChange = jest.fn();
    const state = {
      components: { input: 'input', rail: 'div', root: 'div', thumb: 'div' },
      input: { onChange, value: 42 },
      rail: {},
      root: {},
      size: 'medium',
      thumb: {},
    } as unknown as SliderState;

    const styled = useSliderStyles(state);

    expect(styled.input.value).toBe(42);
    expect(styled.input.onChange).toBe(onChange);
  });
});

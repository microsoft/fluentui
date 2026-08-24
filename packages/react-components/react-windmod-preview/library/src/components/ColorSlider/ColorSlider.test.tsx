import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { ColorSlider } from './ColorSlider';
import type { ColorSliderState } from './ColorSlider.types';
import { colorSliderClassNames, useColorSliderStyles } from './useColorSliderStyles';

import styles from './ColorSlider.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/color-picker', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/color-picker');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useColorSlider: (...args: Parameters<typeof actual.useColorSlider>) =>
      deepFreezeState(actual.useColorSlider(...args)),
  };
});

const teal = { h: 180, s: 0.5, v: 0.6 };

// `input` is the primary slot, so every native prop — data-testid included — lands on the <input>;
// the root is only reachable through the container. Render order is input, rail, thumb.
const slotsOf = (root: HTMLElement) => {
  const [input, rail, thumb] = Array.from(root.children) as HTMLElement[];

  return { input: input as HTMLInputElement, rail, root, thumb };
};

const renderColorSlider = (props: React.ComponentProps<typeof ColorSlider> = {}) => {
  const { container } = render(<ColorSlider {...props} />);

  return slotsOf(container.firstElementChild as HTMLElement);
};

// The jest css-module proxy drops the component and hash segments, so every `root` in the
// package is the same string; a slider inside a picker is found by position, never by class.
const sliderInPicker = (picker: HTMLElement) => slotsOf(picker.firstElementChild as HTMLElement);

describe('ColorSlider', () => {
  isConformant({
    Component: ColorSlider,
    displayName: 'ColorSlider',
    primarySlot: 'input',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderColorSlider();

    expect(root).toHaveClass('fui-color-slider');
    expect(root).toHaveClass('group/fui-color-slider');
    expect(root.classList[0]).toBe('fui-color-slider');
    expect(colorSliderClassNames.root).toBe('fui-color-slider group/fui-color-slider');
  });

  it('applies one module class per slot', () => {
    const { input, rail, root, thumb } = renderColorSlider();

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

  it('carries the peer marker on the input alone', () => {
    const { input, rail, root, thumb } = renderColorSlider();

    expect(input).toHaveClass('peer/fui-color-slider');
    // classList[0] must stay slash-free — see componentMarkers.
    expect(input.classList[0]).toBe(styles.input);

    [rail, root, thumb].forEach(slot => expect(slot).not.toHaveClass('peer/fui-color-slider'));
  });

  it('stamps data-shape on the root alone, defaulting to rounded', () => {
    expect(renderColorSlider().root.getAttribute('data-shape')).toBe('rounded');

    (['rounded', 'square'] as const).forEach(shape => {
      const { input, rail, root, thumb } = renderColorSlider({ shape });

      expect(root.getAttribute('data-shape')).toBe(shape);
      [input, rail, thumb].forEach(slot => expect(slot.hasAttribute('data-shape')).toBe(false));
    });
  });

  it('takes the shape from an enclosing ColorPicker', () => {
    const { container } = render(
      <ColorPicker shape="square">
        <ColorSlider />
      </ColorPicker>,
    );

    expect(sliderInPicker(container.firstElementChild as HTMLElement).root.getAttribute('data-shape')).toBe('square');
  });

  it('lets its own shape prop win over the picker context', () => {
    const { container } = render(
      <ColorPicker shape="square">
        <ColorSlider shape="rounded" />
      </ColorPicker>,
    );

    expect(sliderInPicker(container.firstElementChild as HTMLElement).root.getAttribute('data-shape')).toBe('rounded');
  });

  it('falls back to rounded inside a ColorPicker that sets no shape', () => {
    const { container } = render(
      <ColorPicker>
        <ColorSlider />
      </ColorPicker>,
    );

    expect(sliderInPicker(container.firstElementChild as HTMLElement).root.getAttribute('data-shape')).toBe('rounded');
  });

  it('keeps the look prop off the range input', () => {
    (['rounded', 'square'] as const).forEach(shape => {
      expect(renderColorSlider({ shape }).input.hasAttribute('shape')).toBe(false);
    });
  });

  it('leaves the headless stamps and the native range contract alone', () => {
    const { input, root } = renderColorSlider();

    expect(root.getAttribute('data-channel')).toBe('hue');
    expect(root.getAttribute('data-orientation')).toBe('horizontal');
    expect(root.getAttribute('role')).toBe('group');
    expect(input.getAttribute('min')).toBe('0');
    expect(input.getAttribute('max')).toBe('360');
    expect(input.getAttribute('tabindex')).toBe('0');
    expect(input.getAttribute('aria-orientation')).toBe('horizontal');

    const vertical = renderColorSlider({ vertical: true });

    expect(vertical.root.getAttribute('data-orientation')).toBe('vertical');
    expect(vertical.input.getAttribute('aria-orientation')).toBe('vertical');

    const saturation = renderColorSlider({ channel: 'saturation' });

    expect(saturation.root.getAttribute('data-channel')).toBe('saturation');
    expect(saturation.input.getAttribute('max')).toBe('100');
  });

  it('leaves the root inline custom properties exactly as the headless hook wrote them', () => {
    const { root } = renderColorSlider({ channel: 'saturation', color: teal, style: { marginTop: 3 } });
    const style = root.getAttribute('style')!;

    expect(root.style.getPropertyValue('--fui-Slider--direction')).toBe('-90deg');
    expect(root.style.getPropertyValue('--fui-Slider--progress')).toBe('50%');
    expect(root.style.getPropertyValue('--fui-Slider__thumb--color')).not.toBe('');
    expect(root.style.getPropertyValue('--fui-Slider__rail--color')).not.toBe('');
    expect(root.style.marginTop).toBe('3px');

    // The hook spreads {...rootVariables, ...state.root.style}, so a consumer style wins and
    // lands last. Order is only visible in the raw attribute.
    expect(style.indexOf('--fui-Slider--direction')).toBeLessThan(style.indexOf('margin-top'));
  });

  it('reports a colour change from the input', () => {
    const onChange = jest.fn();
    const { input } = renderColorSlider({ color: teal, onChange });

    fireEvent.change(input, { target: { value: '240' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1].color).toEqual(expect.objectContaining({ h: 240 }));
  });

  it('leaves a controlled colour where it was put', () => {
    const { input } = renderColorSlider({ color: teal });

    expect(input.value).toBe('180');
    fireEvent.change(input, { target: { value: '240' } });
    expect(input.value).toBe('180');
  });

  it('keeps a consumer className on every slot exactly once', () => {
    const { input, rail, root, thumb } = renderColorSlider({
      className: 'consumer',
      input: { className: 'i' },
      rail: { className: 'r' },
      thumb: { className: 't' },
    });

    // classList is an ordered set, so a duplicated token is only visible in the raw attribute.
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(rail).toHaveClass('r');
    expect(thumb).toHaveClass('t');
    expect(input).toHaveClass('i');
  });

  it('lands native props on the primary slot', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { input, root } = renderColorSlider({
      'aria-label': 'hue',
      'data-testid': 'probe',
      id: 'field',
      ref,
    } as React.ComponentProps<typeof ColorSlider>);

    expect(input.id).toBe('field');
    expect(input.getAttribute('data-testid')).toBe('probe');
    expect(input.getAttribute('aria-label')).toBe('hue');
    expect(ref.current).toBe(input);
    expect(root.hasAttribute('data-testid')).toBe(false);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { input: 'input', rail: 'div', root: 'div', thumb: 'div' },
      input: { className: 'native' },
      rail: { className: 'consumer-rail' },
      root: { className: 'consumer', style: { '--fui-Slider--progress': '50%' } },
      shape: 'square',
      thumb: { className: 'consumer-thumb' },
    } as unknown as ColorSliderState;

    const styled = useColorSliderStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.rail).not.toBe(state.rail);
    expect(styled.thumb).not.toBe(state.thumb);
    expect(styled.input).not.toBe(state.input);

    expect(state.root.className).toBe('consumer');
    expect(state.rail.className).toBe('consumer-rail');
    expect(state.thumb.className).toBe('consumer-thumb');
    expect(state.input.className).toBe('native');
    expect('data-shape' in state.root).toBe(false);

    expect(styled.root.style).toBe(state.root.style);
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(colorSliderClassNames.root);
    expect(styled.input.className).toContain('native');
  });
});

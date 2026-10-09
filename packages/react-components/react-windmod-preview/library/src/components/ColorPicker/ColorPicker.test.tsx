import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { useColorPickerContextValue } from '@fluentui/react-headless-components-preview/color-picker';

import { classOccurrences } from '../../testing/classOccurrences';
import { isConformant } from '../../testing/isConformant';
import { ColorArea } from '../ColorArea/ColorArea';
import { ColorSlider } from '../ColorSlider/ColorSlider';
import { ColorPicker } from './ColorPicker';
import type { ColorPickerState } from './ColorPicker.types';
import { colorPickerClassNames, useColorPickerStyles } from './useColorPickerStyles';

import styles from './ColorPicker.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/color-picker', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/color-picker');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useColorPicker: (...args: Parameters<typeof actual.useColorPicker>) =>
      deepFreezeState(actual.useColorPicker(...args)),
  };
});

const teal = { h: 180, s: 0.5, v: 0.6 };

const renderColorPicker = (props: React.ComponentProps<typeof ColorPicker> = {}) => {
  const { container } = render(<ColorPicker {...props} />);

  return { root: container.firstElementChild as HTMLElement };
};

/** Reports what a child actually reads off the picker context, which has no DOM consequence. */
const ShapeProbe = ({ onRead }: { onRead: (shape: unknown) => void }): null => {
  onRead(useColorPickerContextValue(ctx => ctx.shape));

  return null;
};

describe('ColorPicker', () => {
  isConformant({
    Component: ColorPicker,
    displayName: 'ColorPicker',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderColorPicker();

    expect(root).toHaveClass('fui-color-picker');
    expect(root).toHaveClass('group/fui-color-picker');
    expect(root.classList[0]).toBe('fui-color-picker');
    expect(colorPickerClassNames.root).toBe('fui-color-picker group/fui-color-picker');
    expect(root).toHaveClass(styles.root);
  });

  it('stamps nothing on the root', () => {
    const { root } = renderColorPicker({ shape: 'square' });

    expect(root.hasAttribute('data-shape')).toBe(false);
    expect(root.hasAttribute('shape')).toBe(false);
  });

  it('publishes its shape to the context', () => {
    const reads: unknown[] = [];

    render(
      <ColorPicker shape="square">
        <ShapeProbe onRead={shape => reads.push(shape)} />
      </ColorPicker>,
    );

    expect(reads).toContain('square');
  });

  it('publishes undefined when no shape is set, leaving the fallback to the controls', () => {
    const reads: unknown[] = [];

    render(
      <ColorPicker>
        <ShapeProbe onRead={shape => reads.push(shape)} />
      </ColorPicker>,
    );

    expect(reads.length).toBeGreaterThan(0);
    reads.forEach(shape => expect(shape).toBeUndefined());
  });

  it('reaches every kind of control with its shape', () => {
    const { container } = render(
      <ColorPicker shape="square">
        <ColorSlider />
        <ColorArea />
      </ColorPicker>,
    );
    const [slider, area] = Array.from((container.firstElementChild as HTMLElement).children) as HTMLElement[];

    expect(slider.getAttribute('data-shape')).toBe('square');
    expect(area.getAttribute('data-shape')).toBe('square');
  });

  it('reaches its controls with its colour', () => {
    const { container } = render(
      <ColorPicker color={teal}>
        <ColorSlider channel="saturation" />
      </ColorPicker>,
    );
    const inherited = (container.firstElementChild as HTMLElement).firstElementChild as HTMLElement;

    const direct = render(<ColorSlider channel="saturation" color={teal} />).container.firstElementChild as HTMLElement;

    expect(inherited.style.getPropertyValue('--fui-Slider__rail--color')).toBe(
      direct.style.getPropertyValue('--fui-Slider__rail--color'),
    );
    expect(inherited.style.getPropertyValue('--fui-Slider--progress')).toBe(
      direct.style.getPropertyValue('--fui-Slider--progress'),
    );
    expect(inherited.style.getPropertyValue('--fui-Slider--progress')).toBe('50%');
  });

  it('carries a control change back out through onColorChange', () => {
    const onColorChange = jest.fn();
    const { container } = render(
      <ColorPicker color={teal} onColorChange={onColorChange}>
        <ColorSlider />
      </ColorPicker>,
    );
    const input = (container.firstElementChild as HTMLElement).firstElementChild!.firstElementChild as HTMLInputElement;

    fireEvent.change(input, { target: { value: '240' } });

    expect(onColorChange).toHaveBeenCalledTimes(1);
    expect(onColorChange.mock.calls[0][1].color).toEqual(expect.objectContaining({ h: 240 }));
  });

  it('renders its children inside the root', () => {
    const { root } = renderColorPicker({ children: <span data-testid="child" /> });

    expect(root.querySelector('[data-testid="child"]')).not.toBeNull();
  });

  it('keeps a consumer className on the root exactly once', () => {
    const { root } = renderColorPicker({ className: 'consumer' });

    expect(classOccurrences(root, 'consumer')).toBe(1);
  });

  it('lands native props on the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { root } = renderColorPicker({
      'data-testid': 'probe',
      id: 'picker',
      ref,
    } as React.ComponentProps<typeof ColorPicker>);

    expect(root.id).toBe('picker');
    expect(root.getAttribute('data-testid')).toBe('probe');
    expect(ref.current).toBe(root);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'div' },
      root: { className: 'consumer', style: { marginTop: 3 } },
      shape: 'square',
    } as unknown as ColorPickerState;

    const styled = useColorPickerStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.style).toBe(state.root.style);
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(colorPickerClassNames.root);
    expect(styled.shape).toBe('square');
  });
});

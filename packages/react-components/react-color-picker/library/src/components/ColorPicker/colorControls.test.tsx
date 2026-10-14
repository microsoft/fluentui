import * as React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ColorPickerProvider } from '../../contexts/colorPicker';
import { ColorSlider } from '../ColorSlider/ColorSlider';
import { colorSliderCSSVars } from '../ColorSlider/ColorSlider.constants';
import type { ColorChannel } from '../ColorSlider/ColorSlider.types';
import { AlphaSlider } from '../AlphaSlider/AlphaSlider';
import { alphaSliderCSSVars } from '../AlphaSlider/AlphaSlider.constants';
import { ColorArea } from '../ColorArea/ColorArea';

const initialColor = { h: 240, s: 0.4, v: 0.8, a: 0.6 };

function expectColor(root: HTMLElement, variable: string, expected: string) {
  const probe = root.ownerDocument.createElement('span');
  probe.style.color = root.style.getPropertyValue(variable);
  expect(probe.style.color).toBe(expected);
}

describe.each([
  { name: 'ColorSlider', Control: ColorSlider, initialValue: '240', changedValue: '120', field: 'h' },
  { name: 'AlphaSlider', Control: AlphaSlider, initialValue: '60', changedValue: '30', field: 'a' },
])('$name color ownership', ({ Control, initialValue, changedValue, field }) => {
  it('preserves the default color through repeated uncontrolled edits', () => {
    const onChange = jest.fn();
    render(<Control defaultColor={initialColor} onChange={onChange} />);
    const input = screen.getByRole('slider');
    expect(input).toHaveValue(initialValue);
    fireEvent.change(input, { target: { value: changedValue } });
    expect(onChange.mock.lastCall[1].color).toEqual({
      ...initialColor,
      [field]: field === 'a' ? Number(changedValue) / 100 : Number(changedValue),
    });
    expect(input).toHaveValue(changedValue);
    fireEvent.change(input, { target: { value: '90' } });
    expect(onChange.mock.lastCall[1].color).toEqual({ ...initialColor, [field]: field === 'a' ? 0.9 : 90 });
    expect(input).toHaveValue('90');
  });

  it('freezes controlled state while reporting changes and honoring input callbacks', () => {
    const onChange = jest.fn();
    const inputOnChange = jest.fn();
    render(<Control color={initialColor} onChange={onChange} input={{ onChange: inputOnChange }} />);
    const input = screen.getByRole('slider');
    fireEvent.change(input, { target: { value: changedValue } });
    expect(input).toHaveValue(initialValue);
    expect(inputOnChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        type: 'change',
        color: {
          ...initialColor,
          [field]: field === 'a' ? Number(changedValue) / 100 : Number(changedValue),
        },
      }),
    );
  });

  it('uses context color and callback, and responds to context updates', () => {
    const requestChange = jest.fn();
    const view = (color: typeof initialColor) => (
      <ColorPickerProvider value={{ color, requestChange }}>
        <Control />
      </ColorPickerProvider>
    );
    const { rerender } = render(view(initialColor));
    const input = screen.getByRole('slider');
    fireEvent.change(input, { target: { value: changedValue } });
    expect(input).toHaveValue(initialValue);
    expect(requestChange.mock.lastCall[1].color).toEqual({
      ...initialColor,
      [field]: field === 'a' ? Number(changedValue) / 100 : Number(changedValue),
    });
    const updatedColor = { h: 180, s: 0.2, v: 0.5, a: 0.8 };
    rerender(view(updatedColor));
    expect(input).toHaveValue(field === 'a' ? '80' : '180');
    fireEvent.change(input, { target: { value: '90' } });
    expect(requestChange.mock.lastCall[1].color).toEqual({ ...updatedColor, [field]: field === 'a' ? 0.9 : 90 });
  });

  it('prefers explicit color and onChange over context', () => {
    const requestChange = jest.fn();
    const onChange = jest.fn();
    render(
      <ColorPickerProvider value={{ color: { h: 0, s: 1, v: 1, a: 1 }, requestChange }}>
        <Control color={initialColor} onChange={onChange} />
      </ColorPickerProvider>,
    );
    fireEvent.change(screen.getByRole('slider'), { target: { value: changedValue } });
    expect(requestChange).not.toHaveBeenCalled();
    expect(onChange.mock.lastCall[1].color).toEqual({
      ...initialColor,
      [field]: field === 'a' ? Number(changedValue) / 100 : Number(changedValue),
    });
  });

  it('prefers an explicit onChange while consuming context color', () => {
    const requestChange = jest.fn();
    const onChange = jest.fn();
    render(
      <ColorPickerProvider value={{ color: initialColor, requestChange }}>
        <Control onChange={onChange} />
      </ColorPickerProvider>,
    );
    fireEvent.change(screen.getByRole('slider'), { target: { value: changedValue } });
    expect(requestChange).not.toHaveBeenCalled();
    expect(onChange.mock.lastCall[1].color).toEqual({
      ...initialColor,
      [field]: field === 'a' ? Number(changedValue) / 100 : Number(changedValue),
    });
  });
});

describe('ColorSlider channel ramps', () => {
  it('retains every channel when an uncontrolled slider switches channels', () => {
    const onChange = jest.fn();
    const { rerender } = render(<ColorSlider defaultColor={initialColor} onChange={onChange} />);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '120' } });
    rerender(<ColorSlider defaultColor={initialColor} onChange={onChange} channel="saturation" />);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '70' } });
    rerender(<ColorSlider defaultColor={initialColor} onChange={onChange} channel="value" />);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '50' } });
    expect(onChange.mock.calls.map(([, data]) => data.color)).toEqual([
      { ...initialColor, h: 120 },
      { ...initialColor, h: 120, s: 0.7 },
      { ...initialColor, h: 120, s: 0.7, v: 0.5 },
    ]);
  });

  it.each([
    ['saturation', 0.4, 0.8, 'rgb(204, 204, 204)', 'rgb(0, 0, 204)'],
    ['saturation', 0, 0.8, 'rgb(204, 204, 204)', 'rgb(0, 0, 204)'],
    ['saturation', 1, 0.8, 'rgb(204, 204, 204)', 'rgb(0, 0, 204)'],
    ['saturation', 0.4, 0, 'rgb(0, 0, 0)', 'rgb(0, 0, 0)'],
    ['saturation', 0.4, 1, 'rgb(255, 255, 255)', 'rgb(0, 0, 255)'],
    ['value', 0.4, 0, 'rgb(0, 0, 0)', 'rgb(153, 153, 255)'],
    ['value', 0.4, 1, 'rgb(0, 0, 0)', 'rgb(153, 153, 255)'],
    ['value', 0, 0.8, 'rgb(0, 0, 0)', 'rgb(255, 255, 255)'],
    ['value', 1, 0.8, 'rgb(0, 0, 0)', 'rgb(0, 0, 255)'],
  ] as const)('exposes opaque %s endpoints at saturation %s and value %s', (channel, s, v, low, high) => {
    const { container } = render(<ColorSlider channel={channel} defaultColor={{ ...initialColor, s, v }} />);
    const root = container.firstElementChild as HTMLElement;
    expectColor(root, colorSliderCSSVars.railColorLowVar, low);
    expectColor(root, colorSliderCSSVars.railColorVar, high);
  });

  it.each(['saturation', 'value'] as ColorChannel[])('paints the resolved uncontrolled %s color', channel => {
    const { container } = render(<ColorSlider channel={channel} defaultColor={initialColor} />);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '50' } });
    const root = container.firstElementChild as HTMLElement;
    expectColor(
      root,
      colorSliderCSSVars.thumbColorVar,
      channel === 'saturation' ? 'rgba(102, 102, 204, 0.6)' : 'rgba(77, 77, 128, 0.6)',
    );
  });
});

describe('AlphaSlider transparency and direction', () => {
  it('treats a color without alpha as controlled and opaque', () => {
    const onChange = jest.fn();
    render(<AlphaSlider color={{ h: 240, s: 0.4, v: 0.8 }} onChange={onChange} />);
    const input = screen.getByRole('slider');
    fireEvent.change(input, { target: { value: '25' } });
    expect(input).toHaveValue('100');
    expect(onChange.mock.lastCall[1].color).toEqual({ h: 240, s: 0.4, v: 0.8, a: 0.25 });
  });

  it.each([false, true])('updates input, progress and alpha paint with transparency=%s', transparency => {
    const onChange = jest.fn();
    render(<AlphaSlider defaultColor={initialColor} onChange={onChange} transparency={transparency} />);
    const input = screen.getByRole('slider');
    const root = input.parentElement!;
    for (const value of [0, 100, 25, 0]) {
      fireEvent.change(input, { target: { value: String(value) } });
      const alpha = (transparency ? 100 - value : value) / 100;
      expect(onChange.mock.lastCall[1].color).toEqual({ ...initialColor, a: alpha });
      expect(input).toHaveValue(String(value));
      expect(root.style.getPropertyValue(alphaSliderCSSVars.sliderProgressVar)).toBe(`${value}%`);
      expectColor(
        root,
        alphaSliderCSSVars.thumbColorVar,
        alpha === 1 ? 'rgb(122, 122, 204)' : `rgba(122, 122, 204, ${alpha})`,
      );
    }
  });

  it('preserves the bare opaque black default and reports black HSV when edited', () => {
    const onChange = jest.fn();
    render(<AlphaSlider onChange={onChange} />);
    const input = screen.getByRole('slider');
    const root = input.parentElement!;
    expect(input).toHaveValue('100');
    expectColor(root, alphaSliderCSSVars.railColorVar, 'rgb(0, 0, 0)');
    expectColor(root, alphaSliderCSSVars.thumbColorVar, 'rgb(0, 0, 0)');
    fireEvent.change(input, { target: { value: '25' } });
    expect(onChange.mock.lastCall[1].color).toEqual({ h: 0, s: 0, v: 0, a: 0.25 });
    expectColor(root, alphaSliderCSSVars.thumbColorVar, 'rgba(0, 0, 0, 0.25)');
  });

  it('updates transparency interpretation without changing the stored alpha', () => {
    const { rerender } = render(<AlphaSlider defaultColor={initialColor} />);
    expect(screen.getByRole('slider')).toHaveValue('60');
    rerender(<AlphaSlider defaultColor={initialColor} transparency />);
    expect(screen.getByRole('slider')).toHaveValue('40');
    rerender(<AlphaSlider defaultColor={initialColor} />);
    expect(screen.getByRole('slider')).toHaveValue('60');
  });

  it('preserves slot and primary aria-orientation overrides', () => {
    const { rerender } = render(<AlphaSlider vertical aria-orientation="horizontal" />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-orientation', 'horizontal');
    rerender(<AlphaSlider input={{ 'aria-orientation': 'vertical' }} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-orientation', 'vertical');
  });
});

describe('ColorArea orientation', () => {
  it('defaults the value axis to vertical', () => {
    render(<ColorArea />);
    expect(screen.getAllByRole('slider')[1]).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('preserves caller inputY orientation', () => {
    render(<ColorArea inputY={{ 'aria-orientation': 'horizontal' }} />);
    expect(screen.getAllByRole('slider')[1]).toHaveAttribute('aria-orientation', 'horizontal');
  });
});

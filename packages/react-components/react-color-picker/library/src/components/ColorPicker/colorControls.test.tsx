import * as React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { ColorPickerProvider } from '../../contexts/colorPicker';
import { ColorSlider } from '../ColorSlider/ColorSlider';
import { useColorSliderBase_unstable } from '../ColorSlider/useColorSlider';
import { colorSliderCSSVars } from '../ColorSlider/ColorSlider.constants';
import type { ColorChannel } from '../ColorSlider/ColorSlider.types';
import { AlphaSlider } from '../AlphaSlider/AlphaSlider';
import { alphaSliderCSSVars } from '../AlphaSlider/AlphaSlider.constants';
import { ColorArea } from '../ColorArea/ColorArea';

const initialColor = { h: 240, s: 0.4, v: 0.8, a: 0.6 };

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

  it('warns for conflicting controlled and default colors', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      render(<Control color={initialColor} defaultColor={initialColor} />);
      expect(error).toHaveBeenCalledWith(expect.stringContaining('either controlled or uncontrolled'));
    } finally {
      error.mockRestore();
    }
  });

  it('warns on a late controlled color and retains its original uncontrolled mode', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      const { rerender } = render(<Control />);
      rerender(<Control color={initialColor} />);
      expect(error).toHaveBeenCalledWith(expect.stringContaining('an uncontrolled value to be controlled'));
      fireEvent.change(screen.getByRole('slider'), { target: { value: changedValue } });
      expect(screen.getByRole('slider')).toHaveValue(changedValue);
      rerender(<Control />);
      expect(screen.getByRole('slider')).toHaveValue(changedValue);
    } finally {
      error.mockRestore();
    }
  });

  it('warns when a controlled color is removed and retains its original controlled mode', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      const { rerender } = render(<Control color={initialColor} />);
      rerender(<Control />);
      expect(error).toHaveBeenCalledWith(expect.stringContaining('a controlled value to be uncontrolled'));
      const input = screen.getByRole('slider');
      const value = input.getAttribute('value');
      fireEvent.change(input, { target: { value: changedValue } });
      expect(input).toHaveValue(value);
      rerender(<Control color={initialColor} />);
      expect(input).toHaveValue(initialValue);
    } finally {
      error.mockRestore();
    }
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

  // Endpoints are computed in HSV before converting to HSL, including black and grayscale.
  it.each([
    { channel: 'saturation', color: initialColor, low: 'hsla(240, 0%, 80%, 1)', high: 'hsla(240, 100%, 40%, 1)' },
    {
      channel: 'saturation',
      color: { ...initialColor, s: 0 },
      low: 'hsla(240, 0%, 80%, 1)',
      high: 'hsla(240, 100%, 40%, 1)',
    },
    {
      channel: 'saturation',
      color: { ...initialColor, s: 1 },
      low: 'hsla(240, 0%, 80%, 1)',
      high: 'hsla(240, 100%, 40%, 1)',
    },
    {
      channel: 'saturation',
      color: { ...initialColor, v: 0 },
      low: 'hsla(240, 0%, 0%, 1)',
      high: 'hsla(240, 0%, 0%, 1)',
    },
    {
      channel: 'saturation',
      color: { ...initialColor, v: 1 },
      low: 'hsla(240, 0%, 100%, 1)',
      high: 'hsla(240, 100%, 50%, 1)',
    },
    { channel: 'value', color: initialColor, low: 'hsla(240, 0%, 0%, 1)', high: 'hsla(240, 100%, 80%, 1)' },
    {
      channel: 'value',
      color: { ...initialColor, v: 0 },
      low: 'hsla(240, 0%, 0%, 1)',
      high: 'hsla(240, 100%, 80%, 1)',
    },
    {
      channel: 'value',
      color: { ...initialColor, v: 1 },
      low: 'hsla(240, 0%, 0%, 1)',
      high: 'hsla(240, 100%, 80%, 1)',
    },
    { channel: 'value', color: { ...initialColor, s: 0 }, low: 'hsla(240, 0%, 0%, 1)', high: 'hsla(240, 0%, 100%, 1)' },
    {
      channel: 'value',
      color: { ...initialColor, s: 1 },
      low: 'hsla(240, 0%, 0%, 1)',
      high: 'hsla(240, 100%, 50%, 1)',
    },
  ] as const)('exposes the $channel endpoints for $color', ({ channel, color, low, high }) => {
    const { result } = renderHook(() => useColorSliderBase_unstable({ channel, defaultColor: color }, null));
    expect(result.current.root.style).toMatchObject({
      [colorSliderCSSVars.railColorVar]: high,
      [colorSliderCSSVars.railColorLowVar]: low,
    });
  });

  it.each(['saturation', 'value'] as ColorChannel[])('paints the resolved uncontrolled %s color', channel => {
    const { container } = render(<ColorSlider channel={channel} defaultColor={initialColor} />);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '50' } });
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue(colorSliderCSSVars.thumbColorVar)).toBe(
      channel === 'saturation' ? 'hsla(240, 50%, 60%, 0.6)' : 'hsla(240, 25%, 40%, 0.6)',
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

  it.each([
    { dir: 'ltr', vertical: false, transparency: false, direction: '90deg' },
    { dir: 'ltr', vertical: false, transparency: true, direction: '-90deg' },
    { dir: 'rtl', vertical: false, transparency: false, direction: '-90deg' },
    { dir: 'rtl', vertical: false, transparency: true, direction: '90deg' },
    { dir: 'ltr', vertical: true, transparency: false, direction: '0deg' },
    { dir: 'ltr', vertical: true, transparency: true, direction: '180deg' },
    { dir: 'rtl', vertical: true, transparency: false, direction: '0deg' },
    { dir: 'rtl', vertical: true, transparency: true, direction: '180deg' },
  ] as const)(
    'aligns input, thumb and ramp for $dir/$vertical/$transparency',
    ({ dir, vertical, transparency, direction }) => {
      const onChange = jest.fn();
      const { container } = render(
        <FluentProvider dir={dir} theme={webLightTheme}>
          <AlphaSlider
            defaultColor={initialColor}
            onChange={onChange}
            vertical={vertical}
            transparency={transparency}
          />
        </FluentProvider>,
      );
      const input = screen.getByRole('slider');
      const root = input.parentElement!;
      const initialThumbColor = root.style.getPropertyValue(alphaSliderCSSVars.thumbColorVar);
      expect(root.style.getPropertyValue(alphaSliderCSSVars.sliderDirectionVar)).toBe(direction);
      expect(input).toHaveAttribute('aria-orientation', vertical ? 'vertical' : 'horizontal');
      for (const value of [0, 100, 25, 0]) {
        fireEvent.change(input, { target: { value: String(value) } });
        const alpha = (transparency ? 100 - value : value) / 100;
        expect(onChange.mock.lastCall[1].color).toEqual({ ...initialColor, a: alpha });
        expect(input).toHaveValue(String(value));
        expect(root.style.getPropertyValue(alphaSliderCSSVars.sliderProgressVar)).toBe(`${value}%`);
        expect(root.style.getPropertyValue(alphaSliderCSSVars.thumbColorVar)).toBe(
          initialThumbColor.replace(/, [^,]+\)$/, `, ${alpha})`),
        );
      }
      expect(container.querySelector('.fui-AlphaSlider__rail')).toBeInTheDocument();
    },
  );

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

describe('ColorArea shared color and orientation', () => {
  it('preserves an uncontrolled color across edits to both inputs', () => {
    const onChange = jest.fn();
    render(<ColorArea defaultColor={initialColor} onChange={onChange} />);
    const [inputX, inputY] = screen.getAllByRole('slider');
    fireEvent.change(inputX, { target: { value: '70' } });
    fireEvent.change(inputY, { target: { value: '50' } });
    expect(onChange.mock.lastCall[1].color).toEqual({ ...initialColor, s: 0.7, v: 0.5 });
    expect(inputX).toHaveValue('70');
    expect(inputY).toHaveValue('50');
    expect(inputY).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('preserves caller inputY orientation', () => {
    render(<ColorArea inputY={{ 'aria-orientation': 'horizontal' }} />);
    expect(screen.getAllByRole('slider')[1]).toHaveAttribute('aria-orientation', 'horizontal');
  });
});

import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Slider, sliderClassNames, sliderCSSVars } from './index';

describe('Slider', () => {
  it('renders visual defaults and stable class names', () => {
    const { getByRole } = render(<Slider />);
    const input = getByRole('slider');
    const root = input.parentElement;

    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root).toHaveClass(sliderClassNames.root);
    expect(root?.querySelector(`.${sliderClassNames.rail}`)).toBeInTheDocument();
    expect(root?.querySelector(`.${sliderClassNames.thumb}`)).toBeInTheDocument();
    expect(input).toHaveClass(sliderClassNames.input);
  });

  it('maps size, orientation, and disabled state', () => {
    const { getByRole } = render(<Slider disabled size="small" vertical />);
    const input = getByRole('slider');
    const root = input.parentElement;

    expect(root).toHaveAttribute('data-size', 'small');
    expect(root).toHaveAttribute('data-disabled');
    expect(root).toHaveAttribute('data-vertical');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('orient', 'vertical');
  });

  it('composes headless value behavior and preserves a consumer class', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Slider className="consumer-class" defaultValue={20} onChange={onChange} />);
    const input = getByRole('slider');

    expect(input).toHaveValue('20');
    expect(input.parentElement).toHaveClass('consumer-class');

    fireEvent.change(input, { target: { value: '40' } });
    expect(input).toHaveValue('40');
    expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 40 });
  });

  it('exports the CSS custom properties used to customize Slider', () => {
    expect(sliderCSSVars).toEqual({
      sliderDirectionVar: '--fui-Slider--direction',
      sliderInnerThumbRadiusVar: '--fui-Slider__inner-thumb--radius',
      sliderProgressVar: '--fui-Slider--progress',
      sliderProgressColorVar: '--fui-Slider__progress--color',
      sliderRailSizeVar: '--fui-Slider__rail--size',
      sliderRailColorVar: '--fui-Slider__rail--color',
      sliderStepsPercentVar: '--fui-Slider--steps-percent',
      sliderThumbColorVar: '--fui-Slider__thumb--color',
      sliderThumbSizeVar: '--fui-Slider__thumb--size',
    });
  });
});

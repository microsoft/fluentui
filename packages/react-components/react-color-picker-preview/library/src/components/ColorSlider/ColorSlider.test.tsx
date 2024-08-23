import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ColorSlider } from './ColorSlider';

describe('ColorSlider', () => {
  isConformant({
    Component: ColorSlider,
    displayName: 'ColorSlider',
    primarySlot: 'input',
  });

  it('renders a default state', () => {
    const result = render(<ColorSlider />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-ColorSlider"
          style="--fui-Slider--direction: -90deg; --fui-Slider--progress: 0%; --fui-Slider__thumb--color: hsl(0, 100%, 50%);"
        >
          <input
            class="fui-ColorSlider__input"
            id="slider-9"
            type="range"
            value="0"
          />
          <div
            class="fui-ColorSlider__rail"
          />
          <div
            class="fui-ColorSlider__thumb"
          />
        </div>
      </div>
    `);
  });

  it('renders horizontal ColorSlider correctly', () => {
    const { container } = render(<ColorSlider defaultValue={50} min={0} max={100} />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-ColorSlider"
          style="--fui-Slider--direction: -90deg; --fui-Slider--progress: 50%; --fui-Slider__thumb--color: hsl(50, 100%, 50%);"
        >
          <input
            class="fui-ColorSlider__input"
            id="slider-10"
            max="100"
            min="0"
            type="range"
            value="50"
          />
          <div
            class="fui-ColorSlider__rail"
          />
          <div
            class="fui-ColorSlider__thumb"
          />
        </div>
      </div>
    `);
  });

  it('renders vertical ColorSlider correctly', () => {
    const { container } = render(<ColorSlider defaultValue={50} vertical min={0} max={100} />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-ColorSlider"
          style="--fui-Slider--direction: 180deg; --fui-Slider--progress: 50%; --fui-Slider__thumb--color: hsl(50, 100%, 50%);"
        >
          <input
            class="fui-ColorSlider__input"
            id="slider-11"
            max="100"
            min="0"
            type="range"
            value="50"
          />
          <div
            class="fui-ColorSlider__rail"
          />
          <div
            class="fui-ColorSlider__thumb"
          />
        </div>
      </div>
    `);
  });

  it('handles id prop', () => {
    const testId = 'test-id';
    render(<ColorSlider id={testId} />);
    expect(screen.getByRole('slider').getAttribute('id')).toEqual(testId);
  });

  it('applies the defaultValue prop', () => {
    render(<ColorSlider defaultValue={10} />);
    expect(screen.getByRole('slider').getAttribute('value')).toEqual('10');
  });

  it('applies the value prop', () => {
    render(<ColorSlider value={10} />);
    expect(screen.getByRole('slider').getAttribute('value')).toEqual('10');
  });

  it('applies the correct value prop when min is set', () => {
    render(<ColorSlider value={0} min={20} />);
    expect(screen.getByRole('slider').getAttribute('value')).toEqual('20');
  });

  it('applies the correct value prop when max is set', () => {
    render(<ColorSlider value={30} max={20} />);
    expect(screen.getByRole('slider').getAttribute('value')).toEqual('20');
  });

  it('clamps an initial defaultValue that is out of bounds', () => {
    render(<ColorSlider defaultValue={-10} min={0} max={100} />);
    expect(screen.getByRole('slider').getAttribute('value')).toEqual('0');
  });

  it('applies focus to the hidden input', () => {
    render(<ColorSlider defaultValue={3} />);
    const input = screen.getByRole('slider');

    input.focus();
    expect(document.activeElement).toEqual(input);
  });

  it('applies aria-valuetext', () => {
    const testValue = 'test-value';

    render(<ColorSlider aria-label={testValue} />);

    expect(screen.getByRole('slider').getAttribute('aria-label')).toEqual(testValue);
  });
});

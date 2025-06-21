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
          role="group"
          style="--fui-Slider--direction: -90deg; --fui-Slider--progress: 0%; --fui-Slider__thumb--color: hsl(0, 100%, 50%); --fui-Slider__rail--color: hsl(0 0%, 0%);"
        >
          <input
            aria-orientation="horizontal"
            class="fui-ColorSlider__input"
            id="slider-r8"
            max="360"
            min="0"
            tabindex="0"
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

  it('handles id prop', () => {
    const testId = 'test-id';
    render(<ColorSlider id={testId} />);
    expect(screen.getByRole('slider').getAttribute('id')).toEqual(testId);
  });

  it('applies the color prop', () => {
    render(<ColorSlider color={{ h: 324, s: 1, v: 1 }} />);
    expect(screen.getByRole('slider').getAttribute('value')).toEqual('324');
  });

  it('applies focus to the hidden input', () => {
    render(<ColorSlider />);
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

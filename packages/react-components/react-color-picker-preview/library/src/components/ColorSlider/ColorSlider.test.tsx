import * as React from 'react';
import { render } from '@testing-library/react';
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
});

import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ColorArea } from './ColorArea';

describe('ColorArea', () => {
  isConformant({
    Component: ColorArea,
    displayName: 'ColorArea',
  });

  it('renders a default state', () => {
    const result = render(<ColorArea color="red" />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-ColorArea"
          style="--fui-AreaX--progress: undefined%; --fui-AreaY--progress: undefined%; --fui-Area__thumb--color: transparent; --fui-Area--main-color: hsl(undefined, 100%, 50%);"
        >
          <input
            aria-label="Color picker"
            aria-valuetext="Saturation: undefined%, Value: undefined%"
            class="fui-ColorArea__inputX"
            id="sliderX-15"
            type="range"
            value=""
          />
          <input
            class="fui-ColorArea__inputY"
            id="sliderY-16"
            type="range"
            value=""
          />
          <div
            class="fui-ColorArea__thumb"
          />
        </div>
      </div>
    `);
  });
});

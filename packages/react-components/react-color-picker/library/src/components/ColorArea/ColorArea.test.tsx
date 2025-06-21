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
    const result = render(<ColorArea color={{ h: 324, s: 1, v: 0.5, a: 1 }} />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-ColorArea"
          style="--fui-AreaX--progress: 100%; --fui-AreaY--progress: 50%; --fui-Area__thumb--color: rgb(128, 0, 76); --fui-Area--main-color: hsl(324, 100%, 50%);"
        >
          <div
            class="fui-ColorArea__thumb"
          >
            <input
              class="fui-ColorArea__inputX"
              id="sliderX-re"
              type="range"
              value="100"
            />
            <input
              class="fui-ColorArea__inputY"
              id="sliderY-rf"
              tabindex="-1"
              type="range"
              value="50"
            />
          </div>
        </div>
      </div>
    `);
  });
});

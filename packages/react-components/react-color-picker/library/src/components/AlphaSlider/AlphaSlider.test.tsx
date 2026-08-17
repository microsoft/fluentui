import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { AlphaSlider } from './AlphaSlider';
import { alphaSliderClassNames } from './useAlphaSliderStyles.styles';
import { colorSliderClassNames } from '../ColorSlider/useColorSliderStyles.styles';

describe('AlphaSlider', () => {
  isConformant({
    Component: AlphaSlider,
    displayName: 'AlphaSlider',
    primarySlot: 'input',
    testOptions: {
      // `useAlphaSliderStyles_unstable` renders ColorSlider's slots by calling
      // `useColorSliderStyles_unstable(state)`, so the root carries BOTH markers —
      // the same DOM shape as the pre-D16 `fui-ColorSlider fui-AlphaSlider` pair.
      // `component-has-group-marker` asserts an exact set, so the whole set is declared
      // (DECISIONS.md D16.3).
      'has-group-marker': {
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated for STYLING (DECISIONS.md D16.5); reading the identity constant is the point.
        markers: [alphaSliderClassNames.root, colorSliderClassNames.root],
      },
    },
  });

  it('renders a default state', () => {
    const result = render(<AlphaSlider color={{ h: 0, s: 1, v: 1 }} />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="group/fui-color-slider group/fui-alpha-slider"
          data-orientation="horizontal"
          style="--fui-AlphaSlider--direction: 90deg; --fui-AlphaSlider--progress: 100%; --fui-AlphaSlider__thumb--color: hsla(0, 100%, 50%, 1); --fui-AlphaSlider__rail--color: hsl(0, 100%, 50%);"
        >
          <input
            class=""
            id="slider-_r_a_"
            type="range"
            value="100"
          />
          <div
            class=""
          />
          <div
            class=""
          />
        </div>
      </div>
    `);
  });
});

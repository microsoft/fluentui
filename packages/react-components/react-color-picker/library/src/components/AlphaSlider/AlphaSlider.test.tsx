import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { AlphaSlider } from './AlphaSlider';
import { alphaSliderClassNames } from './useAlphaSliderStyles.styles';

describe('AlphaSlider', () => {
  isConformant({
    Component: AlphaSlider,
    displayName: 'AlphaSlider',
    primarySlot: 'input',
    testOptions: {
      'has-static-classnames': [
        {
          props: {},
          expectedClassNames: {
            root: alphaSliderClassNames.root,
            thumb: alphaSliderClassNames.thumb,
            rail: alphaSliderClassNames.rail,
            input: alphaSliderClassNames.input,
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<AlphaSlider color={{ h: 0, s: 1, v: 1 }} />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-ColorSlider fui-AlphaSlider"
          style="--fui-AlphaSlider--direction: 90deg; --fui-AlphaSlider--progress: 100%; --fui-AlphaSlider__thumb--color: hsla(0 100%, 50%, 1); --fui-AlphaSlider__rail--color: hsl(0 100%, 50%);"
        >
          <input
            class="fui-ColorSlider__input fui-AlphaSlider__input"
            id="slider-r8"
            type="range"
            value="100"
          />
          <div
            class="fui-ColorSlider__rail fui-AlphaSlider__rail"
          />
          <div
            class="fui-ColorSlider__thumb fui-AlphaSlider__thumb fui-AlphaSlider__thumb"
          />
        </div>
      </div>
    `);
  });
});

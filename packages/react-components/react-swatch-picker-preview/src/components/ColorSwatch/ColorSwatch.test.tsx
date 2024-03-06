import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ColorSwatch } from './ColorSwatch';
import { colorSwatchClassNames } from './useColorSwatchStyles.styles';

describe('ColorSwatch', () => {
  isConformant({
    Component: ColorSwatch,
    displayName: 'ColorSwatch',
    primarySlot: 'button',
    testOptions: {
      'has-static-classnames': [
        {
          props: {},
          expectedClassNames: {
            button: colorSwatchClassNames.button,
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<ColorSwatch color="#f09" value="#f09" />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          aria-checked="false"
          class="fui-ColorSwatch"
          role="radio"
          style="--fui-SwatchPicker--color: #f09;"
        >
          <button
            class="fui-ColorSwatch__button"
            type="button"
          />
        </div>
      </div>
    `);
  });
});

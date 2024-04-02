import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ColorSwatch } from './ColorSwatch';
import { colorSwatchClassNames } from './useColorSwatchStyles.styles';

describe('ColorSwatch', () => {
  isConformant({
    Component: ColorSwatch,
    displayName: 'ColorSwatch',
    testOptions: {
      'has-static-classnames': [
        {
          props: {},
          expectedClassNames: {
            root: colorSwatchClassNames.root,
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<ColorSwatch color="#f09" value="#f09" />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          aria-checked="false"
          class="fui-ColorSwatch"
          role="radio"
          style="--fui-SwatchPicker--color: #f09;"
          type="button"
        />
      </div>
    `);
  });
});

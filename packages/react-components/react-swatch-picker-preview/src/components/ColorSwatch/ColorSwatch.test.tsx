import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ColorSwatch } from './ColorSwatch';

describe('ColorSwatch', () => {
  isConformant({
    Component: ColorSwatch,
    displayName: 'ColorSwatch',
  });

  it('renders a default state', () => {
    const result = render(<ColorSwatch color="#f09" value="#f09" />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          aria-checked="false"
          class="fui-ColorSwatch"
          role="radio"
          style="--fui-SwatchPicker--color: #f09; --fui-SwatchPicker--contrastColor: transparent;"
          type="button"
          value="#f09"
        />
      </div>
    `);
  });
});

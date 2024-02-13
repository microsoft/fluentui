import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { SwatchPicker } from './SwatchPicker';

describe('SwatchPicker', () => {
  isConformant({
    Component: SwatchPicker,
    displayName: 'SwatchPicker',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<SwatchPicker />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-SwatchPicker"
          data-tabster="{\\"mover\\":{\\"cyclic\\":true,\\"direction\\":0,\\"memorizeCurrent\\":true}}"
          role="radiogroup"
          style="--fui-SwatchPicker--columnCount: 3; --fui-SwatchPicker--cellSize: 28px; --fui-SwatchPicker--gridGap: 4px;"
        />
      </div>
    `);
  });
});

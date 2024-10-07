import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ColorArea } from './ColorArea';

describe('ColorArea', () => {
  isConformant({
    Component: ColorArea,
    displayName: 'ColorArea',
    disabledTests: ['component-handles-ref', 'component-has-root-ref'],
  });

  it('renders a default state', () => {
    const result = render(<ColorArea color="red" />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-ColorArea"
          style="--fui-AreaX--progress: 100%; --fui-AreaY--progress: 100%; --fui-Area__thumb--color: transparent; --fui-Area--main-color: red;"
        >
          <div
            class="fui-ColorArea__thumb"
          />
        </div>
      </div>
    `);
  });
});

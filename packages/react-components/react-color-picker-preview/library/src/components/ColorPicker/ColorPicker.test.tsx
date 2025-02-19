import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ColorPicker } from './ColorPicker';

describe('ColorPicker', () => {
  isConformant({
    Component: ColorPicker,
    displayName: 'ColorPicker',
  });

  it('renders a default state', () => {
    const result = render(<ColorPicker color={{ h: 0, s: 1, v: 1 }} />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-ColorPicker"
        />
      </div>
    `);
  });
});

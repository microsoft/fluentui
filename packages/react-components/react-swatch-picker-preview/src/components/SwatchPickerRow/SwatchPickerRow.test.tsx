import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { SwatchPickerRow } from './SwatchPickerRow';

describe('SwatchPickerRow', () => {
  isConformant({
    Component: SwatchPickerRow,
    displayName: 'SwatchPickerRow',
  });

  it('renders a default state', () => {
    const result = render(<SwatchPickerRow>Default SwatchPickerRow</SwatchPickerRow>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-SwatchPickerRow"
          role="row"
        >
          Default SwatchPickerRow
        </div>
      </div>
    `);
  });
});

import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { SwatchPickerRow } from './SwatchPickerRow';

describe('SwatchPickerRow', () => {
  isConformant({
    Component: SwatchPickerRow,
    displayName: 'SwatchPickerRow',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively (DECISIONS.md D2/D9); `component-has-group-marker` (a default test)
    // asserts the marker contract that replaced the BEM statics (D16.1 / D16.6).
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const result = render(<SwatchPickerRow>Default SwatchPickerRow</SwatchPickerRow>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="group/fui-swatch-picker-row"
          role="row"
        >
          Default SwatchPickerRow
        </div>
      </div>
    `);
  });
});

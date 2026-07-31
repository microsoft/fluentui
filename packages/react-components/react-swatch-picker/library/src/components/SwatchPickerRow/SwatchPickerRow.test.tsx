import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { SwatchPickerRow } from './SwatchPickerRow';

describe('SwatchPickerRow', () => {
  isConformant({
    Component: SwatchPickerRow,
    displayName: 'SwatchPickerRow',
    // Griffel → Tailwind + CSS Modules migration — see ColorSwatch.test.tsx for the full
    // rationale. `make-styles-overrides-win` can no longer observe a clsx-composed hook;
    // `classname-overrides-win` is its cascade-native replacement (DECISIONS.md D9), and
    // `component-has-group-marker` (a default test) replaces the BEM-static assertion
    // (D16.1 / D16.6).
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

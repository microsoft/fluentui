import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { EmptySwatch } from './EmptySwatch';

describe('EmptySwatch', () => {
  isConformant({
    Component: EmptySwatch,
    displayName: 'EmptySwatch',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively (DECISIONS.md D2/D9); `component-has-group-marker` (a default test)
    // asserts the marker contract that replaced the BEM statics (D16.1 / D16.6).
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const result = render(<EmptySwatch />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          aria-checked="false"
          class="group/fui-empty-swatch"
          data-size="medium"
          role="radio"
        />
      </div>
    `);
  });
});

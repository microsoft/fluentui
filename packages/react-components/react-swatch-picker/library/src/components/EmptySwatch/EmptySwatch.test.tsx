import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { EmptySwatch } from './EmptySwatch';

describe('EmptySwatch', () => {
  isConformant({
    Component: EmptySwatch,
    displayName: 'EmptySwatch',
    // Griffel → Tailwind + CSS Modules migration — see ColorSwatch.test.tsx for the full
    // rationale. `make-styles-overrides-win` can no longer observe a clsx-composed hook;
    // `classname-overrides-win` is its cascade-native replacement (DECISIONS.md D9), and
    // `component-has-group-marker` (a default test) replaces the BEM-static assertion
    // (D16.1 / D16.6).
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
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

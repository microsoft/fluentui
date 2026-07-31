import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { DrawerHeaderTitle } from './DrawerHeaderTitle';
import { isConformant } from '../../testing/isConformant';
import type { DrawerHeaderTitleProps } from './DrawerHeaderTitle.types';

describe('DrawerHeaderTitle', () => {
  isConformant<DrawerHeaderTitleProps>({
    Component: DrawerHeaderTitle,
    displayName: 'DrawerHeaderTitle',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` was already disabled here; its
    // `has-static-classnames` testOptions entry — which rendered the component with
    // `action: 'Action'` so the `heading` and `action` statics appeared in the DOM — goes
    // with it now, because there are no sub-slot statics left to find (DECISIONS.md D16.1)
    // and `drawerHeaderTitleClassNames` is `{ root: <marker> }` (D16.5). The replacement is
    // `component-has-group-marker`, now a default test.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  it('renders a default state', () => {
    const result = render(<DrawerHeaderTitle>Default DrawerHeaderTitle</DrawerHeaderTitle>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="group/fui-drawer-header-title"
        >
          <h2
            class="group/fui-dialog-title"
          >
            Default DrawerHeaderTitle
          </h2>
        </div>
      </div>
    `);
  });

  it('renders action', () => {
    const result = render(<DrawerHeaderTitle action={'Test'}>Default DrawerHeaderTitle</DrawerHeaderTitle>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="group/fui-drawer-header-title"
        >
          <h2
            class="group/fui-dialog-title"
          >
            Default DrawerHeaderTitle
          </h2>
          <div
            class=""
          >
            Test
          </div>
        </div>
      </div>
    `);
  });
});

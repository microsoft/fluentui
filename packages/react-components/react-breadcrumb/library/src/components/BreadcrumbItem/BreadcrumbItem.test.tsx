import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { BreadcrumbItem } from './BreadcrumbItem';
import type { BreadcrumbItemProps } from './BreadcrumbItem.types';
import { isConformant } from '../../testing/isConformant';

describe('BreadcrumbItem', () => {
  isConformant({
    Component: BreadcrumbItem as React.FunctionComponent<BreadcrumbItemProps>,
    displayName: 'BreadcrumbItem',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>` format,
    // which the D16 statics-removal sweep retired for converted packages:
    // `breadcrumbItemClassNames.root` is now the group marker (DECISIONS.md D16.5/D16.6).
    // Its `has-static-classnames` testOptions went with it. `component-has-group-marker`
    // (now a default test) is the replacement — it asserts the marker is stamped AND never lands at
    // `classList[0]`, the machine-checkable form of the D15.1/D16.2 invariant.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const result = render(<BreadcrumbItem>Default BreadcrumbItem</BreadcrumbItem>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <li
          class="group/fui-breadcrumb-item"
        >
          Default BreadcrumbItem
        </li>
      </div>
    `);
  });
});

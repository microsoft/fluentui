import * as React from 'react';
import { MenuDivider } from './MenuDivider';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';

describe('MenuDivider', () => {
  isConformant({
    Component: MenuDivider,
    displayName: 'MenuDivider',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the `fui-<Component>__<slot>` BEM
    // format DECISIONS.md D16.1 removed. `component-has-group-marker` (a default test since
    // D16.6) replaces it: it asserts the group marker IS stamped and is never
    // `classList[0]` (D16.2). The `has-static-classnames` testOptions that fed the deleted
    // test went with it.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  /**
   * Note: see more visual regression tests for MenuDivider in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<MenuDivider>Default MenuDivider</MenuDivider>);
    expect(container.firstChild).toMatchSnapshot();
  });
});

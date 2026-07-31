import * as React from 'react';
import { MenuGrid } from './MenuGrid';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';

describe('MenuGrid', () => {
  isConformant({
    Component: MenuGrid,
    displayName: 'MenuGrid',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the `fui-<Component>__<slot>` BEM
    // format DECISIONS.md D16.1 removed; `component-has-group-marker` (a default test since
    // D16.6) replaces it.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  /**
   * Note: see more visual regression tests for MenuGrid in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<MenuGrid>Default MenuGrid</MenuGrid>);
    expect(container.firstChild).toMatchSnapshot();
  });
});

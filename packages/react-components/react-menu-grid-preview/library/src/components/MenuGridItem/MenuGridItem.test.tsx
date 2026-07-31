import * as React from 'react';
import { MenuGridItem } from './MenuGridItem';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';

describe('MenuGridItem', () => {
  isConformant({
    Component: MenuGridItem,
    displayName: 'MenuGridItem',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // See MenuGrid.test.tsx for the rationale behind this pair of adjustments. The
    // `has-static-classnames` testOptions that fed the deleted BEM test went with it
    // (DECISIONS.md D16.1).
    disabledTests: ['component-has-static-classnames-object'],
    testOptions: {
      // This root IS a MenuGridRow root — `useMenuGridItem_unstable` builds the root slot with
      // `elementType: MenuGridRow`, so `useMenuGridRowStyles_unstable` stamps its marker on
      // the same element — and it therefore legitimately carries both markers below
      // (DECISIONS.md D16.3). Declaring the whole set keeps `component-has-group-marker`
      // running as an exact set comparison, so an undeclared marker still fails, and its
      // `classList[0]` half — the D16.2 invariant nwsapi's jsdom `:scope` polyfill depends on
      // — is asserted here.
      'has-group-marker': {
        markers: ['group/fui-menu-grid-item', 'group/fui-menu-grid-row'],
      },
    },
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  /**
   * Note: see more visual regression tests for MenuGridItem in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<MenuGridItem>Default MenuGridItem</MenuGridItem>);
    expect(container.firstChild).toMatchSnapshot();
  });
});

import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { ToolbarDivider } from './ToolbarDivider';
import { isConformant } from '../../testing/isConformant';

describe('ToolbarDivider', () => {
  isConformant({
    Component: ToolbarDivider,
    displayName: 'ToolbarDivider',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // Neither this component's styles hook nor @fluentui/react-divider (converted first,
    // as the pilot) calls mergeClasses any more, so `make-styles-overrides-win` has
    // nothing to observe — it was already failing on this component before this
    // conversion, from the react-divider side alone. `classname-overrides-win` is its
    // cascade-native replacement (DECISIONS.md D9).
    disabledTests: ['component-has-static-classnames-object'],
    testOptions: {
      // renders react-divider’s Divider, whose hook stamps its marker on this same element, so this root
      // legitimately carries every marker below (DECISIONS.md D16.3). Declaring the whole set
      // keeps `component-has-group-marker` running: it is an exact set comparison, so an
      // undeclared marker still fails, and its `classList[0]` half — the D16.2 invariant that
      // nwsapi's jsdom `:scope` polyfill depends on — is asserted here rather than locally.
      'has-group-marker': {
        markers: ['group/fui-divider', 'group/fui-toolbar-divider'],
      },
    },
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ToolbarDivider>Default ToolbarDivider</ToolbarDivider>);
    expect(result.container).toMatchSnapshot();
  });
});

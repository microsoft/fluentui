import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { ToolbarRadioGroup } from './ToolbarRadioGroup';
import { isConformant } from '../../testing/isConformant';
import type { ButtonProps } from '@fluentui/react-button';

describe('ToolbarRadioGroup', () => {
  isConformant({
    Component: ToolbarRadioGroup as React.FunctionComponent<ButtonProps>,
    displayName: 'ToolbarRadioGroup',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // ToolbarRadioGroup renders through `useToolbarGroupStyles_unstable`, which is
    // converted, so it no longer calls mergeClasses either — same swap as ToolbarGroup.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
    testOptions: {
      // ToolbarRadioGroup renders through `useToolbarGroupStyles_unstable` and stamps no
      // marker of its own, so the marker on its root is ToolbarGroup's — not the
      // `group/fui-toolbar-radio-group` the test would derive from `displayName`. Exactly the
      // case the escape hatch exists for (DECISIONS.md D16.2).
      'has-group-marker': { marker: 'group/fui-toolbar-group' },
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ToolbarRadioGroup>Default ToolbarRadioGroup</ToolbarRadioGroup>);
    expect(result.container).toMatchSnapshot();
  });
});

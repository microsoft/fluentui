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
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ToolbarRadioGroup>Default ToolbarRadioGroup</ToolbarRadioGroup>);
    expect(result.container).toMatchSnapshot();
  });
});

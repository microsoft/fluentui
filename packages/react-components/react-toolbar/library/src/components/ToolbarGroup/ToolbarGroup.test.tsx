import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { ToolbarGroup } from './ToolbarGroup';
import { isConformant } from '../../testing/isConformant';
import type { ButtonProps } from '@fluentui/react-button';

describe('ToolbarGroup', () => {
  isConformant({
    Component: ToolbarGroup as React.FunctionComponent<ButtonProps>,
    displayName: 'ToolbarGroup',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // `classname-overrides-win` is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ToolbarGroup>Default ToolbarGroup</ToolbarGroup>);
    expect(result.container).toMatchSnapshot();
  });
});

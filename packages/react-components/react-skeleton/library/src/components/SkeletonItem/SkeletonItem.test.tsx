import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { SkeletonItem } from './SkeletonItem';
import { isConformant } from '../../testing/isConformant';

describe('SkeletonItem', () => {
  isConformant({
    Component: SkeletonItem,
    displayName: 'SkeletonItem',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` is disabled because this package no longer
    // publishes BEM statics (DECISIONS.md D16.1): the test hard-codes the
    // `fui-<Component>` / `fui-<Component>__<slot>` format and asserts those classes are
    // rendered, both of which are exactly what D16 retires. `component-has-group-marker`
    // (now a default test) replaces it — it asserts the group marker IS stamped and, per D16.2, is never
    // `classList[0]`.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<SkeletonItem>Default SkeletonItem</SkeletonItem>);
    expect(result.container).toMatchSnapshot();
  });
});

import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { SkeletonItem } from './SkeletonItem';
import { isConformant } from '../../testing/isConformant';

describe('SkeletonItem', () => {
  isConformant({
    Component: SkeletonItem,
    displayName: 'SkeletonItem',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
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

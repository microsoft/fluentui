import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverBody } from './TeachingPopoverBody';

describe('TeachingPopoverBody', () => {
  isConformant({
    Component: TeachingPopoverBody,
    displayName: 'TeachingPopoverBody',
    requiredProps: { media: <img src={'./test'} /> },
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts it
    // was called with the consumer className last; this component now composes with clsx and
    // never calls mergeClasses, so the test can no longer observe the contract. The guarantee
    // itself is unchanged — clsx puts `state.root.className` last and the `@layer fui.*`
    // sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` is disabled because this package no longer
    // publishes BEM statics (DECISIONS.md D16.1): the test hard-codes the `fui-<Component>`
    // format and asserts those classes are rendered, both of which are exactly what D16
    // retires. `component-has-group-marker` (a default test) replaces it.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TeachingPopoverBody>Default TeachingPopoverBody</TeachingPopoverBody>);
    expect(result.container).toMatchSnapshot();
  });
});

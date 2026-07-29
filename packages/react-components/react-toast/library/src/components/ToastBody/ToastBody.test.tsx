import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { ToastBody } from './ToastBody';
import { isConformant } from '../../testing/isConformant';
import type { ToastBodyProps } from './ToastBody.types';

describe('ToastBody', () => {
  isConformant<ToastBodyProps>({
    Component: ToastBody,
    displayName: 'ToastBody',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-group-marker` runs from the DEFAULT set and needs no `getTargetElement`
    // here: `renderToastBody` puts `root` first in its fragment, so the container's first
    // child is the marker-bearing element.
    disabledTests: ['make-styles-overrides-win'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
    requiredProps: {
      subtitle: 'subtitle',
    },
  });

  it('renders a default state', () => {
    const result = render(<ToastBody>Default ToastBody</ToastBody>);
    expect(result.container).toMatchSnapshot();
  });
});

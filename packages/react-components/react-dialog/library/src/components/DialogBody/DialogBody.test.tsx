import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { DialogBody } from './DialogBody';
import { isConformant } from '../../testing/isConformant';
import type { DialogBodyProps } from './DialogBody.types';

describe('DialogBody', () => {
  isConformant<DialogBodyProps>({
    Component: DialogBody,
    displayName: 'DialogBody',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` is retired by D16.1/D16.6: the statics it
    // asserts are no longer rendered, and `dialogBodyClassNames` is now the retained,
    // marker-valued `{ root: string }` of D16.5. `component-has-group-marker` replaces it —
    // the marker is stamped, and never at `classList[0]` (D15.1 / D16.2).
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DialogBody>Default DialogBody</DialogBody>);
    expect(result.container).toMatchSnapshot();
  });
});

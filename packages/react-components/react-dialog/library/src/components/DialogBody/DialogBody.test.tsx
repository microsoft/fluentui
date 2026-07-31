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
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` is retired by D16.1/D16.6: the statics it
    // asserts are no longer rendered, and `dialogBodyClassNames` is now the retained,
    // marker-valued `{ root: string }` of D16.5. `component-has-group-marker` replaces it —
    // the marker is stamped, and never at `classList[0]` (D15.1 / D16.2).
    disabledTests: ['component-has-static-classnames-object'],
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

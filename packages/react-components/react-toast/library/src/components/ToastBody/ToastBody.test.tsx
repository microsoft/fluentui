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
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-group-marker` runs from the DEFAULT set and needs no `getTargetElement`
    // here: `renderToastBody` puts `root` first in its fragment, so the container's first
    // child is the marker-bearing element.
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

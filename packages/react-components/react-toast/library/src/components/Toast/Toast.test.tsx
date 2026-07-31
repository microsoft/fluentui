import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { Toast } from './Toast';
import { isConformant } from '../../testing/isConformant';

describe('Toast', () => {
  isConformant({
    Component: Toast,
    displayName: 'Toast',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-group-marker` runs from the DEFAULT set: it asserts `group/fui-toast` is
    // stamped and, critically, that it is never `classList[0]` (D15.1 / D16.2).
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const result = render(<Toast>Default Toast</Toast>);
    expect(result.container).toMatchSnapshot();
  });
});

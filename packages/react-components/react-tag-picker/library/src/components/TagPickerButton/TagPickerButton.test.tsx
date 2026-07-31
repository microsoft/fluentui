import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { TagPickerButton } from './TagPickerButton';

describe('TagPickerButton', () => {
  isConformant({
    Component: TagPickerButton,
    displayName: 'TagPickerButton',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // The former `component-has-static-classnames-object` entry is dropped: that test left the
    // default set with DECISIONS.md D16.6 and this package no longer opts into it.
    // `component-has-group-marker` — the contract that DID replace it — now runs by default.
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TagPickerButton>Default PickerButton</TagPickerButton>);
    expect(result.container).toMatchSnapshot();
  });
});

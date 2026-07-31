import * as React from 'react';
import { render } from '@testing-library/react';
import { OptionGroup } from './OptionGroup';
import { isConformant } from '../../testing/isConformant';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';

describe('OptionGroup', () => {
  isConformant({
    Component: OptionGroup,
    displayName: 'OptionGroup',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const result = render(<OptionGroup>Default OptionGroup</OptionGroup>);
    expect(result.container).toMatchSnapshot();
  });

  it('renders with a label', () => {
    const result = render(<OptionGroup label="optgroup label">Default OptionGroup</OptionGroup>);
    expect(result.container).toMatchSnapshot();
  });

  it('sets aria-labelledby to match the label id', () => {
    const { getByText } = render(<OptionGroup label="optgroup label">Default OptionGroup</OptionGroup>);

    const root = getByText('Default OptionGroup');
    const label = getByText('optgroup label');

    expect(root.getAttribute('aria-labelledby')).toEqual(label.id);
  });
});

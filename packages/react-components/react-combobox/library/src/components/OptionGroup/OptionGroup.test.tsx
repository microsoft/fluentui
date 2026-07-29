import * as React from 'react';
import { render } from '@testing-library/react';
import { OptionGroup } from './OptionGroup';
import { isConformant } from '../../testing/isConformant';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';

describe('OptionGroup', () => {
  isConformant({
    Component: OptionGroup,
    displayName: 'OptionGroup',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` can no longer observe the contract — this component
    // composes with clsx and never calls mergeClasses. `classname-overrides-win` is its
    // cascade-native replacement (DECISIONS.md D9). The `has-static-classnames` options are
    // gone with the statics themselves (DECISIONS.md D16.1/D16.5).
    disabledTests: ['make-styles-overrides-win'],
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

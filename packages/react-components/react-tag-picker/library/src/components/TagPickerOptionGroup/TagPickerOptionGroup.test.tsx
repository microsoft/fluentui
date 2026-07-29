import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { TagPickerOptionGroup } from './TagPickerOptionGroup';

describe('TagPickerOptionGroup', () => {
  isConformant({
    Component: TagPickerOptionGroup,
    displayName: 'TagPickerOptionGroup',
    requiredProps: {
      label: 'label',
    },
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind), D9
    // delegation seam. `useTagPickerOptionGroupStyles` calls react-combobox's
    // `useOptionGroupStyles_unstable` FIRST and then wraps the result with its own
    // `mergeClasses`. Now that the delegate composes with clsx, the consumer className is
    // already concatenated into `state.root.className` by the time this package's
    // `mergeClasses` sees it, so `make-styles-overrides-win` — which looks for the class as
    // a standalone ARGUMENT — can no longer observe the contract. The guarantee is unchanged:
    // the consumer className is still last in the emitted string, and unlayered consumer CSS
    // still beats every `@layer fui.*` rule. `classname-overrides-win` is its cascade-native
    // replacement (DECISIONS.md D9). This package is otherwise untouched by the conversion.
    disabledTests: ['make-styles-overrides-win'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TagPickerOptionGroup>Default TagPickerOptionGroup</TagPickerOptionGroup>);
    expect(result.container).toMatchSnapshot();
  });
});

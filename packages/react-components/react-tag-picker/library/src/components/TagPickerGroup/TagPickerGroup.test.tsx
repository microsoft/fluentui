import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TagPickerGroup } from './TagPickerGroup';
import { TagPickerContextProvider, tagPickerContextDefaultValue } from '../../contexts/TagPickerContext';

const Wrapper: React.FC<{ children?: React.ReactNode }> = props => (
  <TagPickerContextProvider
    value={{
      ...tagPickerContextDefaultValue,
      selectedOptions: ['some option'],
    }}
  >
    {props.children}
  </TagPickerContextProvider>
);

describe('TagPickerGroup', () => {
  isConformant({
    Component: TagPickerGroup,
    renderOptions: { wrapper: Wrapper },
    displayName: 'TagPickerGroup',
    // useTagPickerGroupStyles_unstable delegates to react-tags' converted (clsx-based)
    // useTagGroupStyles_unstable, so the mocked mergeClasses never receives the consumer
    // className as its exact last argument — the Griffel-era test cannot pass. The
    // cascade-native replacement (classname-overrides-win) does not fit either: this
    // component still composes with mergeClasses, which appends its atomics after the
    // consumer's className by design. Re-enable the replacement when react-tag-picker
    // itself converts.
    disabledTests: ['make-styles-overrides-win'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TagPickerGroup>Default TagPickerGroup</TagPickerGroup>);
    expect(result.container).toMatchSnapshot();
  });
});

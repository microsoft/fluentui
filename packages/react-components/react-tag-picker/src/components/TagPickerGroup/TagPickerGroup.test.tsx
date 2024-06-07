import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TagPickerGroup } from './TagPickerGroup';
import { TagPickerContextProvider, tagPickerContextDefaultValue } from '../../contexts/TagPickerContext';

const Wrapper: React.FC = props => (
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
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TagPickerGroup>Default TagPickerGroup</TagPickerGroup>);
    expect(result.container).toMatchSnapshot();
  });
});

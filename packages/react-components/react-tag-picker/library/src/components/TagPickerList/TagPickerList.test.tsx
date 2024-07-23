import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TagPickerList } from './TagPickerList';
import { TagPickerContextProvider, tagPickerContextDefaultValue } from '../../contexts/TagPickerContext';

const Wrapper: React.FC = props => (
  <TagPickerContextProvider
    value={{
      ...tagPickerContextDefaultValue,
      open: true,
    }}
  >
    {props.children}
  </TagPickerContextProvider>
);

describe('TagPickerList', () => {
  isConformant({
    Component: TagPickerList,
    displayName: 'TagPickerList',
    renderOptions: { wrapper: Wrapper },
    requiredProps: { children: 'Default TagPickerList' },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TagPickerList>Default TagPickerList</TagPickerList>);
    expect(result.container).toMatchSnapshot();
  });
});

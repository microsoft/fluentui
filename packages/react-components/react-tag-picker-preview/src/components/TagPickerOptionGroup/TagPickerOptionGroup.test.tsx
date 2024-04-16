import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TagPickerOptionGroup } from './TagPickerOptionGroup';

describe('TagPickerOptionGroup', () => {
  isConformant({
    Component: TagPickerOptionGroup,
    displayName: 'TagPickerOptionGroup',
    requiredProps: {
      label: 'label',
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TagPickerOptionGroup>Default TagPickerOptionGroup</TagPickerOptionGroup>);
    expect(result.container).toMatchSnapshot();
  });
});

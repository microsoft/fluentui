import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { PickerTagGroup } from './PickerTagGroup';

describe('PickerTagGroup', () => {
  isConformant({
    Component: PickerTagGroup,
    displayName: 'PickerTagGroup',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<PickerTagGroup>Default PickerTagGroup</PickerTagGroup>);
    expect(result.container).toMatchSnapshot();
  });
});

import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { PickerInput } from './PickerInput';

describe('PickerInput', () => {
  isConformant({
    Component: PickerInput,
    displayName: 'PickerInput',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<PickerInput>Default PickerInput</PickerInput>);
    expect(result.container).toMatchSnapshot();
  });
});

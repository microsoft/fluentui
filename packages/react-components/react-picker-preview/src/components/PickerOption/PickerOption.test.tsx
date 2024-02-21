import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { PickerOption } from './PickerOption';

describe('PickerOption', () => {
  isConformant({
    Component: PickerOption,
    displayName: 'PickerOption',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<PickerOption>Default PickerOption</PickerOption>);
    expect(result.container).toMatchSnapshot();
  });
});

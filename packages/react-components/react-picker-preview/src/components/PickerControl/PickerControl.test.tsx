import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { PickerControl } from './PickerControl';

describe('PickerControl', () => {
  isConformant({
    Component: PickerControl,
    displayName: 'PickerControl',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<PickerControl>Default PickerControl</PickerControl>);
    expect(result.container).toMatchSnapshot();
  });
});

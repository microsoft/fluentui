import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { PickerButton } from './PickerButton';

describe('PickerButton', () => {
  isConformant({
    Component: PickerButton,
    displayName: 'PickerButton',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<PickerButton>Default PickerButton</PickerButton>);
    expect(result.container).toMatchSnapshot();
  });
});

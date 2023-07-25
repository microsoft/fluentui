import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { SwatchImagePickerCell } from './SwatchImagePickerCell';

describe('SwatchImagePickerCell', () => {
  isConformant({
    Component: SwatchImagePickerCell,
    displayName: 'SwatchImagePickerCell',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<SwatchImagePickerCell>Default SwatchImagePickerCell</SwatchImagePickerCell>);
    expect(result.container).toMatchSnapshot();
  });
});

import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { SwatchPicker } from './SwatchPicker';

describe('SwatchPicker', () => {
  isConformant({
    Component: SwatchPicker,
    displayName: 'SwatchPicker',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<SwatchPicker>Default SwatchPicker</SwatchPicker>);
    expect(result.container).toMatchSnapshot();
  });
});

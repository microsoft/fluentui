import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { HueSlider } from './HueSlider';

describe('HueSlider', () => {
  isConformant({
    Component: HueSlider,
    displayName: 'HueSlider',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<HueSlider>Default HueSlider</HueSlider>);
    expect(result.container).toMatchSnapshot();
  });
});

import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { AlphaSlider } from './AlphaSlider';

describe('AlphaSlider', () => {
  isConformant({
    Component: AlphaSlider,
    displayName: 'AlphaSlider',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<AlphaSlider>Default AlphaSlider</AlphaSlider>);
    expect(result.container).toMatchSnapshot();
  });
});

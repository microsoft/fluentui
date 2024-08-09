import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ColorSlider } from './ColorSlider';

describe('ColorSlider', () => {
  isConformant({
    Component: ColorSlider,
    displayName: 'ColorSlider',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ColorSlider>Default ColorSlider</ColorSlider>);
    expect(result.container).toMatchSnapshot();
  });
});

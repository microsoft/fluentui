import * as React from 'react';
import { render } from '@testing-library/react';
import { Slider } from './Slider';
import { isConformant } from '../../common/isConformant';

describe('Slider', () => {
  isConformant({
    Component: Slider,
    displayName: 'Slider',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Slider>Default Slider</Slider>);
    expect(result.container).toMatchSnapshot();
  });
});

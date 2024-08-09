import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { NativeSlider } from './NativeSlider';

describe('NativeSlider', () => {
  isConformant({
    Component: NativeSlider,
    displayName: 'NativeSlider',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<NativeSlider>Default NativeSlider</NativeSlider>);
    expect(result.container).toMatchSnapshot();
  });
});

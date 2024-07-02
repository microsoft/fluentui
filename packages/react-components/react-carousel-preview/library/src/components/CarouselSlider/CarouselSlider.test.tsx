import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselSlider } from './CarouselSlider';
import type { IsConformantOptions } from '@fluentui/react-conformance';

export const getRootElement: IsConformantOptions['getTargetElement'] = (result, attr) => {
  const sliderRoot = result.baseElement.querySelectorAll('.fui-CarouselSlider');
  expect(sliderRoot[0]).not.toBeNull();
  return sliderRoot[0]! as HTMLElement;
};

describe('CarouselSlider', () => {
  isConformant({
    Component: CarouselSlider,
    displayName: 'CarouselSlider',
    // getTargetElement: getRootElement,
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselSlider>Default CarouselSlider</CarouselSlider>);
    expect(result.container).toMatchSnapshot();
  });
});

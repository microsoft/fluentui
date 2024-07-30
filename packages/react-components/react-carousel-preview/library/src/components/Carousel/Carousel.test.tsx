import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Carousel } from './Carousel';

jest.mock('embla-carousel', () => ({
  __esModule: true,
  default: () => ({
    on: jest.fn(),
    off: jest.fn(),
    destroy: jest.fn(),
    slideNodes: jest.fn(),
    slidesInView: jest.fn(),
    scrollTo: jest.fn(),
    reInit: jest.fn(),
    selectedScrollSnap: () => 0,
  }),
}));

describe('Carousel', () => {
  isConformant({
    Component: Carousel,
    displayName: 'Carousel',
    requiredProps: {},
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Carousel defaultValue={'test'}>Default Carousel</Carousel>);
    expect(result.container).toMatchSnapshot();
  });
});

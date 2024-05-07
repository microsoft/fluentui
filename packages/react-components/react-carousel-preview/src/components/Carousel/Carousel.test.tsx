import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Carousel } from './Carousel';

describe('Carousel', () => {
  isConformant({
    Component: Carousel,
    displayName: 'Carousel',
    requiredProps: {
      defaultValue: 'test',
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Carousel defaultValue={'test'}>Default Carousel</Carousel>);
    expect(result.container).toMatchSnapshot();
  });
});

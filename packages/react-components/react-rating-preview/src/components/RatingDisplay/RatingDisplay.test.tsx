import * as React from 'react';
import { render } from '@testing-library/react';
//import { isConformant } from '../../testing/isConformant';
import { RatingDisplay } from './RatingDisplay';

describe('RatingDisplay', () => {
  // isConformant({
  //   Component: RatingDisplay,
  //   displayName: 'RatingDisplay',
  // });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<RatingDisplay>Default RatingDisplay</RatingDisplay>);
    expect(result.container).toMatchSnapshot();
  });
});

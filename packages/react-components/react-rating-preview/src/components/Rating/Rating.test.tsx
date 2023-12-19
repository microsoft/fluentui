import * as React from 'react';
import { render } from '@testing-library/react';
// import { isConformant } from '../../testing/isConformant';
import { Rating } from './Rating';

describe('Rating', () => {
  //   isConformant({
  //     Component: Rating,
  //     displayName: 'Rating',
  //   });
  it('renders a default state', () => {
    const result = render(<Rating>Default RatingItem</Rating>);
    expect(result.container).toMatchSnapshot();
  });
});

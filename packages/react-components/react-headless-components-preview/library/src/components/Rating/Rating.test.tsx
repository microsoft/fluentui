import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Rating } from './Rating';
import { RatingItem } from './RatingItem';

describe('Rating', () => {
  isConformant({
    Component: Rating,
    displayName: 'Rating',
  });

  it('renders a default state', () => {
    const result = render(
      <Rating max={5} defaultValue={3}>
        <RatingItem value={1} />
        <RatingItem value={2} />
        <RatingItem value={3} />
        <RatingItem value={4} />
        <RatingItem value={5} />
      </Rating>,
    );
    expect(result.container).toMatchSnapshot();
  });
});

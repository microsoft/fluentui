import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { RatingDisplay } from './RatingDisplay';
import { RatingItem } from '../Rating/RatingItem/RatingItem';

describe('RatingDisplay', () => {
  isConformant({
    Component: RatingDisplay,
    displayName: 'RatingDisplay',
  });

  it('renders a default state', () => {
    const result = render(
      <RatingDisplay icon="span" value={3}>
        <RatingItem value={1} />
      </RatingDisplay>,
    );
    expect(result.container).toMatchSnapshot();
  });
});

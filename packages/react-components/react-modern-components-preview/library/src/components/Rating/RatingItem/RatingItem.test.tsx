import * as React from 'react';
import { render } from '@testing-library/react';
import { Rating } from '../Rating/Rating';
import { ratingItemClassNames } from './useRatingItemStyles.styles';

describe('RatingItem', () => {
  it('maps fill state to data attributes and modern slot classes', () => {
    const { getAllByRole } = render(<Rating aria-label="Rating" value={1.5} step={0.5} />);
    const secondItem = getAllByRole('radio', { hidden: true })[2].parentElement;

    expect(secondItem).toHaveClass(ratingItemClassNames.root);
    expect(secondItem).toHaveAttribute('data-appearance', 'filled-half');
    expect(secondItem?.querySelector(`.${ratingItemClassNames.selectedIcon}`)).not.toBeNull();
    expect(secondItem?.querySelector(`.${ratingItemClassNames.unselectedIcon}`)).not.toBeNull();
  });
});

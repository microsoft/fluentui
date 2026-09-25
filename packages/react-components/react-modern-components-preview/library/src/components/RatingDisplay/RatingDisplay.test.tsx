import * as React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { RatingDisplay } from './RatingDisplay';
import { ratingDisplayClassNames } from './useRatingDisplayStyles.styles';
import { ratingItemClassNames } from '../Rating/RatingItem/useRatingItemStyles.styles';

expect.extend(toHaveNoViolations);

describe('RatingDisplay', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(<RatingDisplay value={4.5} count={1160} />);
    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('renders modern defaults, labels, and items', () => {
    const { getByRole, getByText } = render(<RatingDisplay value={4.5} count={1160} />);
    const root = getByRole('img');

    expect(root).toHaveClass(ratingDisplayClassNames.root);
    expect(root).toHaveAttribute('data-color', 'neutral');
    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root.getElementsByClassName(ratingItemClassNames.root)).toHaveLength(5);
    expect(getByText('4.5')).toHaveClass(ratingDisplayClassNames.valueText);
    expect(getByText('1,160')).toHaveClass(ratingDisplayClassNames.countText);
  });

  it('renders one modern item in compact mode', () => {
    const { getByRole } = render(<RatingDisplay compact value={4.5} />);
    expect(getByRole('img').getElementsByClassName(ratingItemClassNames.root)).toHaveLength(1);
  });

  it('preserves consumer class names', () => {
    const { getByRole } = render(<RatingDisplay value={3} className="custom-root" />);
    expect(getByRole('img')).toHaveClass('custom-root');
  });
});

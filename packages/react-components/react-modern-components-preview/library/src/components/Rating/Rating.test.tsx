import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Rating } from './Rating';
import { ratingClassNames } from './useRatingStyles.styles';
import { ratingItemClassNames } from '../RatingItem/useRatingItemStyles.styles';

expect.extend(toHaveNoViolations);

describe('Rating', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(<Rating aria-label="Rating" />);
    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('renders modern defaults and generated modern items', () => {
    const { getByRole, getAllByRole } = render(<Rating aria-label="Rating" />);
    const root = getByRole('radiogroup');

    expect(root).toHaveClass(ratingClassNames.root);
    expect(root).toHaveAttribute('data-color', 'neutral');
    expect(root).toHaveAttribute('data-size', 'extra-large');
    expect(getAllByRole('radio')).toHaveLength(5);
    expect(getAllByRole('radio')[0].parentElement).toHaveClass(ratingItemClassNames.root);
  });

  it('supports half steps and reports value changes', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Rating aria-label="Rating" step={0.5} onChange={onChange} />);

    fireEvent.click(getByRole('radio', { name: '1.5' }));
    expect(onChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ value: 1.5 }));
  });

  it('preserves consumer class names', () => {
    const { getByRole } = render(<Rating aria-label="Rating" className="custom-root" />);
    expect(getByRole('radiogroup')).toHaveClass('custom-root');
  });
});

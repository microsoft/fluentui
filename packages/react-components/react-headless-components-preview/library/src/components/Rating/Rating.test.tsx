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
    const { getByRole, getAllByRole } = render(
      <Rating max={5} defaultValue={3}>
        <RatingItem value={1} />
        <RatingItem value={2} />
        <RatingItem value={3} />
        <RatingItem value={4} />
        <RatingItem value={5} />
      </Rating>,
    );
    const radiogroup = getByRole('radiogroup');
    const radios = getAllByRole('radio');

    expect(radiogroup).toBeInTheDocument();
    expect(radios).toHaveLength(5);
  });

  it('checks the correct radio based on defaultValue', () => {
    const { getAllByRole } = render(
      <Rating max={5} defaultValue={3}>
        <RatingItem value={1} />
        <RatingItem value={2} />
        <RatingItem value={3} />
        <RatingItem value={4} />
        <RatingItem value={5} />
      </Rating>,
    );
    const radios = getAllByRole('radio') as HTMLInputElement[];

    expect(radios[2]).toBeChecked();
    expect(radios[0]).not.toBeChecked();
    expect(radios[4]).not.toBeChecked();
  });

  it('renders filled appearance for items up to the selected value', () => {
    const { container } = render(
      <Rating max={5} defaultValue={3}>
        <RatingItem value={1} />
        <RatingItem value={2} />
        <RatingItem value={3} />
        <RatingItem value={4} />
        <RatingItem value={5} />
      </Rating>,
    );
    const items = container.querySelectorAll('[data-appearance]');
    const appearances = Array.from(items).map(item => item.getAttribute('data-appearance'));

    expect(appearances).toEqual(['filled', 'filled', 'filled', 'outline', 'outline']);
  });
});

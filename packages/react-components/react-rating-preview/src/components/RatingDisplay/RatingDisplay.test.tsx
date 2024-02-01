import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { RatingDisplay } from './RatingDisplay';

describe('RatingDisplay', () => {
  isConformant({
    Component: RatingDisplay,
    displayName: 'RatingDisplay',
    requiredProps: { count: 1160, value: 4.5 },
  });
  it('renders the correct number of items', () => {
    const { getByRole } = render(<RatingDisplay max={10} />);
    const items = getByRole('img');
    expect(items.getElementsByClassName('fui-RatingItem').length).toEqual(10);
  });
  it('renders the valueText slot when a value is provided', () => {
    const { getByRole } = render(<RatingDisplay value={3} />);
    const items = getByRole('img');
    expect(items.getElementsByClassName('fui-RatingDisplay__valueText').length).toEqual(1);
  });
  it('does not render the valueText slot when a value is not provided', () => {
    const { getByRole } = render(<RatingDisplay />);
    const items = getByRole('img');
    expect(items.getElementsByClassName('fui-RatingDisplay__valueText').length).toEqual(0);
  });
  it('renders the countText slot when a count is provided', () => {
    const { getByRole } = render(<RatingDisplay count={1160} />);
    const items = getByRole('img');
    expect(items.getElementsByClassName('fui-RatingDisplay__countText').length).toEqual(1);
  });
  it('does not render the countText slot when a count is not provided', () => {
    const { getByRole } = render(<RatingDisplay />);
    const items = getByRole('img');
    expect(items.getElementsByClassName('fui-RatingDisplay__countText').length).toEqual(0);
  });
  it('renders only one item when compact is true', () => {
    const { getByRole } = render(<RatingDisplay compact />);
    const items = getByRole('img');
    expect(items.getElementsByClassName('fui-RatingItem').length).toEqual(1);
  });
});

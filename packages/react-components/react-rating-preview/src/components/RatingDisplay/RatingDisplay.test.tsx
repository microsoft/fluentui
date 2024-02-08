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
    expect(getByRole('img').children.length).toEqual(10);
  });
  it('renders the valueText slot when a value is provided', () => {
    const { getByText } = render(<RatingDisplay value={3} />);
    const valueText = getByText('3');
    expect(valueText).toBeDefined();
    expect(valueText.classList.contains('fui-RatingDisplay__valueText')).toBeTruthy();
  });
  it('does not render the valueText slot when a value is not provided', () => {
    const { container } = render(<RatingDisplay />);
    expect(container?.querySelector('.fui-RatingDisplay__valueText')).toBeNull();
  });
  it('renders the countText slot when a count is provided', () => {
    const { getByText } = render(<RatingDisplay count={1160} />);
    const countText = getByText('1,160');
    expect(countText).toBeDefined();
    expect(countText.classList.contains('fui-RatingDisplay__countText')).toBeTruthy();
  });
  it('does not render the countText slot when a count is not provided', () => {
    const { container } = render(<RatingDisplay />);
    expect(container?.querySelector('.fui-RatingDisplay__countText')).toBeNull();
  });
  it('renders only one item when compact is true', () => {
    const { getByRole } = render(<RatingDisplay compact />);
    const items = getByRole('img');
    expect(items.getElementsByClassName('fui-RatingItem').length).toEqual(1);
  });
});

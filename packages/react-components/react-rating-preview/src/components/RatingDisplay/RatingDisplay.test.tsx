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
    const result = render(<RatingDisplay max={10} />);
    const items = result.container.getElementsByClassName('fui-RatingItem');
    expect(items.length).toEqual(10);
  });
  it('renders the valueText slot when a value is provided', () => {
    const result = render(<RatingDisplay value={3} />);
    const items = result.container.getElementsByClassName('fui-RatingDisplay__valueText');
    expect(items.length).toEqual(1);
  });
  it('does not render the valueText slot when a value is not provided', () => {
    const result = render(<RatingDisplay />);
    const items = result.container.getElementsByClassName('fui-RatingDisplay__valueText');
    expect(items.length).toEqual(0);
  });
  it('renders the countText slot when a count is provided', () => {
    const result = render(<RatingDisplay count={1160} />);
    const items = result.container.getElementsByClassName('fui-RatingDisplay__countText');
    expect(items.length).toEqual(1);
  });
  it('does not render the countText slot when a count is not provided', () => {
    const result = render(<RatingDisplay />);
    const items = result.container.getElementsByClassName('fui-RatingDisplay__countText');
    expect(items.length).toEqual(0);
  });
  it('renders only one item when compact is true', () => {
    const result = render(<RatingDisplay compact />);
    const items = result.container.getElementsByClassName('fui-RatingItem');
    expect(items.length).toEqual(1);
  });
});

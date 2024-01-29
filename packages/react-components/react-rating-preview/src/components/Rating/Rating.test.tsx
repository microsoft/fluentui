import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Rating } from './Rating';

describe('Rating', () => {
  isConformant({
    Component: Rating,
    displayName: 'Rating',
    disabledTests: ['consistent-callback-args'],
  });
  it('respects a default value', () => {
    const result = render(<Rating defaultValue={3} />);
    const checkedItems = result.container.querySelectorAll('input:checked');
    expect(checkedItems[0].getAttribute('value')).toBe('3');
  });
  it('only sets the selected rating item to checked', () => {
    const result = render(<Rating value={3} />);
    const checkedItems = result.container.querySelectorAll('input:checked');
    expect(checkedItems.length).toEqual(1);
  });
  it('renders the correct number of items', () => {
    const result = render(<Rating max={10} />);
    const items = result.container.querySelectorAll('input');
    expect(items.length).toEqual(10);
  });
});

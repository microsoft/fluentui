import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Rating } from './Rating';

describe('Rating', () => {
  isConformant({
    Component: Rating,
    displayName: 'Rating',
  });
  it('respects a default value', () => {
    const { getAllByRole } = render(<Rating defaultValue={3} />);
    const checkedItems = getAllByRole('radio').filter(item => (item as HTMLInputElement).checked);
    expect(checkedItems[0].getAttribute('value')).toBe('3');
    expect(checkedItems.length).toEqual(1);
  });
  it('only sets the selected rating item to checked', () => {
    const { getAllByRole } = render(<Rating value={3} />);
    const checkedItems = getAllByRole('radio').filter(item => (item as HTMLInputElement).checked);
    expect(checkedItems[0].getAttribute('value')).toBe('3');
    expect(checkedItems.length).toEqual(1);
  });
  it('renders the correct number of items', () => {
    const { getAllByRole } = render(<Rating max={10} />);
    const items = getAllByRole('radio');
    expect(items.length).toEqual(10);
  });
  it('calle onChange when a rating is clicked', () => {
    const onChange = jest.fn();
    const { getAllByRole } = render(<Rating onChange={onChange} />);
    const items = getAllByRole('radio');
    items[0].click();
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  it('does not call onChange when a rating is clicked and the value is the same', () => {
    const onChange = jest.fn();
    const { getAllByRole } = render(<Rating value={3} onChange={onChange} />);
    const items = getAllByRole('radio');
    items[2].click();
    expect(onChange).toHaveBeenCalledTimes(0);
  });
  it('calls onChange with the correct value when a rating is clicked', () => {
    const onChange = jest.fn();
    const { getAllByRole } = render(<Rating onChange={onChange} />);
    const items = getAllByRole('radio');
    items[3].click();
    items[2].click();
    items[1].click();
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange.mock.calls[0][1].value).toBe(4);
    expect(onChange.mock.calls[1][1].value).toBe(3);
    expect(onChange.mock.calls[2][1].value).toBe(2);
  });
});

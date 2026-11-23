import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { isConformant } from '../../testing/isConformant';
import { StarFilled, StarRegular } from '@fluentui/react-icons';
import { Rating } from './Rating';
import { useRatingBase_unstable } from './useRating';

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
  it('creates RadioItems with correct aria-labels', () => {
    const onChange = jest.fn();
    const { getAllByRole } = render(<Rating onChange={onChange} itemLabel={num => `item #${num}`} />);
    const items = getAllByRole('radio');
    expect(items[0].getAttribute('aria-label')).toBe('item #1');
    expect(items[1].getAttribute('aria-label')).toBe('item #2');
    expect(items[2].getAttribute('aria-label')).toBe('item #3');
  });
});

describe('Rating DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <Rating
        color="brand"
        defaultValue={2}
        iconFilled={StarFilled}
        iconOutline={StarRegular}
        itemLabel={n => `${n}`}
        max={3}
        name="rating"
        size="large"
        step={0.5}
      />,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class', 'role']);
  });
});

describe('useRatingBase_unstable base hook', () => {
  it('does not forward component props to the root slot', () => {
    const { result } = renderHook(() =>
      useRatingBase_unstable(
        {
          defaultValue: 2,
          iconFilled: StarFilled,
          iconOutline: StarRegular,
          itemLabel: n => `${n}`,
          max: 3,
          name: 'rating',
          onChange: jest.fn(),
          step: 0.5,
        },
        React.createRef(),
      ),
    );

    expect(result.current.root).not.toHaveProperty('defaultValue');
    expect(result.current.root).not.toHaveProperty('iconFilled');
    expect(result.current.root).not.toHaveProperty('iconOutline');
    expect(result.current.root).not.toHaveProperty('itemLabel');
    expect(result.current.root).not.toHaveProperty('max');
    expect(result.current.root).not.toHaveProperty('name');
    expect(result.current.root).not.toHaveProperty('step');
    expect(result.current.root).not.toHaveProperty('value');
  });
});

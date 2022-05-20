import { getNativeElementProps, getPartitionedNativeProps } from './getNativeElementProps';

describe('getNativeElementProps', () => {
  it('can filter native element properties', () => {
    expect(getNativeElementProps('div', { id: '123', checked: true })).toEqual({
      id: '123',
    });
    expect(getNativeElementProps('input', { id: '123', checked: true })).toEqual({ id: '123', checked: true });
    expect(getNativeElementProps('input', { id: '123', checked: true }, ['id'])).toEqual({ checked: true });
  });

  it('includes `as` as a native prop', () => {
    expect(getNativeElementProps('div', { as: 'span' })).toEqual({ as: 'span' });
  });

  it('excludes props regardless of the allowed', () => {
    const actual = getNativeElementProps('div', { as: 'span' }, ['as']);

    // @ts-expect-error -- `as` was removed from the object
    expect(actual.as).toBeUndefined();
    expect(actual).toEqual({});
  });
});

describe('getPartitionedNativeProps', () => {
  it('creates modified root and primary and remove excluded prop names from "primary"', () => {
    const actual = getPartitionedNativeProps({
      primarySlotTagName: 'div',
      props: { className: 'hello', style: { width: '100px' }, id: '123', dir: 'ltr' },
      excludedPropNames: ['id'],
    });

    expect(actual.root).toEqual({ className: 'hello', style: { width: '100px' } });
    expect(actual.primary).toEqual({ dir: 'ltr' });

    // @ts-expect-error -- `className` was removed from the object
    expect(actual.primary.className).toBeUndefined();
    // @ts-expect-error -- `style` was removed from the object
    expect(actual.primary.style).toBeUndefined();
  });
});

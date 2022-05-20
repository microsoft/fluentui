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
  it('creates modified root and primary and always removes className and styles prop from primary', () => {
    const actual = getPartitionedNativeProps({
      primarySlotTagName: 'div',
      props: { className: 'hello', style: { width: '100px' }, id: '123', dir: 'ltr', defaultChecked: false },
    });

    expect(actual.root).toEqual({ className: 'hello', style: { width: '100px' } });
    expect(actual.primary).toEqual({ id: '123', dir: 'ltr', defaultChecked: false });

    // @ts-expect-error -- `className` was removed from the object
    expect(actual.primary.className).toBeUndefined();
    // @ts-expect-error -- `style` was removed from the object
    expect(actual.primary.style).toBeUndefined();
  });

  it('works with excluded prop names for "primary"', () => {
    const actual = getPartitionedNativeProps({
      primarySlotTagName: 'div',
      props: { id: '123', dir: 'ltr', defaultChecked: false },
      excludedPropNames: ['id', 'defaultChecked'],
    });

    expect(actual.primary).toEqual({ dir: 'ltr' });

    expect(actual.primary.dir).toBe('ltr');
    // @ts-expect-error -- defaultChecked prop was excluded
    expect(actual.primary.defaultChecked).toBeUndefined();
    // @ts-expect-error -- id prop was excluded
    expect(actual.primary.id).toBeUndefined();
  });
});

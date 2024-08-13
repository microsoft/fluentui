import { getIntrinsicElementProps } from './getIntrinsicElementProps';

describe('getIntrinsicElementProps', () => {
  type Props = { as?: 'span' | 'div' | 'input'; id?: string; checked?: boolean };
  it('can filter native element properties', () => {
    expect(getIntrinsicElementProps<Props>('div', { id: '123', checked: true })).toEqual({ id: '123' });
    expect(getIntrinsicElementProps<Props>('input', { id: '123', checked: true })).toEqual({
      id: '123',
      checked: true,
    });
    expect(getIntrinsicElementProps<Props, 'id'>('input', { id: '123', checked: true }, ['id'])).toEqual({
      checked: true,
    });
  });

  it('includes `as` as a native prop', () => {
    expect(getIntrinsicElementProps<Props>('div', { as: 'span' })).toEqual({ as: 'span' });
  });

  it('excludes props regardless of the allowed', () => {
    expect(getIntrinsicElementProps<Props, 'as'>('div', { as: 'span' }, ['as'])).toEqual({});
  });
});

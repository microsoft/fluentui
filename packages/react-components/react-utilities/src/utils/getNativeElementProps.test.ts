import { getNativeElementProps } from './getNativeElementProps';

describe('getNativeElementProps', () => {
  it('can filter native element properties', () => {
    // eslint-disable-next-line deprecation/deprecation
    expect(getNativeElementProps('div', { id: '123', checked: true })).toEqual({ id: '123' });
    // eslint-disable-next-line deprecation/deprecation
    expect(getNativeElementProps('input', { id: '123', checked: true })).toEqual({ id: '123', checked: true });
    // eslint-disable-next-line deprecation/deprecation
    expect(getNativeElementProps('input', { id: '123', checked: true }, ['id'])).toEqual({ checked: true });
  });

  it('includes `as` as a native prop', () => {
    // eslint-disable-next-line deprecation/deprecation
    expect(getNativeElementProps('div', { as: 'span' })).toEqual({ as: 'span' });
  });

  it('excludes props regardless of the allowed', () => {
    // eslint-disable-next-line deprecation/deprecation
    expect(getNativeElementProps('div', { as: 'span' }, ['as'])).toEqual({});
  });
});

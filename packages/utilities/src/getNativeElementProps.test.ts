import { getNativeElementProps } from './getNativeElementProps';

describe('getNativeElementProps', () => {
  it('can filter native element properties', () => {
    expect(getNativeElementProps('div', { id: '123', checked: true })).toEqual({ id: '123' });
    expect(getNativeElementProps('input', { id: '123', checked: true })).toEqual({ id: '123', checked: true });
    expect(getNativeElementProps('input', { id: '123', checked: true }, ['id'])).toEqual({ checked: true });
  });
});

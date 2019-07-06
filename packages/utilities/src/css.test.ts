import { css } from './css';

describe('css', () => {
  it('can join classes', () => {
    expect(css('a', 'b', 'c')).toEqual('a b c');
  });

  it('can handle null/undefined/false/blanks', () => {
    expect(css('a', null, undefined, false, 'b', 'c')).toEqual('a b c');
  });

  it('can handle an object with a toString', () => {
    expect(css('a', { toString: () => 'b' }, 'c')).toEqual('a b c');
  });

  it('can handle a class map', () => {
    expect(css('a', { b: true, z: false }, 'c')).toEqual('a b c');
  });
});

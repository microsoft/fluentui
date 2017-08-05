import { css } from './css';

let { expect } = chai;

describe('css', () => {
  it('can join classes', () => {
    expect(css('a', 'b', 'c')).equals('a b c');
  });

  it('can handle null/undefined/false/blanks', () => {
    expect(css('a', null, undefined, false, 'b', 'c')).equals('a b c');
  });

  it('can handle an object with a toString', () => {
    expect(css('a', { toString: () => 'b' }, 'c')).equals('a b c');
  });

  it('can handle a class map', () => {
    expect(css('a', { 'b': true, 'z': false }, 'c')).equals('a b c');
  });
});

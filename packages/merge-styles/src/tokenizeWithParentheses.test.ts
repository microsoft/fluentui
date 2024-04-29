import { tokenizeWithParentheses } from './tokenizeWithParentheses';

describe('tokenizeWithParentheses', () => {
  it('handles both space and tab', () => {
    expect(tokenizeWithParentheses('one two\tthree four')).toEqual(['one', 'two', 'three', 'four']);
  });

  it('collapses consecutive whitespace characters', () => {
    expect(tokenizeWithParentheses('  hello   world   ')).toEqual(['hello', 'world']);
  });

  it('returns an empty array for empty string', () => {
    expect(tokenizeWithParentheses('')).toEqual([]);
  });

  it('returns an empty array for a string containing only whitespace', () => {
    expect(tokenizeWithParentheses('\t \t  ')).toEqual([]);
  });

  it('treats parenthesized expressions as a single token', () => {
    expect(tokenizeWithParentheses('(a ) calc(b  / (var(--c)+d)) e')).toEqual(['(a )', 'calc(b  / (var(--c)+d))', 'e']);
  });

  it('handles mismatched parentheses', () => {
    expect(tokenizeWithParentheses('a) b))  (c d e)  (f  g')).toEqual(['a)', 'b))', '(c d e)', '(f  g']);
  });
});

import { toCSSUrl } from './toCSSUrl';

describe('toCSSUrl', () => {
  it('quotes the URL', () => {
    expect(toCSSUrl('image.png')).toBe('url("image.png")');
  });

  it('keeps spaces and parentheses inside the quoted string', () => {
    expect(toCSSUrl('image (1).png')).toBe('url("image (1).png")');
  });

  it('escapes quotes, backslashes, and CSS line terminators', () => {
    expect(toCSSUrl('image"\\\n\r\f.png')).toBe('url("image\\22 \\5c \\a \\d \\c .png")');
  });

  it('keeps an empty source', () => {
    expect(toCSSUrl('')).toBe('url("")');
  });
});

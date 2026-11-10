import { extractAnchorLink } from './extractAnchorLink';

describe('extractAnchorLink', () => {
  it('returns empty string for empty url', () => {
    expect(extractAnchorLink('')).toBe('');
  });

  it('throws on null/undefined url', () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    expect(() => extractAnchorLink(undefined as any)).toThrow();
    expect(() => extractAnchorLink(null as any)).toThrow();
    /* eslint-enable @typescript-eslint/no-explicit-any */
  });

  it('returns empty string for url with no hash', () => {
    expect(extractAnchorLink('http://whatever')).toBe('');
  });

  it('returns empty string for url with empty hash', () => {
    expect(extractAnchorLink('http://whatever#')).toBe('');
    expect(extractAnchorLink('#')).toBe('');
  });

  it('returns empty string for url with only route hash', () => {
    expect(extractAnchorLink('#/components/checkbox')).toBe('');
    expect(extractAnchorLink('http://whatever#/components/checkbox')).toBe('');
  });

  it('returns empty string for url with only anchor', () => {
    expect(extractAnchorLink('http://whatever#Overview')).toBe('');
    expect(extractAnchorLink('#Overview')).toBe('');
  });

  it('returns anchor from url with route and anchor', () => {
    expect(extractAnchorLink('http://whatever#/components/checkbox#Overview')).toBe('Overview');
    expect(extractAnchorLink('#/components/checkbox#Overview')).toBe('Overview');
  });

  it.each([
    '#/styles/web/icons%23available-icons',
    'https://developer.microsoft.com/en-us/fluentui#/styles/web/icons%23available-icons',
    '#/styles/web/icons%23available-icons?min=1',
  ])('returns the anchor when the route separator is encoded: %s', url => {
    expect(extractAnchorLink(url)).toBe('available-icons');
  });

  it.each([
    'https://example.com/icons%23available-icons',
    '#/styles/web/icons?next=%23available-icons',
    '#/styles/web/icons%2523available-icons',
  ])('does not interpret encoded URL data as an anchor: %s', url => {
    expect(extractAnchorLink(url)).toBe('');
  });

  it('preserves encoded characters in a literal anchor', () => {
    expect(extractAnchorLink('#/styles/web/icons#section%23name')).toBe('section%23name');
  });

  it('returns empty string for url with three hashes', () => {
    // unexpected but just in case?
    expect(extractAnchorLink('http://whatever#/components/checkbox#Overview#wat')).toBe('');
  });

  it('does not include query string in returned value', () => {
    expect(extractAnchorLink('http://whatever#Overview?min=1')).toBe('');
    expect(extractAnchorLink('http://whatever#/components/checkbox#Overview?min=1')).toBe('Overview');
  });
});

import { removeAnchorLink } from './removeAnchorLink';

describe('removeAnchorLink', () => {
  it('returns empty string for empty url', () => {
    expect(removeAnchorLink('')).toBe('');
  });

  it('throws on null/undefined url', () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    expect(() => removeAnchorLink(undefined as any)).toThrow();
    expect(() => removeAnchorLink(null as any)).toThrow();
    /* eslint-enable @typescript-eslint/no-explicit-any */
  });

  it('returns hashless url unmodified', () => {
    expect(removeAnchorLink('http://whatever')).toBe('http://whatever');
  });

  it('removes empty hash', () => {
    expect(removeAnchorLink('http://whatever#')).toBe('http://whatever');
    expect(removeAnchorLink('#')).toBe('');
  });

  it('returns url with only route hash unmodified', () => {
    expect(removeAnchorLink('#/components/checkbox')).toBe('#/components/checkbox');
    expect(removeAnchorLink('http://whatever#/components/checkbox')).toBe('http://whatever#/components/checkbox');
  });

  it('returns empty string for hash with only anchor', () => {
    expect(removeAnchorLink('#Overview')).toBe('');
    expect(removeAnchorLink('#some-anchor')).toBe('');
  });

  it('removes anchor from URL with single non-route hash', () => {
    expect(removeAnchorLink('http://whatever#Overview')).toBe('http://whatever');
    expect(removeAnchorLink('http://whatever#some-anchor')).toBe('http://whatever');
  });

  it('removes anchor from url with route and anchor', () => {
    expect(removeAnchorLink('http://whatever#/components/checkbox#Overview')).toBe(
      'http://whatever#/components/checkbox',
    );
    expect(removeAnchorLink('http://whatever#/components/checkbox#some-anchor')).toBe(
      'http://whatever#/components/checkbox',
    );
    expect(removeAnchorLink('#/components/checkbox#Overview')).toBe('#/components/checkbox');
    expect(removeAnchorLink('#/components/checkbox#some-anchor')).toBe('#/components/checkbox');
  });

  it('preserves query string before hash', () => {
    expect(removeAnchorLink('http://whatever?min=1#Overview')).toBe('http://whatever?min=1');
    expect(removeAnchorLink('http://whatever?min=1#/components/checkbox#Overview')).toBe(
      'http://whatever?min=1#/components/checkbox',
    );
  });

  it('removes query string after hash', () => {
    // This is mainly intended to document the current behavior. If the function is updated to preserve
    // the query string, various places that depend on it removing the query string must be updated.
    expect(removeAnchorLink('http://whatever#Overview?min=1')).toBe('http://whatever');
    expect(removeAnchorLink('http://whatever#/components/checkbox#Overview?min=1')).toBe(
      'http://whatever#/components/checkbox',
    );
    expect(removeAnchorLink('#/components/checkbox#Overview?min=1')).toBe('#/components/checkbox');
    expect(removeAnchorLink('#/components/checkbox#some-anchor?min=1')).toBe('#/components/checkbox');
  });
});

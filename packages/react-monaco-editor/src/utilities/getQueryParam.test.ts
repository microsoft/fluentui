import { getQueryParam } from './getQueryParam';
import { getWindow } from '@fluentui/react/lib/Utilities';

jest.mock('@fluentui/react/lib/Utilities', () => ({
  ...jest.requireActual('@fluentui/react/lib/Utilities'),
  getWindow: jest.fn(),
}));

describe('getQueryParam', () => {
  it('returns null if no query', () => {
    expect(getQueryParam('foo', 'http://whatever')).toBe(null);
    expect(getQueryParam('foo', 'http://whatever#foo=1')).toBe(null);
  });

  it('returns null if no matching query param', () => {
    expect(getQueryParam('foo', 'http://whatever?bar=2')).toBe(null);
    expect(getQueryParam('foo', 'http://whatever?bar=2#foo=1')).toBe(null);
  });

  it('returns query param value', () => {
    expect(getQueryParam('foo', 'http://whatever?foo=1')).toBe('1');
    expect(getQueryParam('foo', 'http://whatever?foo=1&bar=2')).toBe('1');
    expect(getQueryParam('foo', 'http://whatever?bar=2&foo=1')).toBe('1');
    expect(getQueryParam('foo', 'http://whatever?baz=3&foo=1&bar=2')).toBe('1');
    expect(getQueryParam('foo', 'http://whatever?bar=2&foo=1#hash')).toBe('1');
  });

  it('returns empty string if query param is present without value', () => {
    expect(getQueryParam('foo', 'http://whatever?foo')).toBe('');
    expect(getQueryParam('foo', 'http://whatever?foo=')).toBe('');
    expect(getQueryParam('foo', 'http://whatever?foo&bar=2')).toBe('');
    expect(getQueryParam('foo', 'http://whatever?foo=&bar=2')).toBe('');
  });

  it('works with query string after hash', () => {
    // This isn't technically a proper URL, but likely to happen with hash routing
    expect(getQueryParam('foo', 'http://whatever#hash?foo=1')).toBe('1');
    expect(getQueryParam('foo', 'http://whatever#hash?baz=3&foo=1&bar=2')).toBe('1');
    expect(getQueryParam('foo', 'http://whatever#hash?foo')).toBe('');
  });

  it('defaults to using window.location.href', () => {
    const mockWindow = {
      location: { href: 'http://whatever?foo=1' },
    } as Window;
    jest.mocked(getWindow).mockReturnValue(mockWindow);

    expect(getQueryParam('foo')).toBe('1');
  });
});

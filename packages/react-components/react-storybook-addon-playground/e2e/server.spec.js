// @ts-check
const path = require('node:path');

const { resolveRequestPath } = require('./server.cjs');

describe('e2e server resolveRequestPath', () => {
  const shellDir = path.resolve('/dist/playground');
  const siteDir = path.resolve('/dist/e2e-site');
  const roots = { shellDir, siteDir };

  it('maps shell and site URLs into their roots', () => {
    expect(resolveRequestPath('/playground/app/playground.html?x=1#code=a', roots)).toBe(
      path.join(shellDir, 'playground.html'),
    );
    expect(resolveRequestPath('/chunks/runtime%20file.js', roots)).toBe(path.join(siteDir, 'chunks/runtime file.js'));
  });

  it.each([
    ['parent traversal', '/playground/app/..%2f..%2fsecret.js'],
    ['encoded separators', '/..%2f..%2fetc%2fpasswd'],
    ['sibling directory sharing the root prefix', '/playground/app/..%2fplayground2/secret.js'],
    ['the root directory itself', '/playground/app/'],
    ['malformed encoding', '/%E0%A4%A'],
    ['null bytes', '/index.js%00.html'],
  ])('rejects %s', (_, url) => {
    expect(resolveRequestPath(url, roots)).toBeUndefined();
  });
});

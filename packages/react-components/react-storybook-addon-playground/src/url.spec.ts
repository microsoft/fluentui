import {
  CODE_HASH_PARAM,
  CSS_HASH_PARAM,
  PLAYGROUND_HASH_VERSION,
  PLAYGROUND_PATH,
  VERSION_HASH_PARAM,
  createCodeHash,
  createPlaygroundHash,
  createPlaygroundUrl,
  decodeCode,
  decodeCodeFromHash,
  decodePlaygroundStateFromHash,
  encodeCode,
  readPlaygroundHash,
} from './url';

const sampleCode = `import * as React from 'react';
import { Button } from '@fluentui/react-components';

export const Default = () => <Button appearance="primary">Hello & welcome?</Button>;
`;

describe('url', () => {
  describe('encodeCode / decodeCode', () => {
    it('round trips source code', () => {
      expect(decodeCode(encodeCode(sampleCode))).toBe(sampleCode);
    });

    it('produces a URL safe payload', () => {
      const encoded = encodeCode(sampleCode);

      expect(encoded).toMatch(/^[A-Za-z0-9+\-$]+$/);
    });

    it('tolerates "+" being decoded as a space by URLSearchParams', () => {
      const encoded = encodeCode(sampleCode);

      expect(encoded).toContain('+');
      expect(decodeCode(encoded.replace(/\+/g, ' '))).toBe(sampleCode);
    });

    it('returns null for empty or invalid payloads', () => {
      expect(decodeCode('')).toBeNull();
      expect(decodeCode('not-a-valid-payload!!!')).toBeNull();
    });

    it('round trips empty source through playground state hashes', () => {
      const hash = createPlaygroundHash({ code: '' });

      expect(decodePlaygroundStateFromHash(hash)).toEqual({ code: '', cssModules: [] });
      expect(decodeCodeFromHash(hash)).toBe('');
    });
  });

  describe('createCodeHash / decodeCodeFromHash', () => {
    it('creates a hash with the code param', () => {
      const hash = createCodeHash(sampleCode);

      expect(hash.startsWith(`#${CODE_HASH_PARAM}=`)).toBe(true);
      expect(decodeCodeFromHash(hash)).toBe(sampleCode);
    });

    it('accepts hash with and without the leading "#"', () => {
      const hash = createCodeHash(sampleCode);

      expect(decodeCodeFromHash(hash.slice(1))).toBe(sampleCode);
    });

    it('ignores unrelated hash params', () => {
      expect(decodeCodeFromHash('')).toBeNull();
      expect(decodeCodeFromHash('#foo=bar')).toBeNull();
      expect(decodeCodeFromHash(`#foo=bar&${createCodeHash(sampleCode).slice(1)}`)).toBe(sampleCode);
    });
  });

  describe('createPlaygroundUrl', () => {
    it('defaults to the playground shell path', () => {
      const url = createPlaygroundUrl(sampleCode);

      expect(url.startsWith(`./${PLAYGROUND_PATH}#${CODE_HASH_PARAM}=`)).toBe(true);
    });

    it('supports a custom base url', () => {
      const url = createPlaygroundUrl(sampleCode, 'https://example.com/storybook/playground.html');
      const [base, hash] = url.split('#');

      expect(base).toBe('https://example.com/storybook/playground.html');
      expect(decodeCodeFromHash(`#${hash}`)).toBe(sampleCode);
    });

    it('encodes CSS modules next to the source so the sandbox can apply them', () => {
      const cssModules = [{ name: 'button.module.css', source: '.root { color: red; }' }];
      const url = createPlaygroundUrl(sampleCode, undefined, cssModules);
      const hash = `#${url.split('#')[1]}`;

      expect(hash).toContain(`${CSS_HASH_PARAM}=`);
      expect(decodePlaygroundStateFromHash(hash)).toEqual({ code: sampleCode, cssModules });
      expect(createPlaygroundHash({ code: sampleCode, cssModules }).startsWith('#')).toBe(true);
    });
  });

  describe('readPlaygroundHash', () => {
    it('stamps created hashes with the format version', () => {
      const params = new URLSearchParams(createPlaygroundHash({ code: sampleCode }).slice(1));

      expect(params.get(VERSION_HASH_PARAM)).toBe(String(PLAYGROUND_HASH_VERSION));
    });

    it('reads links created before versioning', () => {
      const legacyHash = `#${CODE_HASH_PARAM}=${encodeCode(sampleCode)}`;

      expect(readPlaygroundHash(legacyHash)).toEqual({ state: { code: sampleCode, cssModules: [] }, issues: [] });
    });

    it('reports unreadable code instead of opening an empty playground silently', () => {
      const result = readPlaygroundHash(`#${CODE_HASH_PARAM}=not-a-valid-payload!!!`);

      expect(result.state).toBeNull();
      expect(result.issues).toEqual([expect.objectContaining({ kind: 'invalid-code' })]);
    });

    it('keeps the code but reports truncated CSS modules', () => {
      const cssModules = [{ name: 'button.module.css', source: '.root { color: red; }' }];
      const hash = createPlaygroundHash({ code: sampleCode, cssModules });
      const params = new URLSearchParams(hash.slice(1));
      params.set(CSS_HASH_PARAM, params.get(CSS_HASH_PARAM)!.slice(0, 10));

      const result = readPlaygroundHash(`#${params.toString()}`);

      expect(result.state).toEqual({ code: sampleCode, cssModules: [] });
      expect(result.issues).toEqual([expect.objectContaining({ kind: 'invalid-css' })]);
    });

    it('warns about links from a newer format version but still reads them', () => {
      const hash = `#${CODE_HASH_PARAM}=${encodeCode(sampleCode)}&${VERSION_HASH_PARAM}=${PLAYGROUND_HASH_VERSION + 1}`;
      const result = readPlaygroundHash(hash);

      expect(result.state?.code).toBe(sampleCode);
      expect(result.issues).toEqual([expect.objectContaining({ kind: 'unsupported-version' })]);
    });
  });
});

import {
  CODE_HASH_PARAM,
  createCodeHash,
  createPlaygroundUrl,
  decodeCode,
  decodeCodeFromHash,
  encodeCode,
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
    it('defaults to playground.html next to the current document', () => {
      const url = createPlaygroundUrl(sampleCode);

      expect(url.startsWith(`./playground.html#${CODE_HASH_PARAM}=`)).toBe(true);
    });

    it('supports a custom base url', () => {
      const url = createPlaygroundUrl(sampleCode, 'https://example.com/storybook/playground.html');
      const [base, hash] = url.split('#');

      expect(base).toBe('https://example.com/storybook/playground.html');
      expect(decodeCodeFromHash(`#${hash}`)).toBe(sampleCode);
    });
  });
});

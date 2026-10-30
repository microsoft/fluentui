import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import { decompressFromEncodedURIComponentBounded } from './lzString';

describe('decompressFromEncodedURIComponentBounded', () => {
  const samples = [
    'a',
    'import * as React from "react";\nexport default () => <div>Hello</div>;',
    'ünïcödé — 日本語 — 🎉🎉🎉',
    'abababababababababababababababababababababababab'.repeat(50),
    Array.from({ length: 3000 }, (_, index) => String.fromCharCode(32 + ((index * 7919) % 5000))).join(''),
  ];

  it.each(samples)('matches lz-string for %#', sample => {
    const encoded = compressToEncodedURIComponent(sample);

    expect(decompressFromEncodedURIComponentBounded(encoded, Infinity)).toEqual({ ok: true, value: sample });
    expect(decompressFromEncodedURIComponentBounded(encoded, Infinity)).toEqual({
      ok: true,
      value: decompressFromEncodedURIComponent(encoded),
    });
  });

  it('decodes the empty string payload', () => {
    expect(decompressFromEncodedURIComponentBounded(compressToEncodedURIComponent(''), 10)).toEqual({
      ok: true,
      value: '',
    });
  });

  it('treats spaces as "+" like URLSearchParams-decoded input', () => {
    const sample = 'x'.repeat(200) + 'yz'.repeat(300);
    const encoded = compressToEncodedURIComponent(sample);

    expect(encoded).toContain('+');
    expect(decompressFromEncodedURIComponentBounded(encoded.replace(/\+/g, ' '), Infinity)).toEqual({
      ok: true,
      value: sample,
    });
  });

  it('stops when the output would exceed the limit', () => {
    const bomb = compressToEncodedURIComponent('a'.repeat(2_000_000));

    expect(bomb.length).toBeLessThan(20_000);
    expect(decompressFromEncodedURIComponentBounded(bomb, 1_000_000)).toEqual({ ok: false, reason: 'too-large' });
    expect(decompressFromEncodedURIComponentBounded(compressToEncodedURIComponent('abc'), 2)).toEqual({
      ok: false,
      reason: 'too-large',
    });
    expect(decompressFromEncodedURIComponentBounded(compressToEncodedURIComponent('abc'), 3)).toEqual({
      ok: true,
      value: 'abc',
    });
  });

  it('rejects empty, truncated, and corrupt input', () => {
    const encoded = compressToEncodedURIComponent('const value = 1;'.repeat(20));

    expect(decompressFromEncodedURIComponentBounded('', Infinity)).toEqual({ ok: false, reason: 'invalid' });
    expect(decompressFromEncodedURIComponentBounded(encoded.slice(0, encoded.length / 2), Infinity)).toEqual({
      ok: false,
      reason: 'invalid',
    });
    expect(decompressFromEncodedURIComponentBounded('$$$$$$$$', Infinity)).toEqual({ ok: false, reason: 'invalid' });
  });
});

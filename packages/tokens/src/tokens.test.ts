import type { Theme } from './types';
import { tokens } from './tokens';

describe('tokens', () => {
  it('CSS variables match expected format', () => {
    (Object.keys(tokens) as (keyof Theme)[]).forEach(token => {
      const value = tokens[token];
      const hasFallback = value.includes('var(--') && value.includes(',');

      if (hasFallback) {
        const [, fallback] = value.replace(/ |\)/g, '').split(',');

        // In case of a fallback, we expect the value to be in the format `var(--token, fallback)`.
        expect(value).toBe(`var(--${token}, ${fallback})`);
      } else {
        // In case of no fallback, we expect the value to be in the format `var(--token)`.
        expect(value).toBe(`var(--${token})`);
      }
    });
  });
});

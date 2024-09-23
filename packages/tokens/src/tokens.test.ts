import type { Theme } from './types';
import { tokens } from './tokens';

describe('tokens', () => {
  it('CSS variables match expected format', () => {
    (Object.keys(tokens) as (keyof Theme)[]).forEach(token => {
      const tokenValue = tokens[token];
      const tokenRegex = new RegExp(`var\\(--${token}(, .+)?\\)`);

      expect(tokenValue).toMatch(tokenRegex);
    });
  });
});

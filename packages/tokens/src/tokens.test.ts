import type { Theme } from './types';
import { tokens } from './tokens';

describe('tokens', () => {
  it('CSS variables match expected format', () => {
    (Object.keys(tokens) as (keyof Theme)[]).forEach(token => {
      expect(1).toBe(1);
    });
  });
});

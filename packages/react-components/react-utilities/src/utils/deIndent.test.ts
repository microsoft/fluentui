import { deIndent } from './deIndent';

describe('deIndent', () => {
  it('removes common indentation and surrounding newlines', () => {
    expect(deIndent`
      first line
      second line
    `).toBe('first line\nsecond line');
  });

  it('preserves interpolated values', () => {
    const value = 'second';

    expect(deIndent`
      first
      ${value}
      third
    `).toBe('first\nsecond\nthird');
  });
});

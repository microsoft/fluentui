import { hashPropertyKey } from './hashPropertyKey';

describe('hashPropertyKey', () => {
  it('generates hashes that always start with letters', () => {
    expect(hashPropertyKey('', '', '', 'color')).toBe('sj55zd');
    expect(hashPropertyKey('', '', '', 'display')).toBe('mc9l5x');

    expect(hashPropertyKey('', '', '', 'backgroundColor')).toBe('De3pzq');
    expect(hashPropertyKey(':hover', '', '', 'color')).toBe('Bi91k9c');
  });
});

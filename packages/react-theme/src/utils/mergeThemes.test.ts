import { teamsLightTheme } from '../themes';
import { mergeThemes } from './mergeThemes';
import type { PartialTheme, Theme } from '../types';

describe('mergeThemes', () => {
  it('performs a merge of themes', () => {
    // TODO: we should not use real themes in tests
    const a: Theme = teamsLightTheme;
    const b: PartialTheme = { colorAliasBrandBackground: 'red' };

    const result = mergeThemes(a, b);

    expect(a.colorAliasBrandBackground).not.toBe('red');
    expect(result.colorAliasBrandBackground).toBe('red');
  });

  it('avoids unnecessary merges', () => {
    expect(mergeThemes(teamsLightTheme, undefined)).toBe(teamsLightTheme);
    expect(mergeThemes(undefined, teamsLightTheme)).toBe(teamsLightTheme);
  });
});

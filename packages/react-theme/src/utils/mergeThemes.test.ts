import { teamsLightTheme } from '../themes';
import { mergeThemes } from './mergeThemes';
import type { PartialTheme, Theme } from '../types';

describe('mergeThemes', () => {
  it('performs a merge of themes', () => {
    // TODO: we should not use real themes in tests
    const a: Theme = teamsLightTheme;
    const b: PartialTheme = { colorBrandBackground: 'red' };

    const result = mergeThemes(a, b);

    expect(a.colorBrandBackground).not.toBe('red');
    expect(result.colorBrandBackground).toBe('red');
  });

  it('avoids unnecessary merges', () => {
    expect(mergeThemes(teamsLightTheme, undefined)).toBe(teamsLightTheme);
    expect(mergeThemes(undefined, teamsLightTheme)).toBe(teamsLightTheme);
  });
});

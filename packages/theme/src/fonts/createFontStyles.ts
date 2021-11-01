import { FontSizes, FontWeights, LocalizedFontFamilies, LocalizedFontNames } from './FluentFonts';
import type { IFontWeight, IRawStyle } from '@fluentui/merge-styles';
import type { IFontStyles } from '../types/IFontStyles';

// Fallback fonts, if specified system or web fonts are unavailable.
const FontFamilyFallbacks = `'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif`;

// By default, we favor system fonts for the default.
// All localized fonts use a web font and never use the system font.
const defaultFontFamily = `'Segoe UI', '${LocalizedFontNames.WestEuropean}'`;

// Mapping of language prefix to to font family.
const LanguageToFontMap = {
  ar: LocalizedFontFamilies.Arabic,
  bg: LocalizedFontFamilies.Cyrillic,
  cs: LocalizedFontFamilies.EastEuropean,
  el: LocalizedFontFamilies.Greek,
  et: LocalizedFontFamilies.EastEuropean,
  he: LocalizedFontFamilies.Hebrew,
  hi: LocalizedFontFamilies.Hindi,
  hr: LocalizedFontFamilies.EastEuropean,
  hu: LocalizedFontFamilies.EastEuropean,
  ja: LocalizedFontFamilies.Japanese,
  kk: LocalizedFontFamilies.EastEuropean,
  ko: LocalizedFontFamilies.Korean,
  lt: LocalizedFontFamilies.EastEuropean,
  lv: LocalizedFontFamilies.EastEuropean,
  pl: LocalizedFontFamilies.EastEuropean,
  ru: LocalizedFontFamilies.Cyrillic,
  sk: LocalizedFontFamilies.EastEuropean,
  'sr-latn': LocalizedFontFamilies.EastEuropean,
  th: LocalizedFontFamilies.Thai,
  tr: LocalizedFontFamilies.EastEuropean,
  uk: LocalizedFontFamilies.Cyrillic,
  vi: LocalizedFontFamilies.Vietnamese,
  'zh-hans': LocalizedFontFamilies.ChineseSimplified,
  'zh-hant': LocalizedFontFamilies.ChineseTraditional,
  hy: LocalizedFontFamilies.Armenian,
  ka: LocalizedFontFamilies.Georgian,
};

function _fontFamilyWithFallbacks(fontFamily: string): string {
  return `${fontFamily}, ${FontFamilyFallbacks}`;
}

/**
 * If there is a localized font for this language, return that.
 * Returns undefined if there is no localized font for that language.
 */
function _getLocalizedFontFamily(language: string | null): string {
  for (const lang in LanguageToFontMap) {
    if (LanguageToFontMap.hasOwnProperty(lang) && language && lang.indexOf(language) === 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (LanguageToFontMap as any)[lang];
    }
  }

  return defaultFontFamily;
}

function _createFont(size: string, weight: IFontWeight, fontFamily: string): IRawStyle {
  return {
    fontFamily: fontFamily,
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    fontSize: size,
    fontWeight: weight,
  };
}

export function createFontStyles(localeCode: string | null): IFontStyles {
  const localizedFont = _getLocalizedFontFamily(localeCode);
  const fontFamilyWithFallback = _fontFamilyWithFallbacks(localizedFont);

  const fontStyles = {
    tiny: _createFont(FontSizes.mini, FontWeights.regular, fontFamilyWithFallback),
    xSmall: _createFont(FontSizes.xSmall, FontWeights.regular, fontFamilyWithFallback),
    small: _createFont(FontSizes.small, FontWeights.regular, fontFamilyWithFallback),
    smallPlus: _createFont(FontSizes.smallPlus, FontWeights.regular, fontFamilyWithFallback),
    medium: _createFont(FontSizes.medium, FontWeights.regular, fontFamilyWithFallback),
    mediumPlus: _createFont(FontSizes.mediumPlus, FontWeights.regular, fontFamilyWithFallback),
    large: _createFont(FontSizes.large, FontWeights.regular, fontFamilyWithFallback),
    xLarge: _createFont(FontSizes.xLarge, FontWeights.semibold, fontFamilyWithFallback),
    xLargePlus: _createFont(FontSizes.xLargePlus, FontWeights.semibold, fontFamilyWithFallback),
    xxLarge: _createFont(FontSizes.xxLarge, FontWeights.semibold, fontFamilyWithFallback),
    xxLargePlus: _createFont(FontSizes.xxLargePlus, FontWeights.semibold, fontFamilyWithFallback),
    superLarge: _createFont(FontSizes.superLarge, FontWeights.semibold, fontFamilyWithFallback),
    mega: _createFont(FontSizes.mega, FontWeights.semibold, fontFamilyWithFallback),
  };

  return fontStyles;
}

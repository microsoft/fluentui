import { IRawStyle, IFontWeight } from '@uifabric/merge-styles';
import { IFontStyles } from '../interfaces/index';

// Fallback fonts, if specified system or web fonts are unavailable.
const FontFamilyFallbacks = `'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif`;

// Font face names to be registered.
export namespace LocalizedFontNames {
  export const Arabic = 'Segoe UI Web (Arabic)';
  export const Cyrillic = 'Segoe UI Web (Cyrillic)';
  export const EastEuropean = 'Segoe UI Web (East European)';
  export const Greek = 'Segoe UI Web (Greek)';
  export const Hebrew = 'Segoe UI Web (Hebrew)';
  export const Thai = 'Leelawadee UI Web';
  export const Vietnamese = 'Segoe UI Web (Vietnamese)';
  export const WestEuropean = 'Segoe UI Web (West European)';
  export const Selawik = 'Selawik Web';
}

// Font families with fallbacks, for the general regions.
export namespace LocalizedFontFamilies {
  export const Arabic = `'${LocalizedFontNames.Arabic}'`;
  export const ChineseSimplified = `'Microsoft Yahei UI', Verdana, Simsun`;
  export const ChineseTraditional = `'Microsoft Jhenghei UI', Pmingliu`;
  export const Cyrillic = `'${LocalizedFontNames.Cyrillic}'`;
  export const EastEuropean = `'${LocalizedFontNames.EastEuropean}'`;
  export const Greek = `'${LocalizedFontNames.Greek}'`;
  export const Hebrew = `'${LocalizedFontNames.Hebrew}'`;
  export const Hindi = `'Nirmala UI'`;
  export const Japanese = `'Yu Gothic UI', 'Meiryo UI', Meiryo, 'MS Pgothic', Osaka`;
  export const Korean = `'Malgun Gothic', Gulim`;
  export const Selawik = `'${LocalizedFontNames.Selawik}'`;
  export const Thai = `'Leelawadee UI Web', 'Kmer UI'`;
  export const Vietnamese = `'${LocalizedFontNames.Vietnamese}'`;
  export const WestEuropean = `'${LocalizedFontNames.WestEuropean}'`;
}

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
  'zh-hant': LocalizedFontFamilies.ChineseTraditional
};

// Standard font sizes.
export namespace FontSizes {
  export const mini: string = '10px';
  export const xSmall: string = '11px';
  export const small: string = '12px';
  export const smallPlus: string = '13px';
  export const medium: string = '14px';
  export const mediumPlus: string = '15px';
  export const icon: string = '16px';
  export const large: string = '17px';
  export const xLarge: string = '21px';
  export const xxLarge: string = '28px';
  export const superLarge: string = '42px';
  export const mega: string = '72px';
}

// Standard font weights.
export namespace FontWeights {
  export const light: IFontWeight = 100;
  export const semilight: IFontWeight = 300;
  export const regular: IFontWeight = 400;
  export const semibold: IFontWeight = 600;
  export const bold: IFontWeight = 700;
}

// Standard Icon Sizes.
export namespace IconFontSizes {
  export const xSmall: string = '10px';
  export const small: string = '12px';
  export const medium: string = '16px';
  export const large: string = '20px';
}

function _fontFamilyWithFallbacks(fontFamily: string): string {
  return `${fontFamily}, ${FontFamilyFallbacks}`;
}

export function createFontStyles(localeCode: string | null): IFontStyles {
  const localizedFont = _getLocalizedFontFamily(localeCode);
  let fontFamilyWithFallback = _fontFamilyWithFallbacks(localizedFont);
  let semilightFontFamilyWithFallback = fontFamilyWithFallback;

  // Chrome has a bug where it does not render Segoe UI Semilight correctly, so we force the webfont to be used in that case
  if (localizedFont === defaultFontFamily) {
    semilightFontFamilyWithFallback = _fontFamilyWithFallbacks(LocalizedFontFamilies.WestEuropean);
  }

  const fontStyles = {
    tiny: _createFont(FontSizes.mini, FontWeights.semibold, fontFamilyWithFallback),
    xSmall: _createFont(FontSizes.xSmall, FontWeights.regular, fontFamilyWithFallback),
    small: _createFont(FontSizes.small, FontWeights.regular, fontFamilyWithFallback),
    smallPlus: _createFont(FontSizes.smallPlus, FontWeights.regular, fontFamilyWithFallback),
    medium: _createFont(FontSizes.medium, FontWeights.regular, fontFamilyWithFallback),
    mediumPlus: _createFont(FontSizes.mediumPlus, FontWeights.regular, fontFamilyWithFallback),
    large: _createFont(FontSizes.large, FontWeights.semilight, semilightFontFamilyWithFallback),
    xLarge: _createFont(FontSizes.xLarge, FontWeights.light, fontFamilyWithFallback),
    xxLarge: _createFont(FontSizes.xxLarge, FontWeights.light, fontFamilyWithFallback),
    superLarge: _createFont(FontSizes.superLarge, FontWeights.light, fontFamilyWithFallback),
    mega: _createFont(FontSizes.mega, FontWeights.light, fontFamilyWithFallback)
  };

  return fontStyles;
}

/**
 * If there is a localized font for this language, return that. Returns undefined if there is no localized font for that language.
 */
function _getLocalizedFontFamily(language: string | null): string {
  for (let lang in LanguageToFontMap) {
    if (LanguageToFontMap.hasOwnProperty(lang) && language && lang.indexOf(language) === 0) {
      // tslint:disable-next-line:no-any
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
    fontWeight: weight
  };
}

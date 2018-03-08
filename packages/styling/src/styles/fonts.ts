import {
  IRawStyle,
  IFontWeight
} from '@uifabric/merge-styles/lib/index';
import {
  IFontStyles
} from '../interfaces/index';

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

const defaultFontFamily = `'Segoe UI', '${LocalizedFontNames.WestEuropean}'`;

// Mapping of language prefix to to font family.
const LanguageToFontMap = {
  'ar': LocalizedFontFamilies.Arabic,
  'bg': LocalizedFontFamilies.Cyrillic,
  'cs': LocalizedFontFamilies.EastEuropean,
  'el': LocalizedFontFamilies.Greek,
  'et': LocalizedFontFamilies.EastEuropean,
  'he': LocalizedFontFamilies.Hebrew,
  'hi': LocalizedFontFamilies.Hindi,
  'hr': LocalizedFontFamilies.EastEuropean,
  'hu': LocalizedFontFamilies.EastEuropean,
  'ja': LocalizedFontFamilies.Japanese,
  'kk': LocalizedFontFamilies.EastEuropean,
  'ko': LocalizedFontFamilies.Korean,
  'lt': LocalizedFontFamilies.EastEuropean,
  'lv': LocalizedFontFamilies.EastEuropean,
  'pl': LocalizedFontFamilies.EastEuropean,
  'ru': LocalizedFontFamilies.Cyrillic,
  'sk': LocalizedFontFamilies.EastEuropean,
  'sr-latn': LocalizedFontFamilies.EastEuropean,
  'th': LocalizedFontFamilies.Thai,
  'tr': LocalizedFontFamilies.EastEuropean,
  'uk': LocalizedFontFamilies.Cyrillic,
  'vi': LocalizedFontFamilies.Vietnamese,
  'zh-hans': LocalizedFontFamilies.ChineseSimplified,
  'zh-hant': LocalizedFontFamilies.ChineseTraditional,
};

// Standard font sizes.
export namespace FontSizes {
  export const mini = '10px';
  export const xSmall = '11px';
  export const small = '12px';
  export const smallPlus = '13px';
  export const medium = '14px';
  export const mediumPlus = '15px';
  export const icon = '16px';
  export const large = '17px';
  export const xLarge = '21px';
  export const xxLarge = '28px';
  export const superLarge = '42px';
  export const mega = '72px';
}

// Standard font weights.
export namespace FontWeights {
  export const light = 100;
  export const semilight = 300;
  export const regular = 400;
  export const semibold = 600;
  export const bold = 700;
}

// Standard Icon Sizes.
export namespace IconFontSizes {
  export const xSmall = '10px';
  export const small = '12px';
  export const medium = '16px';
  export const large = '20px';
}

function _fontFamilyWithFallbacks(fontFamily: string): string {
  return `${fontFamily}, ${FontFamilyFallbacks}`;
}

export function createFontStyles(localeCode: string | null): IFontStyles {
  const localizedFont = _getLocalizedFont(localeCode);
  let fontFamily: string | undefined;
  let semilightFontFamily: string | undefined;

  if (localizedFont) {
    fontFamily = semilightFontFamily = _fontFamilyWithFallbacks(localizedFont);
  } else {
    fontFamily = _fontFamilyWithFallbacks(defaultFontFamily);
    semilightFontFamily = _fontFamilyWithFallbacks(LocalizedFontFamilies.WestEuropean);
  }

  const fontStyles = {
    tiny: _createFont(FontSizes.mini, FontWeights.semibold, fontFamily),
    xSmall: _createFont(FontSizes.xSmall, FontWeights.regular, fontFamily),
    small: _createFont(FontSizes.small, FontWeights.regular, fontFamily),
    smallPlus: _createFont(FontSizes.smallPlus, FontWeights.regular, fontFamily),
    medium: _createFont(FontSizes.medium, FontWeights.regular, fontFamily),
    mediumPlus: _createFont(FontSizes.mediumPlus, FontWeights.regular, fontFamily),
    large: _createFont(FontSizes.large, FontWeights.semilight, semilightFontFamily),
    xLarge: _createFont(FontSizes.xLarge, FontWeights.light, fontFamily),
    xxLarge: _createFont(FontSizes.xxLarge, FontWeights.light, fontFamily),
    superLarge: _createFont(FontSizes.superLarge, FontWeights.light, fontFamily),
    mega: _createFont(FontSizes.mega, FontWeights.light, fontFamily)
  };

  return fontStyles;
}

/**
 * If there is a localized font for this language, return that. Returns undefined if there is no localized font for that language.
 */
function _getLocalizedFont(language: string | null): string | undefined {
  for (let lang in LanguageToFontMap) {
    if (LanguageToFontMap.hasOwnProperty(lang) && language && lang.indexOf(language) === 0) {
      // tslint:disable-next-line:no-any
      return (LanguageToFontMap as any)[lang];
    }
  }

  return undefined;
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
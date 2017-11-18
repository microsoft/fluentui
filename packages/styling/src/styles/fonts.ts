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
  export const ChineseSimplified = `'Microsoft Yahei', Verdana, Simsun`;
  export const ChineseTraditional = `'Microsoft Jhenghei', Pmingliu`;
  export const Cyrillic = `'${LocalizedFontNames.Cyrillic}'`;
  export const EastEuropean = `'${LocalizedFontNames.EastEuropean}'`;
  export const Greek = `'${LocalizedFontNames.Greek}'`;
  export const Hebrew = `'${LocalizedFontNames.Hebrew}'`;
  export const Hindi = `'Nirmala UI'`;
  export const Japanese = `'Yu Gothic', 'Meiryo UI', Meiryo, 'MS Pgothic', Osaka`;
  export const Korean = `'Malgun Gothic', Gulim`;
  export const Selawik = `'${LocalizedFontNames.Selawik}'`;
  export const Thai = `'Leelawadee UI Web', 'Kmer UI'`;
  export const Vietnamese = `'${LocalizedFontNames.Vietnamese}'`;
  export const WestEuropean = `'${LocalizedFontNames.WestEuropean}'`;
}

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

export function createFontStyles(localeCode: string | null): IFontStyles {
  return {
    tiny: _createFont(FontSizes.mini, FontWeights.semibold, localeCode),
    xSmall: _createFont(FontSizes.xSmall, FontWeights.regular, localeCode),
    small: _createFont(FontSizes.small, FontWeights.regular, localeCode),
    smallPlus: _createFont(FontSizes.smallPlus, FontWeights.regular, localeCode),
    medium: _createFont(FontSizes.medium, FontWeights.regular, localeCode),
    mediumPlus: _createFont(FontSizes.mediumPlus, FontWeights.regular, localeCode),
    large: _createFont(FontSizes.large, FontWeights.semilight, localeCode),
    xLarge: _createFont(FontSizes.xLarge, FontWeights.light, localeCode),
    xxLarge: _createFont(FontSizes.xxLarge, FontWeights.light, localeCode),
    superLarge: _createFont(FontSizes.superLarge, FontWeights.light, localeCode),
    mega: _createFont(FontSizes.mega, FontWeights.light, localeCode)
  };
}

function _getFontFamily(language: string | null): string {
  let fontFamily = LocalizedFontFamilies.WestEuropean;

  for (let lang in LanguageToFontMap) {
    if (LanguageToFontMap.hasOwnProperty(lang) && language && lang.indexOf(language) === 0) {
      // tslint:disable-next-line:no-any
      fontFamily = (LanguageToFontMap as any)[lang];
      break;
    }
  }

  return `${fontFamily}, ${FontFamilyFallbacks}`;
}

function _createFont(size: string, weight: IFontWeight, localeCode: string | null): IRawStyle {
  return {
    fontFamily: _getFontFamily(localeCode),
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    fontSize: size,
    fontWeight: weight
  };
}
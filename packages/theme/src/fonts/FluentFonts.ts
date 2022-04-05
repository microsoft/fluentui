import type { IFontWeight } from '@fluentui/merge-styles';

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
  export const Armenian = 'Segoe UI Web (Armenian)';
  export const Georgian = 'Segoe UI Web (Georgian)';
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
  export const Armenian = `'${LocalizedFontNames.Armenian}'`;
  export const Georgian = `'${LocalizedFontNames.Georgian}'`;
}

// Standard font sizes.
export namespace FontSizes {
  export const size10 = '10px';
  export const size12 = '12px';
  export const size14 = '14px';
  export const size16 = '16px';
  export const size18 = '18px';
  export const size20 = '20px';
  export const size24 = '24px';
  export const size28 = '28px';
  export const size32 = '32px';
  export const size42 = '42px';
  export const size68 = '68px';

  export const mini: string = '10px';
  export const xSmall: string = '10px';
  export const small: string = '12px';
  export const smallPlus: string = '12px';
  export const medium: string = '14px';
  export const mediumPlus: string = '16px';
  export const icon: string = '16px';
  export const large: string = '18px';
  export const xLarge: string = '20px';
  export const xLargePlus: string = '24px';
  export const xxLarge: string = '28px';
  export const xxLargePlus: string = '32px';
  export const superLarge: string = '42px';
  export const mega: string = '68px';
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

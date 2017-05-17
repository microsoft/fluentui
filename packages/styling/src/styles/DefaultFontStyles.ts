import { IFontStyles, IRawStyle } from '../interfaces/index';
import { fontFace } from '../glamorExports';

const FONT_BASE_URL: string = 'https://static2.sharepointonline.com/files/fabric/assets/fonts/segoeui-westeuropean';
const ICON_BASE_URL: string = 'https://static2.sharepointonline.com/files/fabric/assets/icons';

const SYSTEM_BASE: string = '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif';
const FAMILY_BASE: string = '"Segoe UI WestEuropean", ' + SYSTEM_BASE;

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

export namespace FontWeights {
  export const light: number = 100;
  export const semilight: number = 300;
  export const regular: number = 400;
  export const semibold: number = 600;
  export const bold: number = 700;
}

export const DefaultFontStyles: IFontStyles = {
  tiny: _createFont(FontSizes.mini, FontWeights.semibold),
  xSmall: _createFont(FontSizes.xSmall, FontWeights.regular),
  small: _createFont(FontSizes.small, FontWeights.regular),
  smallPlus: _createFont(FontSizes.smallPlus, FontWeights.regular),
  medium: _createFont(FontSizes.medium, FontWeights.regular),
  mediumPlus: _createFont(FontSizes.mediumPlus, FontWeights.regular),
  large: _createFont(FontSizes.large, FontWeights.semilight),
  xLarge: _createFont(FontSizes.xLarge, FontWeights.light),
  xxLarge: _createFont(FontSizes.xxLarge, FontWeights.light),
  superLarge: _createFont(FontSizes.superLarge, FontWeights.light),
  mega: _createFont(FontSizes.mega, FontWeights.light),
  icon: {
    fontFamily: '"FabricMDL2Icons"',
    fontWeight: FontWeights.regular,
    fontStyle: 'normal'
  }
};

function _createFont(size: string, weight: number): IRawStyle {
  return {
    fontFamily: FAMILY_BASE,
    WebkitFontSmoothing: 'antialiased',
    fontSize: size,
    fontWeight: weight
  };
}

function _registerFontFace(
  fontFamily: string,
  fontName: string,
  baseUrl: string,
  fontFileName: string,
  fontWeight: number
): void {
  fontFace({
    fontFamily,
    src:
    `local('${fontName}'),` +
    `url('${baseUrl}/${fontFileName}.woff2') format('woff2'),` +
    `url('${baseUrl}/${fontFileName}.woff') format('woff'),` +
    `url('${baseUrl}/${fontFileName}.ttf') format('truetype')`,
    fontWeight,
    fontStyle: 'normal'
  });
}

[
  'Arabic',
  'Cyrillic',
  'EastEuropean',
  'Greek',
  'Hebrew',
  'Vietnamese',
  'WestEuropean'
].forEach((language: string) => {

  _registerFontFace(
    `'Segoe UI${language ? ' ' + language : ''}'`,
    'Segoe UI Light',
    FONT_BASE_URL,
    'segoeui-light',
    FontWeights.light
  );

  _registerFontFace(
    `'Segoe UI${language ? ' ' + language : ''}'`,
    'Segoe UI Semilight',
    FONT_BASE_URL,
    'segoeui-semilight',
    200
  );

  _registerFontFace(
    `'Segoe UI${language ? ' ' + language : ''}'`,
    'Segoe UI',
    FONT_BASE_URL,
    'segoeui-regular',
    FontWeights.regular
  );

  _registerFontFace(
    `'Segoe UI${language ? ' ' + language : ''}'`,
    'Segoe UI Semibold',
    FONT_BASE_URL,
    'segoeui-semibold',
    FontWeights.semibold
  );
});

// Icon font
_registerFontFace(
  'FabricMDL2Icons',
  'FabricMDL2Icons',
  ICON_BASE_URL,
  'fabricmdl2icons',
  FontWeights.regular
);

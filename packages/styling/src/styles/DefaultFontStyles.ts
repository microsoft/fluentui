import { IFontStyles, IRawStyle } from '../interfaces/index';
import { fontFace } from '../glamorExports';

const FONT_BASE_URL = 'https://static2.sharepointonline.com/files/fabric/assets/fonts/segoeui-westeuropean';
const ICON_BASE_URL = 'https://static2.sharepointonline.com/files/fabric/assets/icons';

const SYSTEM_BASE = '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif';
const FAMILY_BASE = '"Segoe UI WestEuropean", ' + SYSTEM_BASE;

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

export namespace FontWeights {
  export const light = 100;
  export const semilight = 300;
  export const regular = 400;
  export const semibold = 600;
  export const bold = 700;
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

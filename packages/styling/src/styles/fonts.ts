import { fontFace, CSSProperties } from 'glamor';

const FONT_BASE_URL: string = 'https://static2.sharepointonline.com/files/fabric/assets/fonts/segoeui-westeuropean';
const ICON_BASE_URL: string = 'https://static2.sharepointonline.com/files/fabric/assets/icons';

const systemBase: string = '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif';
const familyBase: string = '"Segoe UI WestEuropean", ' + systemBase;

const lightWeight: number = 100;
const semilightWeight: number = 300;
const regularWeight: number = 400;
const semiboldWeight: number = 600;

const miniSize: string = '10px';
const xSmallSize: string = '11px';
const smallSize: string = '12px';
const smallPlusSize: string = '13px';
const mediumSize: string = '14px';
const mediumPlusSize: string = '15px';
const largeSize: string = '17px';
const xLargeSize: string = '21px';
const xxLargeSize: string = '28px';
const superSize: string = '42px';
const megaSize: string = '72px';

export interface IFonts {
  tiny?: CSSProperties;
  xSmall?: CSSProperties;
  small?: CSSProperties;
  smallPlus?: CSSProperties;
  medium?: CSSProperties;
  mediumPlus?: CSSProperties;
  large?: CSSProperties;
  xLarge?: CSSProperties;
  xxLarge?: CSSProperties;
  superLarge?: CSSProperties;
  mega?: CSSProperties;
}

export const fonts: IFonts = {
  tiny: _createFont(miniSize, semiboldWeight),
  xSmall: _createFont(xSmallSize, regularWeight),
  small: _createFont(smallSize, regularWeight),
  smallPlus: _createFont(smallPlusSize, regularWeight),
  medium: _createFont(mediumSize, regularWeight),
  mediumPlus: _createFont(mediumPlusSize, regularWeight),
  large: _createFont(largeSize, semilightWeight),
  xLarge: _createFont(xLargeSize, lightWeight),
  xxLarge: _createFont(xxLargeSize, lightWeight),
  superLarge: _createFont(superSize, lightWeight),
  mega: _createFont(megaSize, lightWeight)
};

export const iconFont: CSSProperties = {
  fontFamily: '"FabricMDL2Icons"',
  fontWeight: regularWeight,
  fontStyle: 'normal'
};

function _createFont(size: string, weight: number): CSSProperties {
  return {
    fontFamily: familyBase,
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
    lightWeight
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
    regularWeight
  );

  _registerFontFace(
    `'Segoe UI${language ? ' ' + language : ''}'`,
    'Segoe UI Semibold',
    FONT_BASE_URL,
    'segoeui-semibold',
    semiboldWeight
  );
});

// Icon font
_registerFontFace(
  'FabricMDL2Icons',
  'FabricMDL2Icons',
  ICON_BASE_URL,
  'fabricmdl2icons',
  regularWeight
);

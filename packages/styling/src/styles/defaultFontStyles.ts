import { fontFace, CSSProperties } from 'glamor';

const FONT_BASE_URL: string = 'https://static2.sharepointonline.com/files/fabric/assets/fonts/segoeui-westeuropean';
const ICON_BASE_URL: string = 'https://static2.sharepointonline.com/files/fabric/assets/icons';

const SYSTEM_BASE: string = '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif';
const FAMILY_BASE: string = '"Segoe UI WestEuropean", ' + SYSTEM_BASE;

const LIGHT_WEIGHT: number = 100;
const SEMILIGHT_WEIGHT: number = 300;
const REGULAR_WEIGHT: number = 400;
const SEMIBOLD_WEIGHT: number = 600;

const MINI_SIZE: string = '10px';
const X_SMALL_SIZE: string = '11px';
const SMALL_SIZE: string = '12px';
const SMALL_PLUS_SIZE: string = '13px';
const MEDIUM_SIZE: string = '14px';
const MEDIUM_PLUS_SIZE: string = '15px';
const LARGE_SIZE: string = '17px';
const X_LARGE_SIZE: string = '21px';
const XX_LARGE_SIZE: string = '28px';
const SUPER_SIZE: string = '42px';
const MEGA_SIZE: string = '72px';

/**
 * UI Fabric font set.
 */
export interface IFontStyles {
  [index: string]: CSSProperties;
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
  icon?: CSSProperties;
}

export const defaultFontStyles: IFontStyles = {
  tiny: _createFont(MINI_SIZE, SEMIBOLD_WEIGHT),
  xSmall: _createFont(X_SMALL_SIZE, REGULAR_WEIGHT),
  small: _createFont(SMALL_SIZE, REGULAR_WEIGHT),
  smallPlus: _createFont(SMALL_PLUS_SIZE, REGULAR_WEIGHT),
  medium: _createFont(MEDIUM_SIZE, REGULAR_WEIGHT),
  mediumPlus: _createFont(MEDIUM_PLUS_SIZE, REGULAR_WEIGHT),
  large: _createFont(LARGE_SIZE, SEMILIGHT_WEIGHT),
  xLarge: _createFont(X_LARGE_SIZE, LIGHT_WEIGHT),
  xxLarge: _createFont(XX_LARGE_SIZE, LIGHT_WEIGHT),
  superLarge: _createFont(SUPER_SIZE, LIGHT_WEIGHT),
  mega: _createFont(MEGA_SIZE, LIGHT_WEIGHT),
  icon: {
    fontFamily: '"FabricMDL2Icons"',
    fontWeight: REGULAR_WEIGHT,
    fontStyle: 'normal'
  }
};

function _createFont(size: string, weight: number): CSSProperties {
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
    LIGHT_WEIGHT
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
    REGULAR_WEIGHT
  );

  _registerFontFace(
    `'Segoe UI${language ? ' ' + language : ''}'`,
    'Segoe UI Semibold',
    FONT_BASE_URL,
    'segoeui-semibold',
    SEMIBOLD_WEIGHT
  );
});

// Icon font
_registerFontFace(
  'FabricMDL2Icons',
  'FabricMDL2Icons',
  ICON_BASE_URL,
  'fabricmdl2icons',
  REGULAR_WEIGHT
);

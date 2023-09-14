import { fontFace } from '@fluentui/merge-styles';
import { FontWeights, LocalizedFontFamilies, LocalizedFontNames } from './FluentFonts';
import { createFontStyles } from './createFontStyles';
import { getLanguage, getWindow } from '@fluentui/utilities';
import type { IFontWeight } from '@fluentui/merge-styles';
import type { IFontStyles } from '../types/IFontStyles';
import type { IFabricConfig } from '../types/IFabricConfig';

// Default urls.
const DefaultBaseUrl = 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/assets';

// Standard font styling.
export const DefaultFontStyles: IFontStyles = createFontStyles(getLanguage());

function _registerFontFace(fontFamily: string, url: string, fontWeight?: IFontWeight, localFontName?: string): void {
  fontFamily = `'${fontFamily}'`;

  const localFontSrc = localFontName !== undefined ? `local('${localFontName}'),` : '';

  fontFace({
    fontFamily,
    src: localFontSrc + `url('${url}.woff2') format('woff2'),` + `url('${url}.woff') format('woff')`,
    fontWeight,
    fontStyle: 'normal',
    fontDisplay: 'swap',
  });
}

function _registerFontFaceSet(
  baseUrl: string,
  fontFamily: string,
  cdnFolder: string,
  cdnFontName: string = 'segoeui',
  localFontName?: string,
): void {
  const urlBase = `${baseUrl}/${cdnFolder}/${cdnFontName}`;

  _registerFontFace(fontFamily, urlBase + '-light', FontWeights.light, localFontName && localFontName + ' Light');
  _registerFontFace(
    fontFamily,
    urlBase + '-semilight',
    FontWeights.semilight,
    localFontName && localFontName + ' SemiLight',
  );
  _registerFontFace(fontFamily, urlBase + '-regular', FontWeights.regular, localFontName);
  _registerFontFace(
    fontFamily,
    urlBase + '-semibold',
    FontWeights.semibold,
    localFontName && localFontName + ' SemiBold',
  );
  _registerFontFace(fontFamily, urlBase + '-bold', FontWeights.bold, localFontName && localFontName + ' Bold');
}

export function registerDefaultFontFaces(baseUrl: string): void {
  if (baseUrl) {
    const fontUrl = `${baseUrl}/fonts`;

    // Produce @font-face definitions for all supported web fonts.
    _registerFontFaceSet(fontUrl, LocalizedFontNames.Thai, 'leelawadeeui-thai', 'leelawadeeui');
    _registerFontFaceSet(fontUrl, LocalizedFontNames.Arabic, 'segoeui-arabic');
    _registerFontFaceSet(fontUrl, LocalizedFontNames.Cyrillic, 'segoeui-cyrillic');
    _registerFontFaceSet(fontUrl, LocalizedFontNames.EastEuropean, 'segoeui-easteuropean');
    _registerFontFaceSet(fontUrl, LocalizedFontNames.Greek, 'segoeui-greek');
    _registerFontFaceSet(fontUrl, LocalizedFontNames.Hebrew, 'segoeui-hebrew');
    _registerFontFaceSet(fontUrl, LocalizedFontNames.Vietnamese, 'segoeui-vietnamese');
    _registerFontFaceSet(fontUrl, LocalizedFontNames.WestEuropean, 'segoeui-westeuropean', 'segoeui', 'Segoe UI');
    _registerFontFaceSet(fontUrl, LocalizedFontFamilies.Selawik, 'selawik', 'selawik');
    _registerFontFaceSet(fontUrl, LocalizedFontNames.Armenian, 'segoeui-armenian');
    _registerFontFaceSet(fontUrl, LocalizedFontNames.Georgian, 'segoeui-georgian');

    // Leelawadee UI (Thai) does not have a 'light' weight, so we override
    // the font-face generated above to use the 'semilight' weight instead.
    _registerFontFace('Leelawadee UI Web', `${fontUrl}/leelawadeeui-thai/leelawadeeui-semilight`, FontWeights.light);

    // Leelawadee UI (Thai) does not have a 'semibold' weight, so we override
    // the font-face generated above to use the 'bold' weight instead.
    _registerFontFace('Leelawadee UI Web', `${fontUrl}/leelawadeeui-thai/leelawadeeui-bold`, FontWeights.semibold);
  }
}

/**
 * Reads the fontBaseUrl from window.FabricConfig.fontBaseUrl or falls back to a default.
 */
function _getFontBaseUrl(): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fabricConfig: IFabricConfig | undefined = (getWindow() as any)?.FabricConfig;

  return fabricConfig?.fontBaseUrl ?? DefaultBaseUrl;
}

/**
 * Register the font faces.
 */
registerDefaultFontFaces(_getFontBaseUrl());

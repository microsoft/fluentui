import * as React from 'react';
import { registerIcons, IIconOptions } from '@uifabric/styling';
import { FileTypeIconMap } from './FileTypeIconMap';

const PNG_SUFFIX = '_png';
const SVG_SUFFIX = '_svg';

const DEFAULT_BASE_URL = 'https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/';
const ICON_SIZES: number[] = [16, 20, 24, 32, 40, 48, 64, 96];

// Due to CDN cache, images updated in place may take up to a year to appear for some users
// (though most users will see them within a week). To force immediate refresh, append a
// unique string to the end of the URL. The CDN uses the URL as the cache key, so passing a
// new URL will cause the CDN to create a new cache key.
const REFRESH_STRING = '?v5';

export function initializeFileTypeIcons(baseUrl: string = DEFAULT_BASE_URL, options?: Partial<IIconOptions>): void {
  ICON_SIZES.forEach((size: number) => {
    _initializeIcons(baseUrl, size, options);
  });
}

function _initializeIcons(baseUrl: string, size: number, options?: Partial<IIconOptions>): void {
  const iconTypes: string[] = Object.keys(FileTypeIconMap);
  const fileTypeIcons: { [key: string]: JSX.Element } = {};

  iconTypes.forEach((type: string) => {
    fileTypeIcons[type + size + PNG_SUFFIX] = <img src={baseUrl + size + '/' + type + '.png' + REFRESH_STRING} />;
    fileTypeIcons[type + size + SVG_SUFFIX] = <img src={baseUrl + size + '/' + type + '.svg' + REFRESH_STRING} />;

    // For high resolution screens, register additional versions
    // Apply height=100% and width=100% to force image to fit into containing element

    // SVGs scale well, so you can generally use the default image.
    // 1.5x is a special case where both SVGs and PNGs need a different image.
    // Remove if statements when missing image files for 20_1.5x are provided.
    if (size !== 20) {
      fileTypeIcons[type + size + '_1.5x' + PNG_SUFFIX] = (
        <img src={baseUrl + size + '_1.5x/' + type + '.png' + REFRESH_STRING} height="100%" width="100%" />
      );
      fileTypeIcons[type + size + '_1.5x' + SVG_SUFFIX] = (
        <img src={baseUrl + size + '_1.5x/' + type + '.svg' + REFRESH_STRING} height="100%" width="100%" />
      );
    }

    fileTypeIcons[type + size + '_2x' + PNG_SUFFIX] = (
      <img src={baseUrl + size + '_2x/' + type + '.png' + REFRESH_STRING} height="100%" width="100%" />
    );
    fileTypeIcons[type + size + '_3x' + PNG_SUFFIX] = (
      <img src={baseUrl + size + '_3x/' + type + '.png' + REFRESH_STRING} height="100%" width="100%" />
    );
    fileTypeIcons[type + size + '_4x' + PNG_SUFFIX] = (
      <img src={baseUrl + size + '_4x/' + type + '.png' + REFRESH_STRING} height="100%" width="100%" />
    );
  });

  registerIcons(
    {
      fontFace: {},
      style: {
        width: size,
        height: size,
        overflow: 'hidden'
      },
      icons: fileTypeIcons
    },
    options
  );
}

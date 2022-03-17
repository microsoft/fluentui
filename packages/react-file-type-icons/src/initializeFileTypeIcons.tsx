import * as React from 'react';
import { registerIcons } from '@fluentui/style-utilities';
import { FileTypeIconMap } from './FileTypeIconMap';
import type { IIconOptions } from '@fluentui/style-utilities';

const PNG_SUFFIX = '_png';
const SVG_SUFFIX = '_svg';

export const DEFAULT_BASE_URL = 'https://spoppe-b.azureedge.net/files/fabric-cdn-prod_20220309.001/assets/item-types/';
export const ICON_SIZES: number[] = [16, 20, 24, 32, 40, 48, 64, 96];

export function initializeFileTypeIcons(baseUrl: string = DEFAULT_BASE_URL, options?: Partial<IIconOptions>): void {
  ICON_SIZES.forEach((size: number) => {
    _initializeIcons(baseUrl, size, options);
  });
}

function _initializeIcons(baseUrl: string, size: number, options?: Partial<IIconOptions>): void {
  const iconTypes: string[] = Object.keys(FileTypeIconMap);
  const fileTypeIcons: { [key: string]: JSX.Element } = {};

  iconTypes.forEach((type: string) => {
    const baseUrlSizeType = baseUrl + size + '/' + type;
    fileTypeIcons[type + size + PNG_SUFFIX] = <img src={baseUrlSizeType + '.png'} alt="" />;
    fileTypeIcons[type + size + SVG_SUFFIX] = <img src={baseUrlSizeType + '.svg'} alt="" />;

    // For high resolution screens, register additional versions
    // Apply height=100% and width=100% to force image to fit into containing element

    // SVGs scale well, so you can generally use the default image.
    // 1.5x is a special case where both SVGs and PNGs need a different image.

    fileTypeIcons[type + size + '_1.5x' + PNG_SUFFIX] = (
      <img src={baseUrl + size + '_1.5x/' + type + '.png'} height="100%" width="100%" alt="" />
    );
    fileTypeIcons[type + size + '_1.5x' + SVG_SUFFIX] = (
      <img src={baseUrl + size + '_1.5x/' + type + '.svg'} height="100%" width="100%" alt="" />
    );

    fileTypeIcons[type + size + '_2x' + PNG_SUFFIX] = (
      <img src={baseUrl + size + '_2x/' + type + '.png'} height="100%" width="100%" alt="" />
    );
    fileTypeIcons[type + size + '_3x' + PNG_SUFFIX] = (
      <img src={baseUrl + size + '_3x/' + type + '.png'} height="100%" width="100%" alt="" />
    );
    fileTypeIcons[type + size + '_4x' + PNG_SUFFIX] = (
      <img src={baseUrl + size + '_4x/' + type + '.png'} height="100%" width="100%" alt="" />
    );
  });

  registerIcons(
    {
      fontFace: {},
      style: {
        width: size,
        height: size,
        overflow: 'hidden',
      },
      icons: fileTypeIcons,
      mergeImageProps: true,
    },
    options,
  );
}

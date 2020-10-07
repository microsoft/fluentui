import * as React from 'react';
import { registerIcons, IIconOptions } from '@uifabric/styling';
import { FileTypeIconMap } from './FileTypeIconMap';

const PNG_SUFFIX = '_png';
const SVG_SUFFIX = '_svg';

const DEFAULT_BASE_URL = 'https://spoprod-a.akamaihd.net/files/fabric-cdn-prod_20200921.001/assets/item-types/';
const ICON_SIZES: number[] = [16, 20, 24, 32, 40, 48, 64, 96];

const _fileTypeIconsAsString: { [iconName: string]: string } = {};

export function initializeFileTypeIcons(baseUrl: string = DEFAULT_BASE_URL, options?: Partial<IIconOptions>): void {
  ICON_SIZES.forEach((size: number) => {
    _initializeIcons(baseUrl, size, options);
  });
}

export function getFileTypeIconsAsHTMLStrings(iconName: string): string | undefined {
  if (_fileTypeIconsAsString.hasOwnProperty(iconName)) {
    return _fileTypeIconsAsString[iconName];
  }
}

function _initializeIcons(baseUrl: string, size: number, options?: Partial<IIconOptions>): void {
  const iconTypes: string[] = Object.keys(FileTypeIconMap);
  const fileTypeIcons: { [key: string]: JSX.Element } = {};

  iconTypes.forEach((type: string) => {
    const baseUrlSizeType = baseUrl + size + '/' + type;
    let src: string;
    let iconName: string;

    src = `{${baseUrlSizeType} + '.png'}`;
    iconName = type + size + PNG_SUFFIX;
    fileTypeIcons[iconName] = <img src={src} alt="" />;
    _fileTypeIconsAsString[iconName] = `<img src="${src}" alt="" />`;

    src = `{${baseUrlSizeType} + '.svg'}`;
    iconName = type + size + SVG_SUFFIX;
    fileTypeIcons[iconName] = <img src={src} alt="" />;
    _fileTypeIconsAsString[iconName] = `<img src="${src}" alt="" />`;

    // For high resolution screens, register additional versions
    // Apply height=100% and width=100% to force image to fit into containing element

    // SVGs scale well, so you can generally use the default image.
    // 1.5x is a special case where both SVGs and PNGs need a different image.

    iconName = type + size + '_1.5x' + PNG_SUFFIX;
    src = `{${baseUrl} + ${size} + _1.5x/ + ${type} + .png}`;
    fileTypeIcons[iconName] = <img src={src} height="100%" width="100%" />;
    _fileTypeIconsAsString[iconName] = `<img src="${src}" height="100%" width="100%" />`;

    iconName = type + size + '_1.5x' + SVG_SUFFIX;
    src = `{${baseUrl} + ${size} + _1.5x/ + ${type} + .svg}`;
    fileTypeIcons[iconName] = <img src={src} height="100%" width="100%" />;
    _fileTypeIconsAsString[iconName] = `<img src="${src}" height="100%" width="100%" />`;

    iconName = type + size + '_2x' + PNG_SUFFIX;
    src = `{${baseUrl} + ${size} + _2x/ + ${type} + .png}`;
    fileTypeIcons[iconName] = <img src={src} height="100%" width="100%" />;
    _fileTypeIconsAsString[iconName] = `<img src={src} height="100%" width="100%" />`;

    iconName = type + size + '_3x' + PNG_SUFFIX;
    src = `{${baseUrl} + ${size} + _3x/ + ${type} + .png}`;
    fileTypeIcons[iconName] = <img src={src} height="100%" width="100%" />;
    _fileTypeIconsAsString[iconName] = `<img src="${src}" height="100%" width="100%" />`;

    iconName = type + size + '_4x' + PNG_SUFFIX;
    src = `{${baseUrl} + ${size} + _4x/ + ${type} + .png}`;
    fileTypeIcons[iconName] = <img src={src} height="100%" width="100%" />;
    _fileTypeIconsAsString[iconName] = `<img src="${src}" height="100%" width="100%" />`;
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
    },
    options,
  );
}

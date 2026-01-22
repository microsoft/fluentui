import * as React from 'react';
import { registerIcons, FLUENT_CDN_BASE_URL } from '@fluentui/style-utilities';
import { FileTypeIconMap } from './FileTypeIconMap';
import type { IIconOptions } from '@fluentui/style-utilities';
import type { JSXElement } from '@fluentui/utilities';

const PNG_SUFFIX = '_png';
const SVG_SUFFIX = '_svg';

export const DEFAULT_BASE_URL = `${FLUENT_CDN_BASE_URL}/assets/item-types/`;
export const ICON_SIZES: number[] = [16, 20, 24, 32, 40, 48, 64, 96];

// Module-level state to track the configured base URL
let _configuredBaseUrl: string | undefined;

/**
 * Returns the configured base URL if `initializeFileTypeIcons` was called with a custom URL,
 * otherwise returns the default CDN base URL.
 * This is used internally by FileTypeIcon component and utility functions.
 */
export function getConfiguredBaseUrl(): string {
  return _configuredBaseUrl ?? DEFAULT_BASE_URL;
}

/**
 * Resets the configured base URL to undefined, causing `getConfiguredBaseUrl` to return
 * the default CDN base URL. This is primarily intended for testing purposes.
 */
export function resetConfiguredBaseUrl(): void {
  _configuredBaseUrl = undefined;
}

export function initializeFileTypeIcons(baseUrl: string = DEFAULT_BASE_URL, options?: Partial<IIconOptions>): void {
  // Store the configured base URL for use by v9 components and utilities
  _configuredBaseUrl = baseUrl;

  ICON_SIZES.forEach((size: number) => {
    _initializeIcons(baseUrl, size, options);
  });
}

function _initializeIcons(baseUrl: string, size: number, options?: Partial<IIconOptions>): void {
  const iconTypes: string[] = Object.keys(FileTypeIconMap);
  const fileTypeIcons: { [key: string]: JSXElement } = {};

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

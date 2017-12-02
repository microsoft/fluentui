// tslint:disable:max-line-length

import * as React from 'react';
import { registerIcons } from '@uifabric/styling/lib/index';
import { FileTypeIconMap } from './FileTypeIconMap';

const PNG_SUFFIX: string = '_png';
const SVG_SUFFIX: string = '_svg';

export function initializeIcons(baseUrl: string = '', size: number): void {
  const iconTypes: string[] = Object.keys(FileTypeIconMap);

  const fileTypeIcons: {[key: string]: JSX.Element} = {};

  iconTypes.forEach(type => {
    fileTypeIcons[type + size + PNG_SUFFIX] = <img src={ baseUrl + size + '/' + type + '.png' }/>
    fileTypeIcons[type + size + SVG_SUFFIX] = <img src={ baseUrl + size + '/' + type + '.svg' }/>

    // For high resolution screens, register additional versions
    // Apply height=100% and width=100% to force image to fit into containing element

    // SVGs scale well, so you can generally use the default image.
    // 1.5x is a special case where both SVGs and PNGs need a different image.
    // Remove if statements when missing image files for sizes 20 and 40 are provided.
    if (size !== 20) {
      fileTypeIcons[type + size + '_1.5x' + PNG_SUFFIX] = <img src={ baseUrl + size + '_1.5x/' + type + '.png' } height='100%' width='100%'/>
      if (size !== 40) {
        fileTypeIcons[type + size + '_1.5x' + SVG_SUFFIX] = <img src={ baseUrl + size + '_1.5x/' + type + '.svg' } height='100%' width='100%'/>
      }
    }

    fileTypeIcons[type + size + '_2x' + PNG_SUFFIX] = <img src={ baseUrl + size + '_2x/' + type + '.png' } height='100%' width='100%'/>
    fileTypeIcons[type + size + '_3x' + PNG_SUFFIX] = <img src={ baseUrl + size + '_3x/' + type + '.png' } height='100%' width='100%'/>
    fileTypeIcons[type + size + '_4x' + PNG_SUFFIX] = <img src={ baseUrl + size + '_4x/' + type + '.png' } height='100%' width='100%'/>
  });

  registerIcons({
    fontFace: {},
    ​style: {
      width: size,
      height: size,
      overflow:'hidden'
    },
    icons: fileTypeIcons
  });
}

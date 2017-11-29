// tslint:disable:max-line-length

import * as React from 'react';
import { registerIcons } from '@uifabric/styling/lib/index';
import FileTypeIconMap from './FileTypeIconMap';

export function initializeIcons(baseUrl: string = '', size: number): void {
  const iconTypes: string[] = Object.keys(FileTypeIconMap);

  const fileTypeIcons: {[key: string]: JSX.Element} = {};

  iconTypes.forEach(type => {
    fileTypeIcons[type + size] = <img src={ baseUrl + size + '/' + type + '.png' }/>
    // For high resolution screens, also register the 2x versions of each icon type and size.
    // Apply height=100% and width=100% to force image to fit into containing element
    fileTypeIcons[type + size + '_2x'] = <img src={ baseUrl + size + '_2x/' + type + '.png' } height='100%' width='100%'/>
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

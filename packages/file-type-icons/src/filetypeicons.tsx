// tslint:disable:max-line-length

import * as React from 'react';
import { registerIcons } from '@uifabric/styling/lib/index';
import FileTypeIconMap from './FileTypeIconMap';

export function initializeIcons(baseUrl: string = '', size: number): void {
  const iconTypes: string[] = Object.keys(FileTypeIconMap);

  const fileTypeIcons: {[key: string]: JSX.Element} = {};

  iconTypes.forEach(type => {
    fileTypeIcons[type + size] = <img src={ baseUrl + size + '/' + type + '.png' } />
    // For high resolution screens, also register the 2x versions of each icon type and size.
    fileTypeIcons[type + size + '_2x'] = <img src={ baseUrl + size + '_2x/' + type + '.png' } />
  });

  registerIcons({
    icons: fileTypeIcons
  });
}

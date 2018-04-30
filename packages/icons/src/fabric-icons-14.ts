// Your use of the content in the files referenced here is subject to the terms of the license at https://aka.ms/fabric-assets-license

// tslint:disable:max-line-length

import { IIconOptions, IIconSubset, registerIcons } from '@uifabric/styling/lib/index';

export function initializeIcons(baseUrl: string = '', options?: IIconOptions): void {
  const subset: IIconSubset = {
    style: {
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      fontStyle: 'normal',
      fontWeight: 'normal',
      speak: 'none'
    },
    fontFace: {
      fontFamily: `"FabricMDL2Icons-14"`,
      src: `url('${baseUrl}fabric-icons-14-cf85ed5b.woff') format('woff')`
    },
    icons: {
      PublishCourse: '\uF699',
      DictionaryRemove: '\uF69A',
      UserRemove: '\uF69B',
      UserEvent: '\uF69C',
      Encryption: '\uF69D'
    }
  };

  registerIcons(subset, options);
}

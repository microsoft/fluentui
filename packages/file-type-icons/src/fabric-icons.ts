// tslint:disable:max-line-length

import { registerIcons } from '@uifabric/styling/lib/index';

export function initializeIcons(baseUrl: string = ''): void {
  registerIcons({
    style: {
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      fontStyle: 'normal',
      fontWeight: 'normal',
      speak: 'none'
    },
    fontFace: {
      fontFamily: `"FabricMDL2Icons"`,
      src: `url('${baseUrl}fabric-icons-4ac62dd2.woff') format('woff')`, 
    },
    icons: {
      'TestIcon1': '\uE700',
      'TestIcon2': '\uE70D',
      'TestIcon3': '\uE70E'
    }
  });
}

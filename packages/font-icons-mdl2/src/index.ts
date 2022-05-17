import { initializeIcons as i } from './fabric-icons';
import { initializeIcons as i0 } from './fabric-icons-0';
import { initializeIcons as i1 } from './fabric-icons-1';
import { initializeIcons as i2 } from './fabric-icons-2';
import { initializeIcons as i3 } from './fabric-icons-3';
import { initializeIcons as i4 } from './fabric-icons-4';
import { initializeIcons as i5 } from './fabric-icons-5';
import { initializeIcons as i6 } from './fabric-icons-6';
import { initializeIcons as i7 } from './fabric-icons-7';
import { initializeIcons as i8 } from './fabric-icons-8';
import { initializeIcons as i9 } from './fabric-icons-9';
import { initializeIcons as i10 } from './fabric-icons-10';
import { initializeIcons as i11 } from './fabric-icons-11';
import { initializeIcons as i12 } from './fabric-icons-12';
import { initializeIcons as i13 } from './fabric-icons-13';
import { initializeIcons as i14 } from './fabric-icons-14';
import { initializeIcons as i15 } from './fabric-icons-15';
import { initializeIcons as i16 } from './fabric-icons-16';
import { initializeIcons as i17 } from './fabric-icons-17';

import { IIconOptions } from '@fluentui/style-utilities';
import { registerIconAliases } from './iconAliases';
import { getWindow } from '@fluentui/utilities';
const DEFAULT_BASE_URL = 'https://spoppe-b.azureedge.net/files/fabric-cdn-prod_20210407.001/assets/icons/';

/*
 * The Window variable has the iconBaseUrl prop in order to allow for users to redirect icon font downloads to a new
 * URL. The config can be burned on the page to ensure there are no race conditions which might load resources on
 * script load.
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    /**
     * The FabricConfig options can be burned on the page prior to script load to provide
     * alternative defaults at script load time. This helps avoid race conditions by calling
     * `initializeIcons` too late, or in cases where you can't control the `initializeIcons` call,
     * such as using the pre-created Fluent bundle.
     */
    FabricConfig?: {
      /**
       * Controls the base url of the font files. This is useful for scenarios where the fonts
       * are stored on a private CDN other than the default SharePoint CDN.
       */
      fontBaseUrl?: string;

      /**
       * Controls the base url of the icon font files. This is useful for scenarios where the icons
       * are stored on a private CDN other than the default SharePoint CDN. Note that in prior
       * iterations, `fontBaseUrl` was used to control both font and icon base urls. While you can
       * still use `fontBaseUrl` to provide a single base url for both, the `iconBaseUrl` will be
       * used first if available.
       */
      iconBaseUrl?: string;
    };
  }
}

const win = getWindow();

export function initializeIcons(
  baseUrl: string = win?.FabricConfig?.iconBaseUrl || win?.FabricConfig?.fontBaseUrl || DEFAULT_BASE_URL,
  options?: IIconOptions,
): void {
  [
    i,
    i0,
    i1,
    i2,
    i3,
    i4,
    i5,
    i6,
    i7,
    i8,
    i9,
    i10,
    i11,
    i12,
    i13,
    i14,
    i15,
    i16,
    i17,
  ].forEach((initialize: (url: string, options?: IIconOptions) => void) => initialize(baseUrl, options));

  registerIconAliases();
}

// eslint-disable-next-line deprecation/deprecation
export { IconNames } from './IconNames';

import './version';

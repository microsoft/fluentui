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
const DEFAULT_BASE_URL = 'https://spoprod-a.akamaihd.net/files/fabric/assets/icons/';

export function initializeIcons(baseUrl: string = DEFAULT_BASE_URL, options?: IIconOptions): void {
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

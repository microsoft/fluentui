import { initializeIcons as i } from './fabricIcons';
import { initializeIcons as i0 } from './fabricIcons-0';
import { initializeIcons as i1 } from './fabricIcons-1';
import { initializeIcons as i2 } from './fabricIcons-2';
import { initializeIcons as i3 } from './fabricIcons-3';
import { initializeIcons as i4 } from './fabricIcons-4';
import { initializeIcons as i5 } from './fabricIcons-5';
import { initializeIcons as i6 } from './fabricIcons-6';
import { initializeIcons as i7 } from './fabricIcons-7';
import { initializeIcons as i8 } from './fabricIcons-8';
import { initializeIcons as i9 } from './fabricIcons-9';
import { initializeIcons as i10 } from './fabricIcons-10';
import { initializeIcons as i11 } from './fabricIcons-11';

const DEFAULT_BASE_URL = '';

export function initializeIcons(baseUrl: string = DEFAULT_BASE_URL): void {
  [i, i0, i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11].forEach(
    (initialize: (url: string) => void) => initialize(baseUrl)
  );
}
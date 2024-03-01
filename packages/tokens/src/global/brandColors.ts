import type { BrandVariants } from '../types';
import { createLightTheme, createDarkTheme } from '../utils';

export const brandWeb: BrandVariants = {
  10: `#061724`,
  20: `#082338`,
  30: `#0a2e4a`,
  40: `#0c3b5e`,
  50: `#0e4775`,
  60: `#0f548c`,
  70: `#115ea3`,
  80: `#0f6cbd`,
  90: `#2886de`,
  100: `#479ef5`,
  110: `#62abf5`,
  120: `#77b7f7`,
  130: `#96c6fa`,
  140: `#b4d6fa`,
  150: `#cfe4fa`,
  160: `#ebf3fc`,
};

export const brandTeams: BrandVariants = {
  10: `#2b2b40`,
  20: `#2f2f4a`,
  30: `#333357`,
  40: `#383966`,
  50: `#3d3e78`,
  60: `#444791`,
  70: `#4f52b2`,
  80: `#5b5fc7`,
  90: `#7579eb`,
  100: `#7f85f5`,
  110: `#9299f7`,
  120: `#aab1fa`,
  130: `#b6bcfa`,
  140: `#c5cbfa`,
  150: `#dce0fa`,
  160: `#e8ebfa`,
};

export const brandOffice: BrandVariants = {
  10: `#29130b`,
  20: `#4d2415`,
  30: `#792000`,
  40: `#99482b`,
  50: `#a52c00`,
  60: `#c33400`,
  70: `#e06a3f`,
  80: `#d83b01`,
  90: `#dd4f1b`,
  100: `#fe7948`,
  110: `#ff865a`,
  120: `#ff9973`,
  130: `#e8825d`,
  140: `#ffb498`,
  150: `#f4beaa`,
  160: `#f9dcd1`,
};

export const brandAzure: BrandVariants = {
  10: `#101b2f`,
  20: `#16243c`,
  30: `#1d2d4b`,
  40: `#24395d`,
  50: `#2a446f`,
  60: `#2a5087`,
  70: `#125ca9`,
  80: `#006ac6`,
  90: `#0d7bd7`,
  100: `#388ee2`,
  110: `#5da2ea`,
  120: `#79b2f0`,
  130: `#96c3f4`,
  140: `#afd2f8`,
  150: `#cce2fb`,
  160: `#e8f2fd`,
};

export const azureLightTheme = createLightTheme(brandAzure);
export const azureDarkTheme = createDarkTheme(brandAzure);

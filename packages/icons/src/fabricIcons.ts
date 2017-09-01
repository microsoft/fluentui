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
      fontFamily: `"FabricMDL2IconSet"`,
      src: `url('${baseUrl}fabricIcons.woff') format('woff')`,
    },
    icons: {
      'StatusCircleCheckmark': '\uF13E',
      'Cancel': '\uE711',
      'ChevronDown': '\uE70D',
      'ChevronLeft': '\uE76B',
      'ChevronRight': '\uE76C',
      'ChevronUp': '\uE70E',
      'SkypeCheck': '\uEF80',
      'SkypeClock': '\uEF81',
      'SkypeMinus': '\uEF82',
      'Clear': '\uE894',
      'Search': '\uE721',
      'FavoriteStar': '\uE734',
      'FavoriteStarFill': '\uE735',
      'AddFriend': '\uE8FA',
      'Tag': '\uE8EC',
      'More': '\uE712',
      'Ascending': '\uEDC0',
      'Descending': '\uEDC1',
      'Filter': '\uE71C',
      'Sort': '\uE8CB',
      'SortDown': '\uEE69',
      'SortLines': '\uE9D0',
      'SortUp': '\uEE68',
      'LargeGrid': '\uEECB',
      'List': '\uEA37',
      'View': '\uE890',
      'Add': '\uE710',
      'Download': '\uE896',
      'Calendar': '\uE787',
      'Edit': '\uE70F',
      'Embed': '\uECCE',
      'GlobalNavButton': '\uE700',
      'Info': '\uE946',
      'Mail': '\uE715',
      'Settings': '\uE713',
      'Share': '\uE72D',
      'Tiles': '\uECA5',
      'Upload': '\uE898',
      'CircleRing': '\uEA3A',
      'CheckMark': '\uE73E'
    }
  });
}

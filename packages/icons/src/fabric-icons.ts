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
      src: `url('${baseUrl}fabric-icons-f968c9c4.woff') format('woff')`,
    },
icons: {
        'GlobalNavButton': '\uE700',
          'ChevronDown': '\uE70D',
          'ChevronUp': '\uE70E',
          'Edit': '\uE70F',
          'Add': '\uE710',
          'Cancel': '\uE711',
          'More': '\uE712',
          'Settings': '\uE713',
          'Mail': '\uE715',
          'Filter': '\uE71C',
          'Search': '\uE721',
          'Share': '\uE72D',
          'FavoriteStar': '\uE734',
          'FavoriteStarFill': '\uE735',
          'CheckMark': '\uE73E',
          'Delete': '\uE74D',
          'ChevronLeft': '\uE76B',
          'ChevronRight': '\uE76C',
          'Calendar': '\uE787',
          'Undo': '\uE7A7',
          'Flag': '\uE7C1',
          'View': '\uE890',
          'Clear': '\uE894',
          'Download': '\uE896',
          'Upload': '\uE898',
          'Sort': '\uE8CB',
          'Tag': '\uE8EC',
          'AddFriend': '\uE8FA',
          'Info': '\uE946',
          'SortLines': '\uE9D0',
          'List': '\uEA37',
          'CircleRing': '\uEA3A',
          'Tiles': '\uECA5',
          'Embed': '\uECCE',
          'Ascending': '\uEDC0',
          'Descending': '\uEDC1',
          'SortUp': '\uEE68',
          'SortDown': '\uEE69',
          'LargeGrid': '\uEECB',
          'SkypeCheck': '\uEF80',
          'SkypeClock': '\uEF81',
          'SkypeMinus': '\uEF82',
          'StatusCircleCheckmark': '\uF13E',
          'MoreVertical': '\uF2BC'
    }
  });
}

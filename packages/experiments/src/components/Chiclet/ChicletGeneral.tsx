import * as React from 'react';
// import { BaseComponent, classNamesFunction } from '../../Utilities';
// import { IChicletXsmallStyles, IChicletXsmallStyleProps } from './ChicletXsmall.types';
// import { IChicletCardStyles, IChicletCardStyleProps, IChicletCardProps } from './ChicletCard.types';
// import { Image } from 'office-ui-fabric-react/lib/Image';

const ASSET_CDN_BASE_URL = 'https://static2.sharepointonline.com/files/fabric/assets';

export function renderIcon(itemType?: string, style?: string): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> | undefined {
  let src;
  let icon;

  if (itemType !== null) {
    src = `${ASSET_CDN_BASE_URL}/brand-icons/product/svg/` + itemType + `_16x1_5.svg`;
    icon = <img className={style} src={src} />;
    switch (
      itemType // for "hero" apps, we'll use the app icons
    ) {
      case 'word':
      case 'docx':
        icon = <img className={style} src={`${ASSET_CDN_BASE_URL}/brand-icons/product/svg/word_16x1_5.svg`} />;
        break;
      case 'powerpoint':
      case 'pptx':
        icon = <img className={style} src={`${ASSET_CDN_BASE_URL}/brand-icons/product/svg/powerpoint_16x1_5.svg`} />;
        break;
      case 'excel':
        icon = <img className={style} src={`${ASSET_CDN_BASE_URL}/brand-icons/product/svg/excel_16x1_5.svg`} />;
        break;
      default:
        icon = undefined;
        break;
    }
  }
  return icon;
}

import * as React from 'react';
import { Image } from 'office-ui-fabric-react/lib/Image';

const ASSET_CDN_BASE_URL = 'https://static2.sharepointonline.com/files/fabric/assets';

export function renderPreview(
  imageUrl?: string,
  imageHeight?: string,
  imageWidth?: string,
  imageAlt?: string
): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> | undefined {
  let image;
  if (imageUrl) {
    image = <Image width={imageWidth} height={imageHeight} src={imageUrl} role="presentation" alt={imageAlt ? imageAlt : undefined} />;
  }
  return image;
}

export function renderIcon(
  itemType?: string,
  style?: string,
  imageProvided?: boolean
): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> | undefined {
  let src;
  let icon;

  if (itemType !== null && !imageProvided) {
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

export function htmlOut(
  props?: Object,
  classNames?: Object,
  imageProvided?: boolean
): React.ReactElement<React.HTMLAttributes<HTMLElement>> | undefined {
  return (
    <div tabIndex={tabIndex} role={role} onClick={this._onClick} className={this._classNames.root}>
      <div className={this._classNames.preview}>
        {renderPreview(image, imageHeight, imageWidth, imageAlt)}
        {renderIcon(itemType, this._classNames.icon, imageProvided)}
      </div>
      <div className={this._classNames.info}>
        <div className={this._classNames.title}>{title ? title : null}</div>
        <div className={this._classNames.url}>{url ? url : null}</div>
      </div>
      {footer}
    </div>
  );
}

import * as React from 'react';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { IChicletCardProps } from '../components/Chiclet/ChicletCard.types';

const ASSET_CDN_BASE_URL = 'https://static2.sharepointonline.com/files/fabric/assets';

export function renderPreview(
  imageUrl?: string,
  imageHeight?: string | number,
  imageWidth?: string | number,
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

  if (itemType && !imageProvided) {
    src = `${ASSET_CDN_BASE_URL}/brand-icons/product/svg/${itemType}_16x1_5.svg`;
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
      case 'xlsx':
        icon = <img className={style} src={`${ASSET_CDN_BASE_URL}/brand-icons/product/svg/excel_16x1_5.svg`} />;
        break;
      default:
        icon = undefined;
        break;
    }
  }
  return icon;
}

export function findIcon(title: string): string | undefined {
  let extensionIndex;
  let pos;

  const expr = /[.]/g;

  while ((pos = expr.exec(title))) {
    extensionIndex = pos.index;
  }

  if (extensionIndex) {
    const possibleExtension = title.substring(extensionIndex + 1, title.length);
    if (possibleExtension === 'pptx' || possibleExtension === 'docx' || possibleExtension === 'xlsx') {
      return possibleExtension;
    }
  }
  return undefined;
}

export function generateCommonHTML(
  props: IChicletCardProps,
  imageProvided: boolean,
  icon?: string,
  preview?: string
): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> | undefined {
  return (
    <div className={preview}>
      {renderPreview(props.image, props.imageHeight, props.imageWidth, props.imageAlt)}
      {renderIcon(props.itemType || (props.title && findIcon(props.title)), icon, imageProvided)}
    </div>
  );
}

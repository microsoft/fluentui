import * as React from 'react';
import { Image } from 'office-ui-fabric-react/lib/Image';

const PREVIEW_IMAGE_WIDTH = '198px';
const PREVIEW_IMAGE_HEIGHT = '122px';

const ASSET_CDN_BASE_URL = 'https://static2.sharepointonline.com/files/fabric/assets';

export function renderPreview(
  imageUrl?: string,
  imageHeight?: string,
  imageWidth?: string,
  itemType?: string,
  imageAlt?: string
): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> | undefined {
  let image;
  if (imageUrl) {
    image = <Image width={imageWidth} height={imageHeight} src={imageUrl} role="presentation" alt={imageAlt ? imageAlt : undefined} />;
  } else {
    image = (
      <Image
        width={PREVIEW_IMAGE_WIDTH}
        height={PREVIEW_IMAGE_HEIGHT}
        src={
          itemType
            ? `${ASSET_CDN_BASE_URL}/brand-icons/document/svg/` + itemType + `_48x1.svg`
            : undefined /* @todo: this will be replaced by something built by the design team */
        }
        role="presentation"
        alt={imageAlt ? imageAlt : undefined}
      />
    );
  }
  return image;
}

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

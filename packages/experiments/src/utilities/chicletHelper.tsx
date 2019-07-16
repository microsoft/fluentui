import * as React from 'react';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { IChicletCardProps, IChicletCardStyles } from '../components/Chiclet/ChicletCard.types';

const ASSET_CDN_BASE_URL = 'https://static2.sharepointonline.com/files/fabric/assets';

/**
 * Returns an Image tag with filled in info
 *
 * @param imageUrl - Image url
 * @param imageHeight - Preview image height
 * @param imageWidth - Preview image width
 * @param imageAlt - Alternate image
 * @returns - Image tag with filled in info
 */
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

/**
 * Uses itemType to find the proper icon and return an img tag containing the icon url
 *
 * @param itemType - File type (Word, Excel, or PowerPoint)
 * @param style - Icon styling
 * @param imageProvided - Boolean that indicates if an image was provided
 * @returns - img tag that contains the url for the specified file type
 */
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

/**
 * Uses the file title to determine file type
 *
 * @param title - File title
 * @returns - An extension or undefined
 */
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

/**
 * Generates the HTML for a preview image and/or file icon
 *
 * @param props - Chiclet props
 * @param imageProvided - Boolean that indicates if an image was provided
 * @param classNames - Styling
 * @param height - Height for the preview
 * @param width - Width for the preview
 */
export function generatePreview(
  props: IChicletCardProps,
  imageProvided: boolean,
  classNames: { [key in keyof IChicletCardStyles]: string },
  height?: string,
  width?: string
): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> | undefined {
  return (
    <div className={classNames.preview}>
      {renderPreview(props.image, height, width, props.imageAlt)}
      {renderIcon(props.itemType || (props.title && findIcon(props.title)), classNames.icon, imageProvided)}
    </div>
  );
}

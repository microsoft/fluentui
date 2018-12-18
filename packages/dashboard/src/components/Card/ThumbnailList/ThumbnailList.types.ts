import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface IThumbnailItemProps {
  /**
   * Source of the image we want to display for thumbnail
   */
  imageSource: string;

  /**
   * Subheader text for the thumbnail
   */
  subheaderText?: string;

  /**
   * Description for the thumbnail
   */
  description?: string;

  /**
   * alternate text for the image of the thumbnail item
   */
  altImageText?: string;

  /**
   * aria hidden for the image of the thumbnail item
   */
  imageAriaHidden?: boolean;

  /**
   * Callback function to handle click on thumbnail item
   */
  handleThumbnailItemClick?: () => void;
}

export interface IThumbnailListProps {
  /**
   * List of thumbnails
   */

  thumbnailItems: IThumbnailItemProps[];
}

export interface IThumbnailItemStyles {
  /**
   * root css for each component in thumbnail
   */
  root: IStyle;

  /**
   *css for image in thumbnail
   */
  image: IStyle;
}

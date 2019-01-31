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
   * Defines the title for the benefit of tooltip
   */
  title?: string;

  /**
   * The aria label of the button for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * Detailed description of the button for the benefit of screen readers.
   *
   * Besides the compound button, other button types will need more information provided to screen reader.
   */
  ariaDescription?: string;

  /**
   * If provided and is true it adds an 'aria-hidden' attribute instructing screen readers to ignore the element.
   */
  ariaHidden?: boolean;

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
   * Thumbnail List optional ID Props
   */
  id?: string;

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

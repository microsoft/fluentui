import type { ComponentState, ComponentProps, Slot } from '@fluentui/react-utilities';
import type { FileIconTypeInput } from '../../utils/FileIconType';
import type { FileTypeIconSize, ImageFileType } from '../../utils/getFileTypeIconProps';

export type FileTypeIconSlots = {
  /**
   * The root slot, an img element that displays the file type icon.
   */
  root: Slot<'img'>;
};

export type FileTypeIconProps = ComponentProps<FileTypeIconSlots> & {
  /**
   * The file extension, such as 'pptx' or '.docx', for which you need an icon.
   * For file type icons that are not associated with a file extension,
   * such as folder, use the type property.
   */
  extension?: string;

  /**
   * The type of file type icon you need. Use this property for
   * file type icons that are not associated with a file extension,
   * such as folder.
   */
  type?: FileIconTypeInput;

  /**
   * The size of the icon in pixels.
   * @default 16
   */
  size?: FileTypeIconSize;

  /**
   * The type of image file to use. Can be svg or png.
   * @default 'svg'
   */
  imageFileType?: ImageFileType;

  /**
   * The base URL for the icon assets. If not provided, uses the default Fluent CDN.
   * @default 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20251119.001/assets/item-types/'
   */
  baseUrl?: string;
};

export type FileTypeIconState = ComponentState<FileTypeIconSlots> &
  Required<Pick<FileTypeIconProps, 'size' | 'imageFileType'>> & {
    /**
     * The computed icon URL based on extension/type, size, and image file type.
     */
    iconUrl: string;
  };

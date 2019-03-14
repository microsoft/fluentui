import { FileTypeIconMap } from './FileTypeIconMap';
import { FileIconType, FileIconTypeInput } from './FileIconType';

let _extensionToIconName: { [key: string]: string };

const GENERIC_FILE = 'genericfile';
const FOLDER = 'folder';
const SHARED_FOLDER = 'sharedfolder';
const DOCSET_FOLDER = 'docset';
const LIST_ITEM = 'splist';
const DEFAULT_ICON_SIZE: FileTypeIconSize = 16;

export type FileTypeIconSize = 16 | 20 | 32 | 40 | 48 | 64 | 96;
export type ImageFileType = 'svg' | 'png';

export interface IFileTypeIconOptions {
  /**
   * The file extension, such as .pptx, for which you need an icon.
   * For file type icons that are not associated with a file
   * extension, such as folder, use the type property.
   */
  extension?: string;
  /**
   * The type of file type icon you need. Use this property for
   * file type icons that are not associated with a file extension,
   * such as folder.
   */
  type?: FileIconTypeInput;
  /**
   * The size of the icon in pixels. Defaults to 16.
   */
  size?: FileTypeIconSize;
  /**
   * The type of image file to use. Can be svg or png.
   * Defaults to svg.
   */
  imageFileType?: ImageFileType;
}

/**
 * This function returns properties for a file type icon given the IFileTypeIconOptions.
 * It accounts for different device pixel ratios. For example,
 * getFileTypeIconName({extension: 'doc', size: 16, imageFileType: 'png'})
 * will return { iconName: 'docx16_2x_png' } if the devicePixelRatio is 2.
 *
 * @param options
 */
export function getFileTypeIconProps(options: IFileTypeIconOptions): { iconName: string } {
  // First, obtain the base name of the icon using the extension or type.
  let iconBaseName: string = GENERIC_FILE;

  if (options.extension) {
    iconBaseName = _getFileTypeIconNameFromExtension(options.extension);
  } else if (options.type) {
    switch (options.type) {
      case FileIconType.docset:
        iconBaseName = DOCSET_FOLDER;
        break;
      case FileIconType.folder:
        iconBaseName = FOLDER;
        break;
      case FileIconType.listItem:
        iconBaseName = LIST_ITEM;
        break;
      case FileIconType.sharedFolder:
        iconBaseName = SHARED_FOLDER;
    }
  }

  // Next, obtain the suffix using the icon size, user's device pixel ratio, and
  // preference for svg or png
  let size: FileTypeIconSize = options.size || DEFAULT_ICON_SIZE;
  let suffix: string = _getFileTypeIconSuffix(size, options.imageFileType);

  return { iconName: iconBaseName + suffix };
}

function _getFileTypeIconNameFromExtension(extension: string): string {
  if (!_extensionToIconName) {
    _extensionToIconName = {};

    for (const iconName in FileTypeIconMap) {
      if (FileTypeIconMap.hasOwnProperty(iconName)) {
        const extensions = FileTypeIconMap[iconName].extensions;

        if (extensions) {
          for (let i = 0; i < extensions.length; i++) {
            _extensionToIconName[extensions[i]] = iconName;
          }
        }
      }
    }
  }

  // Strip periods, force lowercase.
  extension = extension.replace('.', '').toLowerCase();

  return _extensionToIconName[extension] || GENERIC_FILE;
}

function _getFileTypeIconSuffix(size: FileTypeIconSize, imageFileType: ImageFileType = 'svg'): string {
  let devicePixelRatio: number = window.devicePixelRatio;
  let devicePixelRatioSuffix = ''; // Default is 1x

  // SVGs scale well, so you can generally use the default image.
  // 1.5x is a special case where SVGs need a different image.
  if (imageFileType === 'svg' && 1 < devicePixelRatio && devicePixelRatio <= 1.5) {
    // Currently missing 1.5x SVGs at size 20, snap to 1x for now
    if (size !== 20) {
      devicePixelRatioSuffix = '_1.5x';
    }
  } else if (imageFileType === 'png') {
    // To look good, PNGs should use a different image for higher device pixel ratios
    if (1 < devicePixelRatio && devicePixelRatio <= 1.5) {
      // Currently missing 1.5x icons for size 20, snap to 2x for now
      devicePixelRatioSuffix = size === 20 ? '_2x' : '_1.5x';
    } else if (1.5 < devicePixelRatio && devicePixelRatio <= 2) {
      devicePixelRatioSuffix = '_2x';
    } else if (2 < devicePixelRatio && devicePixelRatio <= 3) {
      devicePixelRatioSuffix = '_3x';
    } else if (3 < devicePixelRatio) {
      devicePixelRatioSuffix = '_4x';
    }
  }

  return size + devicePixelRatioSuffix + '_' + imageFileType;
}

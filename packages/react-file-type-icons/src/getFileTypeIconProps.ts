import { FileTypeIconMap } from './FileTypeIconMap';
import { FileIconType } from './FileIconType';

let _extensionToIconName: { [key: string]: string };
let _typeToIconName: { [key:number]: string};

const GENERIC_FILE = 'genericfile';

export const DEFAULT_ICON_SIZE: FileTypeIconSize = 16;
export type FileTypeIconSize = 16 | 20 | 24 | 32 | 40 | 48 | 64 | 96;
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
  type?: FileIconType;
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
}

/**
 * This function returns properties for a file type icon given the IFileTypeIconOptions.
 * It accounts for different device pixel ratios. For example,
 * `getFileTypeIconProps({ extension: 'doc', size: 16, imageFileType: 'png' })`
 * will return `{ iconName: 'docx16_2x_png' }` if the `devicePixelRatio` is 2.
 * @param options
 */
export function getFileTypeIconProps(options: IFileTypeIconOptions): { iconName: string; 'aria-label'?: string } {
  // First, obtain the base name of the icon using the extension or type.
  let iconBaseName: string;
  const { extension, type, size, imageFileType } = options;

  iconBaseName = getFileTypeIconNameFromExtensionOrType(extension, type);
  // Next, obtain the suffix using the icon size, user's device pixel ration, and
  // preference for svg or png
  let _size: FileTypeIconSize = size || DEFAULT_ICON_SIZE;
  let suffix: string = getFileTypeIconSuffix(_size, imageFileType);

  return { iconName: iconBaseName + suffix, 'aria-label': extension };
}

export function getFileTypeIconNameFromExtensionOrType(
  extension: string | undefined,
  type: FileIconType | undefined,
): string {
  let iconBaseName: string | undefined;
  if (extension) {
    if (!_extensionToIconName) {
      _extensionToIconName = {};

      for (const iconName in FileTypeIconMap) {
        const extensions = FileTypeIconMap[iconName].extensions;

        if (extensions) {
          for (let i = 0; i < extensions.length; i++) {
            _extensionToIconName[extensions[i]] = iconName;
          }
        }
      }
    }

    // Strip periods, force lowercase.
    extension = extension.replace('.', '').toLowerCase();
    return _extensionToIconName[extension] || GENERIC_FILE;

  } else if (type) {
    
    if (!_typeToIconName) {
      _typeToIconName = {};

      for (const iconName in FileTypeIconMap) {
        const types = FileTypeIconMap[iconName].types;

        if (types) {
          for (let i = 0; i < types.length; i++) {
            _typeToIconName[types[i]] = iconName
          }
        }
      }
    }

    return _typeToIconName[type] || GENERIC_FILE;
  }

  return GENERIC_FILE;
}

export function getFileTypeIconSuffix(
  size: FileTypeIconSize,
  imageFileType: ImageFileType = 'svg',
  win?: Window,
): string {
  // eslint-disable-next-line no-restricted-globals
  win ??= window;
  let devicePixelRatio: number = win.devicePixelRatio;
  let devicePixelRatioSuffix = ''; // Default is 1x

  // SVGs scale well, so you can generally use the default image.
  // 1.5x is a special case where SVGs need a different image.
  if (imageFileType === 'svg' && devicePixelRatio > 1 && devicePixelRatio <= 1.5) {
    // Currently missing 1.5x SVGs at size 20, snap to 1x for now
    if (size !== 20) {
      devicePixelRatioSuffix = '_1.5x';
    }
  } else if (imageFileType === 'png') {
    // To look good, PNGs should use a different image for higher device pixel ratios
    if (devicePixelRatio > 1 && devicePixelRatio <= 1.5) {
      // Currently missing 1.5x icons for size 20, snap to 2x for now
      devicePixelRatioSuffix = size === 20 ? '_2x' : '_1.5x';
    } else if (devicePixelRatio > 1.5 && devicePixelRatio <= 2) {
      devicePixelRatioSuffix = '_2x';
    } else if (devicePixelRatio > 2 && devicePixelRatio <= 3) {
      devicePixelRatioSuffix = '_3x';
    } else if (devicePixelRatio > 3) {
      devicePixelRatioSuffix = '_4x';
    }
  }

  return size + devicePixelRatioSuffix + '_' + imageFileType;
}

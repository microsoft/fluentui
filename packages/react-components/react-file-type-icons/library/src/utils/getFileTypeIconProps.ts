import { FileTypeIconMap } from './FileTypeIconMap';
import { FileIconType } from './FileIconType';
import { ICON_SIZES } from './initializeFileTypeIcons';

let _extensionToIconName: { [key: string]: string };
let _typeToIconName: { [key: number]: string };

const GENERIC_FILE = 'genericfile';

export const DEFAULT_ICON_SIZE: FileTypeIconSize = 16;
export type FileTypeIconSize = 16 | 20 | 24 | 32 | 40 | 48 | 64 | 96;
export type ImageFileType = 'svg' | 'png';

export interface FileTypeIconOptions {
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
 * Gets the nearest valid icon size. If the requested size is not available,
 * returns the next smallest available size. If the requested size is larger
 * than all available sizes, returns the largest available size (96).
 * If the requested size is smaller than all available sizes, returns the smallest (16).
 *
 * @param size - The requested icon size
 * @returns The nearest valid icon size from ICON_SIZES
 */
export function getValidIconSize(size: number): FileTypeIconSize {
  // ICON_SIZES is already sorted: [16, 20, 24, 32, 40, 48, 64, 96]
  const sortedSizes = ICON_SIZES as FileTypeIconSize[];

  // If exact match exists, return it
  if (sortedSizes.includes(size as FileTypeIconSize)) {
    return size as FileTypeIconSize;
  }

  // If size is larger than the largest available, return the largest
  if (size > sortedSizes[sortedSizes.length - 1]) {
    return sortedSizes[sortedSizes.length - 1];
  }

  // If size is smaller than the smallest available, return the smallest
  if (size < sortedSizes[0]) {
    return sortedSizes[0];
  }

  // Find the next smallest available size
  for (let i = sortedSizes.length - 1; i >= 0; i--) {
    if (sortedSizes[i] <= size) {
      return sortedSizes[i];
    }
  }

  // Fallback to default (should never reach here)
  return DEFAULT_ICON_SIZE;
}

/**
 * This function returns properties for a file type icon given the FileTypeIconOptions.
 * It accounts for different device pixel ratios. For example,
 * `getFileTypeIconProps({ extension: 'doc', size: 16, imageFileType: 'png' })`
 * will return `{ iconName: 'docx16_2x_png' }` if the `devicePixelRatio` is 2.
 * @param options - Configuration options for the file type icon
 */
export function getFileTypeIconProps(options: FileTypeIconOptions): { iconName: string; 'aria-label'?: string } {
  // First, obtain the base name of the icon using the extension or type.
  const { extension, type, size, imageFileType } = options;

  const iconBaseName = getFileTypeIconNameFromExtensionOrType(extension, type);

  // Next, obtain the suffix using the icon size, user's device pixel ratio, and
  // preference for svg or png
  const _size: FileTypeIconSize = size || DEFAULT_ICON_SIZE;
  const suffix: string = getFileTypeIconSuffix(_size, imageFileType);

  return { iconName: iconBaseName + suffix, 'aria-label': extension };
}

/**
 * Gets the base icon name from a file extension or file icon type.
 * @param extension - The file extension (e.g., 'docx', 'pdf')
 * @param type - The file icon type for non-extension icons
 * @returns The base icon name
 */
export function getFileTypeIconNameFromExtensionOrType(
  extension: string | undefined,
  type: FileIconType | undefined,
): string {
  if (extension) {
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

    // Extract only the last extension (handles compound extensions like .tar.gz -> gz)
    // and force lowercase
    const lastDotIndex = extension.lastIndexOf('.');
    extension = (lastDotIndex >= 0 ? extension.substring(lastDotIndex + 1) : extension).toLowerCase();
    return _extensionToIconName[extension] || GENERIC_FILE;
  } else if (type) {
    if (!_typeToIconName) {
      _typeToIconName = {};

      for (const iconName in FileTypeIconMap) {
        if (FileTypeIconMap.hasOwnProperty(iconName)) {
          const types = FileTypeIconMap[iconName].types;

          if (types) {
            for (let i = 0; i < types.length; i++) {
              _typeToIconName[types[i]] = iconName;
            }
          }
        }
      }
    }

    return _typeToIconName[type] || GENERIC_FILE;
  }

  return GENERIC_FILE;
}

/**
 * Gets the suffix for the icon name based on size, file type, and device pixel ratio.
 * If the requested size is not available, it will be adjusted to the nearest valid size.
 * @param size - The icon size in pixels (will be validated against available sizes)
 * @param imageFileType - The image file type ('svg' or 'png')
 * @param win - Optional window object for testing
 * @returns The icon name suffix
 */
export function getFileTypeIconSuffix(
  size: FileTypeIconSize | number,
  imageFileType: ImageFileType = 'svg',
  win?: Window,
): string {
  // Validate and adjust size to nearest available
  const validSize = getValidIconSize(size);

  // eslint-disable-next-line @nx/workspace-no-restricted-globals
  win ??= typeof window !== 'undefined' ? window : ({ devicePixelRatio: 1 } as Window);
  const devicePixelRatio: number = win.devicePixelRatio;
  let devicePixelRatioSuffix = ''; // Default is 1x

  // SVGs scale well, so you can generally use the default image.
  if (imageFileType === 'svg' && devicePixelRatio > 1 && devicePixelRatio <= 1.9) {
    // 1.5x is a special case where SVGs need a different image.
    devicePixelRatioSuffix = '_1.5x';
  } else if (imageFileType === 'png') {
    // To look good, PNGs should use a different image for higher device pixel ratios
    if (devicePixelRatio > 1 && devicePixelRatio <= 1.5) {
      devicePixelRatioSuffix = '_1.5x';
    } else if (devicePixelRatio > 1.5 && devicePixelRatio <= 2) {
      devicePixelRatioSuffix = '_2x';
    } else if (devicePixelRatio > 2 && devicePixelRatio <= 3) {
      devicePixelRatioSuffix = '_3x';
    } else if (devicePixelRatio > 3) {
      devicePixelRatioSuffix = '_4x';
    }
  }

  return validSize + devicePixelRatioSuffix + '_' + imageFileType;
}

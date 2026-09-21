import { TYPE_TO_ICON_NAME } from './fileIconTypeNames.generated';
import { FileTypeIconMap } from './FileTypeIconMap';
import type { FileIconType, FileIconTypeInput } from './FileIconType';

let _extensionToIconName: { [key: string]: string };

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
}

/**
 * This function returns properties for a file type icon given the IFileTypeIconOptions.
 * It accounts for different device pixel ratios. For example,
 * `getFileTypeIconProps({ extension: 'doc', size: 16, imageFileType: 'png' })`
 * will return `{ iconName: 'docx16_2x_png' }` if the `devicePixelRatio` is 2.
 * @param options
 */
export function getFileTypeIconProps(options: IFileTypeIconOptions): { iconName: string; 'aria-label'?: string } {
  const { extension, type, size, imageFileType } = options;
  const iconBaseName = getFileTypeIconNameFromExtensionOrType(extension, type);
  const suffix = getFileTypeIconSuffix(size || DEFAULT_ICON_SIZE, imageFileType);
  return { iconName: iconBaseName + suffix, 'aria-label': extension };
}

export function getFileTypeIconNameFromExtensionOrType(
  extension: string | undefined,
  type: FileIconType | undefined,
): string {
  if (extension) {
    if (!_extensionToIconName) {
      _extensionToIconName = {};
      for (const iconName of Object.keys(FileTypeIconMap)) {
        for (const mappedExtension of FileTypeIconMap[iconName].extensions || []) {
          _extensionToIconName[mappedExtension] = iconName;
        }
      }
    }
    extension = extension.replace('.', '').toLowerCase();
    return _extensionToIconName[extension] || GENERIC_FILE;
  }
  return (type && TYPE_TO_ICON_NAME[type]) || GENERIC_FILE;
}

export function getFileTypeIconSuffix(
  size: FileTypeIconSize,
  imageFileType: ImageFileType = 'svg',
  win?: Window,
): string {
  // eslint-disable-next-line no-restricted-globals
  win ??= window;
  const devicePixelRatio: number = win.devicePixelRatio;
  let devicePixelRatioSuffix = '';

  if (imageFileType === 'svg' && devicePixelRatio > 1 && devicePixelRatio <= 1.5) {
    if (size !== 20) {
      devicePixelRatioSuffix = '_1.5x';
    }
  } else if (imageFileType === 'png') {
    if (devicePixelRatio > 1 && devicePixelRatio <= 1.5) {
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

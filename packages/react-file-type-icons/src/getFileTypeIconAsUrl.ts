import { DEFAULT_BASE_URL } from './initializeFileTypeIcons';
import {
  getFileTypeIconNameFromExtensionOrType,
  getFileTypeIconSuffix,
  DEFAULT_ICON_SIZE,
} from './getFileTypeIconProps';
import type { IFileTypeIconOptions } from './getFileTypeIconProps';

/**
 * Given the `fileTypeIconOptions`, this function returns the CDN-based URL for `FileTypeIcon`.
 * Similar to `getFileTypeIconProps`, this also accepts the same type of object
 * but rather than returning the `iconName`, this returns the raw URL.
 * @param options
 * @param baseUrl - optionally provide a custom CDN base url to fetch icons from
 */
export function getFileTypeIconAsUrl(
  options: IFileTypeIconOptions,
  baseUrl: string = DEFAULT_BASE_URL,
): string | undefined {
  const { extension, size = DEFAULT_ICON_SIZE, type, imageFileType } = options;
  const baseIconName = getFileTypeIconNameFromExtensionOrType(extension, type); // eg: docx
  const baseSuffix = getFileTypeIconSuffix(size, imageFileType); // eg: 96_3x_svg or 96_png
  const suffixArray = baseSuffix.split('_'); // eg: ['96', '3x', 'svg']

  if (suffixArray.length === 3) {
    /** suffix is of type 96_3x_svg  - it has a pixel ratio > 1*/
    return `${baseUrl}${size}_${suffixArray[1]}/${baseIconName}.${suffixArray[2]}`;
  } else if (suffixArray.length === 2) {
    /** suffix is of type 96_svg  - it has a pixel ratio of 1*/
    return `${baseUrl}${size}/${baseIconName}.${suffixArray[1]}`;
  }
}

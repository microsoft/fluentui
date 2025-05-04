import { DEFAULT_BASE_URL } from './initializeFileTypeIcons';
import { getFileTypeIconSuffix, DEFAULT_ICON_SIZE } from './getFileTypeIconProps';
import type { IFileTypeIconOptions } from './getFileTypeIconProps';
import { getFileTypeIconAsURL } from './getFileTypeIconAsURL';

/**
 * Given the `fileTypeIconOptions`, this function returns the DOM element for the `FileTypeIcon`
 * as an HTML string. Similar to `getFileTypeIconProps`, this also accepts the same type of object
 * but rather than returning the `iconName`, this returns the entire DOM element as a string.
 * @param options
 * @param baseUrl - optionally provide a custom CDN base url to fetch icons from
 */
export function getFileTypeIconAsHTMLString(
  options: IFileTypeIconOptions,
  baseUrl: string = DEFAULT_BASE_URL,
): string | undefined {
  const { size = DEFAULT_ICON_SIZE, imageFileType } = options;
  const baseSuffix = getFileTypeIconSuffix(size, imageFileType); // eg: 96_3x_svg or 96_png
  const suffixArray = baseSuffix.split('_'); // eg: ['96', '3x', 'svg']

  const src = getFileTypeIconAsURL(options, baseUrl);
  if (suffixArray.length === 3) {
    /** suffix is of type 96_3x_svg  - it has a pixel ratio > 1*/
    return `<img src="${src}" height="100%" width="100%" />`;
  } else if (suffixArray.length === 2) {
    /** suffix is of type 96_svg  - it has a pixel ratio of 1*/
    return `<img src="${src}" alt="" />`;
  }
}

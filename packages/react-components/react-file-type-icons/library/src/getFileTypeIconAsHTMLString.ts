import { DEFAULT_BASE_URL, resolveFileTypeIconUrl } from './fileTypeIconUrl';
import type { IFileTypeIconOptions } from './getFileTypeIconProps';

/**
 * Given the `fileTypeIconOptions`, this function returns the DOM element for the `FileTypeIcon`
 * as an HTML string. Similar to `getFileTypeIconProps`, this also accepts the same type of object
 * but rather than returning the `iconName`, this returns the entire DOM element as a string.
 * @param options - Options used to resolve the file type icon HTML string.
 * @param baseUrl - optionally provide a custom CDN base url to fetch icons from
 */
export function getFileTypeIconAsHTMLString(
  options: IFileTypeIconOptions,
  baseUrl: string = DEFAULT_BASE_URL,
): string | undefined {
  const resolution = resolveFileTypeIconUrl(options, baseUrl);

  if (resolution.usesPixelRatioDirectory) {
    return `<img src="${resolution.src}" height="100%" width="100%" />`;
  }
  return `<img src="${resolution.src}" alt="" />`;
}

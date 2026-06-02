import { DEFAULT_BASE_URL, resolveFileTypeIconUrl } from './fileTypeIconUrl';
import type { IFileTypeIconOptions } from './getFileTypeIconProps';

/**
 * Given the `fileTypeIconOptions`, this function returns the CDN-based URL for `FileTypeIcon`.
 * Similar to `getFileTypeIconProps`, this also accepts the same type of object
 * but rather than returning the `iconName`, this returns the raw URL.
 * @param options - Options used to resolve the file type icon URL.
 * @param baseUrl - optionally provide a custom CDN base url to fetch icons from
 */
export function getFileTypeIconAsUrl(
  options: IFileTypeIconOptions,
  baseUrl: string = DEFAULT_BASE_URL,
): string | undefined {
  return resolveFileTypeIconUrl(options, baseUrl).src;
}

import { getConfiguredBaseUrl } from './initializeFileTypeIcons';
import {
  getFileTypeIconNameFromExtensionOrType,
  getFileTypeIconSuffix,
  DEFAULT_ICON_SIZE,
} from './getFileTypeIconProps';
import type { FileTypeIconOptions } from './getFileTypeIconProps';
import { FileIconType } from './FileIconType';

/**
 * Given the `fileTypeIconOptions`, this function returns the CDN-based URL for `FileTypeIcon`.
 * Similar to `getFileTypeIconProps`, but rather than returning the `iconName`, this returns the raw URL.
 * @param options - Provide extension, FileIconType, size, and imageFileType for the requested icon.
 * @param baseUrl - optionally provide a custom CDN base url to fetch icons from.
 *                  If not provided, uses the URL configured via `initializeFileTypeIcons()`,
 *                  or falls back to the default CDN URL.
 */
export function getFileTypeIconAsUrl(
  options: FileTypeIconOptions,
  baseUrl: string = getConfiguredBaseUrl(),
): string | undefined {
  const { extension, size = DEFAULT_ICON_SIZE, type, imageFileType = 'svg' } = options;
  const baseIconName = getFileTypeIconNameFromExtensionOrType(extension, type);
  const suffix = getFileTypeIconSuffix(size, imageFileType);

  // suffix format: {size}_{imageType} or {size}_{pixelRatio}_{imageType}
  // Examples: "16_svg", "96_3x_svg", "20_1.5x_png"
  const lastUnderscoreIndex = suffix.lastIndexOf('_');
  const fileExtension = suffix.substring(lastUnderscoreIndex + 1);
  const pathPrefix = suffix.substring(0, lastUnderscoreIndex); // "16" or "96_3x" or "20_1.5x"

  // CDN path format: {baseUrl}{pathPrefix}/{iconName}.{fileExtension}
  // Examples: baseUrl16/docx.svg, baseUrl96_3x/docx.svg
  return `${baseUrl}${pathPrefix}/${baseIconName}.${fileExtension}`;
}

/**
 * Given the `fileTypeIconOptions`, similar to `getFileTypeIconProps`, this function returns
 * an <img> tag DOM element that renders the icon, as a string.
 * @param options - Provide extension, FileIconType, size, and imageFileType for the requested icon.
 * @param baseUrl - optionally provide a custom CDN base url to fetch icons from.
 *                  If not provided, uses the URL configured via `initializeFileTypeIcons()`,
 *                  or falls back to the default CDN URL.
 */
export function getFileTypeIconAsHTMLString(
  options: FileTypeIconOptions,
  baseUrl: string = getConfiguredBaseUrl(),
): string | undefined {
  const url = getFileTypeIconAsUrl(options, baseUrl);

  if (!url) {
    return undefined;
  }

  const { size = DEFAULT_ICON_SIZE, extension, type } = options;
  // Generate alt text: use extension if provided, otherwise get the enum name for type
  const altText = extension || (type !== undefined ? FileIconType[type] : '');
  return `<img src="${url}" height="${size}" width="${size}" alt="${altText} file icon" />`;
}

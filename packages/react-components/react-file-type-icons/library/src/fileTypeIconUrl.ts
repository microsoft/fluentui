import {
  DEFAULT_ICON_SIZE,
  getFileTypeIconNameFromExtensionOrType,
  getFileTypeIconSuffix,
} from './getFileTypeIconProps';
import type { IFileTypeIconOptions } from './getFileTypeIconProps';

const FLUENT_CDN_BASE_URL = 'https://res.cdn.office.net/files/fabric-cdn-prod_20260506.001';

export const DEFAULT_BASE_URL = `${FLUENT_CDN_BASE_URL}/assets/item-types/`;
export const ICON_SIZES: number[] = [16, 20, 24, 32, 40, 48, 64, 96];

export type FileTypeIconUrlResolution = {
  src: string;
  usesPixelRatioDirectory: boolean;
};

export function resolveFileTypeIconUrl(
  options: IFileTypeIconOptions,
  baseUrl: string = DEFAULT_BASE_URL,
): FileTypeIconUrlResolution | undefined {
  const { extension, size = DEFAULT_ICON_SIZE, type, imageFileType } = options;
  const baseIconName = getFileTypeIconNameFromExtensionOrType(extension, type);
  const baseSuffix = getFileTypeIconSuffix(size, imageFileType);
  const suffixArray = baseSuffix.split('_');

  if (suffixArray.length === 3) {
    return {
      src: `${baseUrl}${size}_${suffixArray[1]}/${baseIconName}.${suffixArray[2]}`,
      usesPixelRatioDirectory: true,
    };
  } else if (suffixArray.length === 2) {
    return {
      src: `${baseUrl}${size}/${baseIconName}.${suffixArray[1]}`,
      usesPixelRatioDirectory: false,
    };
  }
}
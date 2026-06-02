import {
  DEFAULT_ICON_SIZE,
  getDevicePixelRatioVariant,
  getFileTypeIconNameFromExtensionOrType,
} from './getFileTypeIconProps';
import type { IFileTypeIconOptions } from './getFileTypeIconProps';

const FLUENT_CDN_BASE_URL = 'https://res.cdn.office.net/files/fabric-cdn-prod_20260506.001';

export const DEFAULT_BASE_URL = `${FLUENT_CDN_BASE_URL}/assets/item-types/`;
export const ICON_SIZES: number[] = [16, 20, 24, 32, 40, 48, 64, 96];

export type FileTypeIconUrlResolution = {
  src: string;
  iconName: string;
  ariaLabel?: string;
  usesPixelRatioDirectory: boolean;
};

export function resolveFileTypeIconUrl(
  options: IFileTypeIconOptions,
  baseUrl: string = DEFAULT_BASE_URL,
): FileTypeIconUrlResolution {
  const { extension, size = DEFAULT_ICON_SIZE, type, imageFileType } = options;
  const baseIconName = getFileTypeIconNameFromExtensionOrType(extension, type);
  const { dprDir, ext } = getDevicePixelRatioVariant(size, imageFileType);

  const src = dprDir ? `${baseUrl}${size}${dprDir}/${baseIconName}.${ext}` : `${baseUrl}${size}/${baseIconName}.${ext}`;

  return {
    src,
    iconName: baseIconName + size + dprDir + '_' + ext,
    ariaLabel: extension,
    usesPixelRatioDirectory: dprDir !== '',
  };
}

import { initializeIcons } from './filetypeicons';

const DEFAULT_BASE_URL = 'https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/';
const ICON_SIZES: number[] = [16, 20, 32, 40, 48, 96];

export function initializeFileTypeIcons(baseUrl: string = DEFAULT_BASE_URL): void {
  ICON_SIZES.forEach((size: number) => {
      initializeIcons(baseUrl, size);
    }
  );
}

export { FileTypeIconSize, ImageFileType, IFileTypeIconOptions, getFileTypeIconProps} from './FileTypeIconHelper';
export { FileIconType } from './FileIconType';

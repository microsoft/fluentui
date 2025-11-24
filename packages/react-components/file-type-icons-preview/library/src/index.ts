// Component exports
export {
  FileTypeIcon,
  fileTypeIconClassNames,
  renderFileTypeIcon_unstable,
  useFileTypeIcon_unstable,
  useFileTypeIconStyles_unstable,
} from './components/FileTypeIcon/index';
export type { FileTypeIconProps, FileTypeIconSlots, FileTypeIconState } from './components/FileTypeIcon/index';

// Utility exports (for backward compatibility and advanced usage)
export { FileIconType } from './utils/FileIconType';
export { FileTypeIconMap } from './utils/FileTypeIconMap';
export {
  getFileTypeIconProps,
  getFileTypeIconNameFromExtensionOrType,
  getFileTypeIconSuffix,
  DEFAULT_ICON_SIZE,
} from './utils/getFileTypeIconProps';
export type {
  FileTypeIconSize,
  ImageFileType,
  IFileTypeIconOptions,
} from './utils/getFileTypeIconProps';
export { getFileTypeIconAsUrl, getFileTypeIconAsHTMLString } from './utils/getFileTypeIconAsUrl';
export { initializeFileTypeIcons, DEFAULT_BASE_URL, ICON_SIZES } from './utils/initializeFileTypeIcons';

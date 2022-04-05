/**
 * Enumerates special file type icons that do not map to any file extensions.
 * For example, the 'pptx' icon maps to the extensions 'ppt', 'pptm', 'pptx',
 * but the 'folder' icon does not map to any extensions and should be obtained
 * via this enum.
 */

export enum FileIconType {
  docset = 1, // Start at 1 so it will evaluate as "truthy"
  folder = 2,
  genericFile = 3,
  listItem = 4,
  sharedFolder = 5,
  multiple = 6,
  stream = 7,
  news = 8,
  desktopFolder = 9,
  documentsFolder = 10,
  picturesFolder = 11,
  linkedFolder = 12,
  list = 13,
  form = 14,
  sway = 15,
  playlist = 16,
}

export type FileIconTypeInput = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

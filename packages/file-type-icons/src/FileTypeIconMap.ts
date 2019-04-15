const data: { [key: string]: { extensions?: string[]; _comment?: string } } = require('../fileTypeIconMap.json');

/**
 * Enumeration of icon file names, and what extensions they map to.
 * Please keep items alphabetical. Items without extensions may require specific logic in the code to map.
 * Always use getFileTypeIconProps to get the most up-to-date icon at the right pixel density.
 */
export const FileTypeIconMap: { [key: string]: { extensions?: string[]; _comment?: string } } = data;

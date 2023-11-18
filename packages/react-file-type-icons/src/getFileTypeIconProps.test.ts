import { FileIconType } from './FileIconType';
import { FileTypeIconMap } from './FileTypeIconMap';
import { getFileTypeIconNameFromExtensionOrType } from './getFileTypeIconProps';

describe('return valid icon name', () => {
  it('returns an icon name in file type icon map', () => {
    for (const key of Object.keys(FileIconType)) {
      // Iterate through a TypeScript enum
      const value = FileIconType[key as unknown as FileIconType];
      if (typeof value === 'number') {
        expect(FileTypeIconMap).toHaveProperty(getFileTypeIconNameFromExtensionOrType(undefined, value));
      }
    }
  });
});

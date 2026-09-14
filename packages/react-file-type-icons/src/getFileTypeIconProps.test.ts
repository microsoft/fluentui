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

  it('resolves new CDN file type icon mappings', () => {
    expect(getFileTypeIconNameFromExtensionOrType('work', undefined)).toBe('agentwork');
    expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.pbiDashboard)).toBe('pbidashboard');
    expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.pbiReport)).toBe('powerbi');
  });
});

import { FileIconType } from './FileIconType';
import { FileTypeIconMap } from './FileTypeIconMap';
import { getFileTypeIconNameFromExtensionOrType } from './getFileTypeIconProps';

describe('return valid icon name', () => {
  it('generates the enum, lookup and complete catalog from published JSON metadata', () => {
    const {
      fileIconTypes: types,
      fileTypeIconMap: catalog,
    }: {
      fileIconTypes: { name: string; value: number; icon: string | null }[];
      fileTypeIconMap: { [name: string]: string[] | null };
    } = jest.requireActual('@fluentui/react-icons-file-type/metadata.json');
    for (const { name, value, icon } of types) {
      expect(FileIconType[name as keyof typeof FileIconType]).toBe(value);
      expect(FileIconType[value]).toBe(name);
      expect(getFileTypeIconNameFromExtensionOrType(undefined, value as FileIconType)).toBe(icon || 'genericfile');
    }
    expect(Object.keys(FileTypeIconMap)).toEqual(Object.keys(catalog));
    for (const name of Object.keys(catalog)) {
      expect(FileTypeIconMap[name]).toEqual(catalog[name] ? { extensions: catalog[name] } : {});
    }
  });

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

  it('builds the mutable extension map only on the first extension lookup', () => {
    jest.isolateModules(() => {
      const { FileTypeIconMap: map } = jest.requireActual('./FileTypeIconMap');
      const { getFileTypeIconNameFromExtensionOrType: resolve } = jest.requireActual('./getFileTypeIconProps');
      expect(resolve(undefined, FileIconType.folder)).toBe('folder');
      map.custom = { extensions: ['custom', 'docx'] };
      expect(resolve('custom', undefined)).toBe('custom');
      expect(resolve('.DOCX', FileIconType.folder)).toBe('custom');
      map.later = { extensions: ['later'] };
      expect(resolve('later', undefined)).toBe('genericfile');
    });
  });
});

import { FileIconType } from './FileIconType';
import { FileTypeIconMap } from './FileTypeIconMap';
import { getFileTypeIconNameFromExtensionOrType, getFileTypeIconProps } from './getFileTypeIconProps';

describe('getFileTypeIconNameFromExtensionOrType', () => {
  it('returns an icon name in file type icon map for every FileIconType enum value', () => {
    for (const key of Object.keys(FileIconType)) {
      // Iterate through a TypeScript enum
      const value = FileIconType[key as unknown as FileIconType];
      if (typeof value === 'number') {
        expect(FileTypeIconMap).toHaveProperty(getFileTypeIconNameFromExtensionOrType(undefined, value));
      }
    }
  });

  it('supports extension-based mapping with case-insensitive input', () => {
    expect(getFileTypeIconNameFromExtensionOrType('DOCX', undefined)).toBe('docx');
    expect(getFileTypeIconNameFromExtensionOrType('.pptx', undefined)).toBe('pptx');
    expect(getFileTypeIconNameFromExtensionOrType('unknown-extension', undefined)).toBe('genericfile');
  });

  it('supports non-extension mappings from FileIconType declarations in FileTypeIconMap', () => {
    expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.folder)).toBe('folder');
    expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.list)).toBe('splist');
    expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.stream)).toBe('video');
    expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.campaign)).toBe('spocampaign');
  });
});

describe('getFileTypeIconProps (v8-style invocation)', () => {
  it('returns a usable iconName object for legacy utility callers', () => {
    const result = getFileTypeIconProps({ extension: 'docx', size: 16, imageFileType: 'svg' });
    expect(result.iconName).toBe('docx16_svg');
    expect(result['aria-label']).toBe('docx');
  });

  it('resolves non-extension icon types for legacy utility callers', () => {
    const result = getFileTypeIconProps({ type: FileIconType.folder, size: 20, imageFileType: 'png' });
    expect(result.iconName).toContain('folder20');
  });
});

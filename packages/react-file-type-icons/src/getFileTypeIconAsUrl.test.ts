import { ICON_SIZES, DEFAULT_BASE_URL } from './initializeFileTypeIcons';
import { DEFAULT_ICON_SIZE } from './getFileTypeIconProps';
import type { FileTypeIconSize } from './getFileTypeIconProps';
import { getFileTypeIconAsUrl } from './getFileTypeIconAsUrl';

// Currently this test file only covers the default device pixel ratio, i.e 1
const getExpectedUrl = (iconSize: FileTypeIconSize, suffix: string, expectedExt: string) => {
  return `${DEFAULT_BASE_URL}${iconSize}/${expectedExt}.${suffix}`;
};

// Test suite 1
describe('returns expected urls', () => {
  it('returns the correct url for all valid icon sizes with default as svg', () => {
    ICON_SIZES.forEach((iconSize: number) => {
      const res = getFileTypeIconAsUrl({
        size: iconSize as FileTypeIconSize,
        extension: 'doc',
      });
      expect(res).toEqual(getExpectedUrl(iconSize as FileTypeIconSize, 'svg', 'docx'));
    });

    ICON_SIZES.forEach((iconSize: number) => {
      const res = getFileTypeIconAsUrl({
        size: iconSize as FileTypeIconSize,
        extension: 'accdb',
      });
      expect(res).toEqual(getExpectedUrl(iconSize as FileTypeIconSize, 'svg', 'accdb'));
    });
  });

  it('returns the correct url for all valid icon sizes with type as png', () => {
    ICON_SIZES.forEach((iconSize: number) => {
      const res = getFileTypeIconAsUrl({
        size: iconSize as FileTypeIconSize,
        extension: 'doc',
        imageFileType: 'png',
      });
      expect(res).toEqual(getExpectedUrl(iconSize as FileTypeIconSize, 'png', 'docx'));
    });

    ICON_SIZES.forEach((iconSize: number) => {
      const res = getFileTypeIconAsUrl({
        size: iconSize as FileTypeIconSize,
        extension: 'accdb',
        imageFileType: 'png',
      });
      expect(res).toEqual(getExpectedUrl(iconSize as FileTypeIconSize, 'png', 'accdb'));
    });
  });
});

// Test suite 2
describe('Returns genericfile for invalid inputs', () => {
  it('returns genericfile for invalid extension with default type as svg', () => {
    ICON_SIZES.forEach((iconSize: number) => {
      const res = getFileTypeIconAsUrl({
        size: iconSize as FileTypeIconSize,
        extension: 'blah',
      });
      expect(res).toEqual(getExpectedUrl(iconSize as FileTypeIconSize, 'svg', 'genericfile'));
    });
  });

  it('returns genericfile with type as png', () => {
    ICON_SIZES.forEach((iconSize: number) => {
      const res = getFileTypeIconAsUrl({
        size: iconSize as FileTypeIconSize,
        extension: 'NotAValidExtension',
        imageFileType: 'png',
      });
      expect(res).toEqual(getExpectedUrl(iconSize as FileTypeIconSize, 'png', 'genericfile'));
    });
  });

  it('returns genericfile with default size for empty size, extension and type', () => {
    const res = getFileTypeIconAsUrl({});
    expect(res).toEqual(getExpectedUrl(DEFAULT_ICON_SIZE, 'svg', 'genericfile'));
  });

  it('returns genericfile with default size for empty size, extension and type with type as png', () => {
    const res = getFileTypeIconAsUrl({ imageFileType: 'png' });
    expect(res).toEqual(getExpectedUrl(DEFAULT_ICON_SIZE, 'png', 'genericfile'));
  });
});

// Test suite 3
describe('Returns correct url for custom CDN url', () => {
  it('returns expected url', () => {
    const url = getFileTypeIconAsUrl(
      {
        size: 96,
        extension: 'docx',
      },
      'https://example-base-url/assets/item-types-fluent/',
    );
    expect(url).toEqual('https://example-base-url/assets/item-types-fluent/96/docx.svg');
  });
});

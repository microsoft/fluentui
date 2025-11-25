import { getFileTypeIconAsUrl, getFileTypeIconAsHTMLString } from './getFileTypeIconAsUrl';
import { DEFAULT_BASE_URL } from './initializeFileTypeIcons';
import { getFileTypeIconNameFromExtensionOrType, getValidIconSize } from './getFileTypeIconProps';
import { FileIconType } from './FileIconType';

describe('getFileTypeIconNameFromExtensionOrType', () => {
  describe('with FileIconType enum values', () => {
    it('should map all FileIconType enum values to specific icon names', () => {
      // Test all 22 enum values
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.docset)).toBe('docset');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.folder)).toBe('folder');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.genericFile)).toBe('genericfile');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.listItem)).toBe('listitem');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.sharedFolder)).toBe('sharedfolder');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.multiple)).toBe('multiple');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.stream)).toBe('video');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.news)).toBe('sponews');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.desktopFolder)).toBe('desktopfolder');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.documentsFolder)).toBe('documentsfolder');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.picturesFolder)).toBe('picturesfolder');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.linkedFolder)).toBe('linkedfolder');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.list)).toBe('splist');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.form)).toBe('form');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.sway)).toBe('sway');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.playlist)).toBe('playlist');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.loopworkspace)).toBe('loopworkspace');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.planner)).toBe('planner');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.todoItem)).toBe('todoitem');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.portfolio)).toBe('portfolio');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.album)).toBe('album');
      expect(getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.listForm)).toBe('listform');
    });

    it('should not return genericfile for any valid FileIconType enum', () => {
      // Verify no enum value falls back to the default
      const enumValues = [
        FileIconType.docset,
        FileIconType.folder,
        FileIconType.genericFile,
        FileIconType.listItem,
        FileIconType.sharedFolder,
        FileIconType.multiple,
        FileIconType.stream,
        FileIconType.news,
        FileIconType.desktopFolder,
        FileIconType.documentsFolder,
        FileIconType.picturesFolder,
        FileIconType.linkedFolder,
        FileIconType.list,
        FileIconType.form,
        FileIconType.sway,
        FileIconType.playlist,
        FileIconType.loopworkspace,
        FileIconType.planner,
        FileIconType.todoItem,
        FileIconType.portfolio,
        FileIconType.album,
        FileIconType.listForm,
      ];

      enumValues.forEach(enumValue => {
        const result = getFileTypeIconNameFromExtensionOrType(undefined, enumValue);
        expect(result).toBeDefined();
        // Only FileIconType.genericFile should map to 'genericfile'
        if (enumValue !== FileIconType.genericFile) {
          expect(result).not.toBe('genericfile');
        } else {
          expect(result).toBe('genericfile');
        }
      });
    });
  });

  describe('with compound extensions', () => {
    it('should extract the last extension from .tar.gz', () => {
      // .tar.gz should extract 'gz' and map to appropriate icon
      const result = getFileTypeIconNameFromExtensionOrType('.tar.gz', undefined);
      expect(result).toBe('archive'); // gz maps to archive icon
    });

    it('should extract the last extension from archive.tar.bz2', () => {
      const result = getFileTypeIconNameFromExtensionOrType('archive.tar.bz2', undefined);
      // bz2 is not a known extension, should fall back to genericfile
      expect(result).toBe('genericfile');
    });

    it('should extract the last extension from file.min.js', () => {
      const result = getFileTypeIconNameFromExtensionOrType('file.min.js', undefined);
      expect(result).toBe('code'); // js maps to code icon
    });

    it('should extract the last extension from styles.module.css', () => {
      const result = getFileTypeIconNameFromExtensionOrType('styles.module.css', undefined);
      expect(result).toBe('code'); // css maps to code icon
    });

    it('should handle simple extension with leading dot', () => {
      const result = getFileTypeIconNameFromExtensionOrType('.docx', undefined);
      expect(result).toBe('docx');
    });

    it('should handle simple extension without leading dot', () => {
      const result = getFileTypeIconNameFromExtensionOrType('pdf', undefined);
      expect(result).toBe('pdf');
    });
  });
});

describe('getValidIconSize', () => {
  describe('with exact valid sizes', () => {
    it('should return exact size when 16 is requested', () => {
      expect(getValidIconSize(16)).toBe(16);
    });

    it('should return exact size when 20 is requested', () => {
      expect(getValidIconSize(20)).toBe(20);
    });

    it('should return exact size when 24 is requested', () => {
      expect(getValidIconSize(24)).toBe(24);
    });

    it('should return exact size when 32 is requested', () => {
      expect(getValidIconSize(32)).toBe(32);
    });

    it('should return exact size when 40 is requested', () => {
      expect(getValidIconSize(40)).toBe(40);
    });

    it('should return exact size when 48 is requested', () => {
      expect(getValidIconSize(48)).toBe(48);
    });

    it('should return exact size when 64 is requested', () => {
      expect(getValidIconSize(64)).toBe(64);
    });

    it('should return exact size when 96 is requested', () => {
      expect(getValidIconSize(96)).toBe(96);
    });
  });

  describe('with sizes requiring fallback to smaller', () => {
    it('should return 16 when 18 is requested (next smallest)', () => {
      expect(getValidIconSize(18)).toBe(16);
    });

    it('should return 20 when 22 is requested (next smallest)', () => {
      expect(getValidIconSize(22)).toBe(20);
    });

    it('should return 24 when 30 is requested (next smallest)', () => {
      expect(getValidIconSize(30)).toBe(24);
    });

    it('should return 32 when 35 is requested (next smallest)', () => {
      expect(getValidIconSize(35)).toBe(32);
    });

    it('should return 64 when 80 is requested (next smallest)', () => {
      expect(getValidIconSize(80)).toBe(64);
    });
  });

  describe('with sizes larger than maximum', () => {
    it('should return 96 when 100 is requested', () => {
      expect(getValidIconSize(100)).toBe(96);
    });

    it('should return 96 when 128 is requested', () => {
      expect(getValidIconSize(128)).toBe(96);
    });

    it('should return 96 when 256 is requested', () => {
      expect(getValidIconSize(256)).toBe(96);
    });
  });

  describe('with sizes smaller than minimum', () => {
    it('should return 16 when 10 is requested', () => {
      expect(getValidIconSize(10)).toBe(16);
    });

    it('should return 16 when 8 is requested', () => {
      expect(getValidIconSize(8)).toBe(16);
    });

    it('should return 16 when 1 is requested', () => {
      expect(getValidIconSize(1)).toBe(16);
    });
  });
});

describe('getFileTypeIconAsUrl', () => {
  // Store original DPR once at the start
  const originalDPR = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  beforeEach(() => {
    // Reset to 1x before each test
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 1,
      });
    }
  });

  afterAll(() => {
    // Restore original DPR after all tests in this suite
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: originalDPR,
      });
    }
  });

  describe('with different DPI values', () => {
    it('should return correct URL for 1x DPI with docx extension', () => {
      const result = getFileTypeIconAsUrl({ extension: 'docx', size: 16, imageFileType: 'png' }, DEFAULT_BASE_URL);
      expect(result).toBe(`${DEFAULT_BASE_URL}16/docx.png`);
    });

    it('should return correct URL for 1.5x DPI with pdf extension', () => {
      // Mock window with 1.5x DPI
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 1.5,
      });

      const result = getFileTypeIconAsUrl({ extension: 'pdf', size: 16, imageFileType: 'png' }, DEFAULT_BASE_URL);
      expect(result).toBe(`${DEFAULT_BASE_URL}16_1.5x/pdf.png`);
    });

    it('should return correct URL for 2x DPI with xlsx extension', () => {
      // Mock window with 2x DPI
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 2,
      });

      const result = getFileTypeIconAsUrl({ extension: 'xlsx', size: 16, imageFileType: 'png' }, DEFAULT_BASE_URL);
      expect(result).toBe(`${DEFAULT_BASE_URL}16_2x/xlsx.png`);
    });
  });

  describe('with SVG format', () => {
    it('should return correct URL for 1x DPI with SVG', () => {
      const result = getFileTypeIconAsUrl({ extension: 'docx', size: 16, imageFileType: 'svg' }, DEFAULT_BASE_URL);
      expect(result).toBe(`${DEFAULT_BASE_URL}16/docx.svg`);
    });

    it('should return correct URL for 1.5x DPI with SVG', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 1.5,
      });

      const result = getFileTypeIconAsUrl({ extension: 'pdf', size: 16, imageFileType: 'svg' }, DEFAULT_BASE_URL);
      expect(result).toBe(`${DEFAULT_BASE_URL}16_1.5x/pdf.svg`);
    });

    it('should return correct URL for 2x DPI with SVG (should not include DPI suffix)', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 2,
      });

      const result = getFileTypeIconAsUrl({ extension: 'xlsx', size: 16, imageFileType: 'svg' }, DEFAULT_BASE_URL);
      expect(result).toBe(`${DEFAULT_BASE_URL}16/xlsx.svg`);
    });
  });

  describe('with different sizes', () => {
    it('should return correct URL for size 20', () => {
      const result = getFileTypeIconAsUrl({ extension: 'docx', size: 20, imageFileType: 'png' }, DEFAULT_BASE_URL);
      expect(result).toBe(`${DEFAULT_BASE_URL}20/docx.png`);
    });

    it('should return correct URL for size 24', () => {
      const result = getFileTypeIconAsUrl({ extension: 'pdf', size: 24, imageFileType: 'svg' }, DEFAULT_BASE_URL);
      expect(result).toBe(`${DEFAULT_BASE_URL}24/pdf.svg`);
    });

    it('should return correct URL for size 48', () => {
      const result = getFileTypeIconAsUrl({ extension: 'xlsx', size: 48, imageFileType: 'png' }, DEFAULT_BASE_URL);
      expect(result).toBe(`${DEFAULT_BASE_URL}48/xlsx.png`);
    });
  });

  describe('with custom base URL', () => {
    const customBaseUrl = 'https://custom.cdn.com/icons/';

    it('should use custom base URL', () => {
      const result = getFileTypeIconAsUrl({ extension: 'docx', size: 16, imageFileType: 'svg' }, customBaseUrl);
      expect(result).toBe(`${customBaseUrl}16/docx.svg`);
    });
  });
});

describe('getFileTypeIconAsHTMLString', () => {
  // Store original DPR once at the start
  const originalDPR = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  beforeEach(() => {
    // Reset to 1x before each test
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 1,
      });
    }
  });

  afterAll(() => {
    // Restore original DPR after all tests in this suite
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: originalDPR,
      });
    }
  });

  describe('with different DPI values', () => {
    it('should return correct HTML string for 1x DPI with docx extension', () => {
      const result = getFileTypeIconAsHTMLString(
        { extension: 'docx', size: 16, imageFileType: 'png' },
        DEFAULT_BASE_URL,
      );
      expect(result).toBe(`<img src="${DEFAULT_BASE_URL}16/docx.png" height="16" width="16" alt="docx file icon" />`);
    });

    it('should return correct HTML string for 1.5x DPI with pdf extension', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 1.5,
      });

      const result = getFileTypeIconAsHTMLString(
        { extension: 'pdf', size: 16, imageFileType: 'png' },
        DEFAULT_BASE_URL,
      );
      expect(result).toBe(`<img src="${DEFAULT_BASE_URL}16_1.5x/pdf.png" height="16" width="16" alt="pdf file icon" />`);
    });

    it('should return correct HTML string for 2x DPI with xlsx extension', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 2,
      });

      const result = getFileTypeIconAsHTMLString(
        { extension: 'xlsx', size: 16, imageFileType: 'png' },
        DEFAULT_BASE_URL,
      );
      expect(result).toBe(`<img src="${DEFAULT_BASE_URL}16_2x/xlsx.png" height="16" width="16" alt="xlsx file icon" />`);
    });
  });

  describe('with SVG format', () => {
    it('should return correct HTML string for 1x DPI with SVG', () => {
      const result = getFileTypeIconAsHTMLString(
        { extension: 'docx', size: 24, imageFileType: 'svg' },
        DEFAULT_BASE_URL,
      );
      expect(result).toBe(`<img src="${DEFAULT_BASE_URL}24/docx.svg" height="24" width="24" alt="docx file icon" />`);
    });

    it('should return correct HTML string for 1.5x DPI with SVG', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 1.5,
      });

      const result = getFileTypeIconAsHTMLString(
        { extension: 'pdf', size: 20, imageFileType: 'svg' },
        DEFAULT_BASE_URL,
      );
      expect(result).toBe(`<img src="${DEFAULT_BASE_URL}20_1.5x/pdf.svg" height="20" width="20" alt="pdf file icon" />`);
    });
  });

  describe('with different sizes', () => {
    it('should include correct size attributes for size 32', () => {
      const result = getFileTypeIconAsHTMLString(
        { extension: 'docx', size: 32, imageFileType: 'png' },
        DEFAULT_BASE_URL,
      );
      expect(result).toContain('height="32"');
      expect(result).toContain('width="32"');
      expect(result).toContain('alt="docx file icon"');
    });

    it('should include correct size attributes for size 48', () => {
      const result = getFileTypeIconAsHTMLString(
        { extension: 'xlsx', size: 48, imageFileType: 'svg' },
        DEFAULT_BASE_URL,
      );
      expect(result).toContain('height="48"');
      expect(result).toContain('width="48"');
      expect(result).toContain('alt="xlsx file icon"');
    });
  });

  describe('with custom base URL', () => {
    const customBaseUrl = 'https://custom.cdn.com/icons/';

    it('should use custom base URL in HTML string', () => {
      const result = getFileTypeIconAsHTMLString({ extension: 'docx', size: 16, imageFileType: 'svg' }, customBaseUrl);
      expect(result).toBe(`<img src="${customBaseUrl}16/docx.svg" height="16" width="16" alt="docx file icon" />`);
    });
  });

  describe('edge cases', () => {
    it('should handle unknown extension gracefully with alt text', () => {
      // Unknown extensions should still generate valid HTML with alt text
      const result = getFileTypeIconAsHTMLString({ extension: 'unknown', size: 16 }, DEFAULT_BASE_URL);
      expect(result).toBeDefined();
      expect(result).toContain('alt="unknown file icon"');
    });

    it('should generate alt text from FileIconType when extension is not provided', () => {
      const result = getFileTypeIconAsHTMLString({ type: FileIconType.folder, size: 16 }, DEFAULT_BASE_URL);
      expect(result).toBeDefined();
      expect(result).toContain('alt="folder file icon"');
    });

    it('should generate empty alt text prefix when neither extension nor type is provided', () => {
      const result = getFileTypeIconAsHTMLString({ size: 16 }, DEFAULT_BASE_URL);
      expect(result).toBeDefined();
      expect(result).toContain('alt=" file icon"');
    });
  });
});

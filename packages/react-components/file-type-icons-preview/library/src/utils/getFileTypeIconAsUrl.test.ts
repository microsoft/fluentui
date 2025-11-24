import { getFileTypeIconAsUrl, getFileTypeIconAsHTMLString } from './getFileTypeIconAsUrl';
import { DEFAULT_BASE_URL } from './initializeFileTypeIcons';

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
      expect(result).toBe(`<img src="${DEFAULT_BASE_URL}16/docx.png" height="16" width="16" />`);
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
      expect(result).toBe(`<img src="${DEFAULT_BASE_URL}16_1.5x/pdf.png" height="16" width="16" />`);
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
      expect(result).toBe(`<img src="${DEFAULT_BASE_URL}16_2x/xlsx.png" height="16" width="16" />`);
    });
  });

  describe('with SVG format', () => {
    it('should return correct HTML string for 1x DPI with SVG', () => {
      const result = getFileTypeIconAsHTMLString(
        { extension: 'docx', size: 24, imageFileType: 'svg' },
        DEFAULT_BASE_URL,
      );
      expect(result).toBe(`<img src="${DEFAULT_BASE_URL}24/docx.svg" height="24" width="24" />`);
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
      expect(result).toBe(`<img src="${DEFAULT_BASE_URL}20_1.5x/pdf.svg" height="20" width="20" />`);
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
    });

    it('should include correct size attributes for size 48', () => {
      const result = getFileTypeIconAsHTMLString(
        { extension: 'xlsx', size: 48, imageFileType: 'svg' },
        DEFAULT_BASE_URL,
      );
      expect(result).toContain('height="48"');
      expect(result).toContain('width="48"');
    });
  });

  describe('with custom base URL', () => {
    const customBaseUrl = 'https://custom.cdn.com/icons/';

    it('should use custom base URL in HTML string', () => {
      const result = getFileTypeIconAsHTMLString(
        { extension: 'docx', size: 16, imageFileType: 'svg' },
        customBaseUrl,
      );
      expect(result).toBe(`<img src="${customBaseUrl}16/docx.svg" height="16" width="16" />`);
    });
  });

  describe('edge cases', () => {
    it('should handle undefined URL gracefully', () => {
      // This would only happen if getFileTypeIconAsUrl returns undefined
      // which shouldn't happen in normal circumstances, but we test for robustness
      const result = getFileTypeIconAsHTMLString({ extension: 'unknown', size: 16 }, DEFAULT_BASE_URL);
      expect(result).toBeDefined();
    });
  });
});

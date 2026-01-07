import { initializeFileTypeIcons, DEFAULT_BASE_URL } from './initializeFileTypeIcons';
import { getConfiguredBaseUrl, resetConfiguredBaseUrl } from '../testing';
import { getFileTypeIconAsUrl, getFileTypeIconAsHTMLString } from './getFileTypeIconAsUrl';

describe('initializeFileTypeIcons', () => {
  // Store original DPR once at the start
  const originalDPR = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  beforeEach(() => {
    // Reset to default state before each test
    resetConfiguredBaseUrl();

    // Reset to 1x DPR before each test
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 1,
      });
    }
  });

  afterAll(() => {
    // Restore original DPR after all tests
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: originalDPR,
      });
    }
    // Reset to default state
    resetConfiguredBaseUrl();
  });

  describe('getConfiguredBaseUrl', () => {
    it('should return DEFAULT_BASE_URL when initializeFileTypeIcons has not been called', () => {
      expect(getConfiguredBaseUrl()).toBe(DEFAULT_BASE_URL);
    });

    it('should return DEFAULT_BASE_URL after calling initializeFileTypeIcons with no arguments', () => {
      initializeFileTypeIcons();
      expect(getConfiguredBaseUrl()).toBe(DEFAULT_BASE_URL);
    });

    it('should return custom URL after calling initializeFileTypeIcons with custom URL', () => {
      const customUrl = 'https://my-custom-cdn.com/icons/';
      initializeFileTypeIcons(customUrl);
      expect(getConfiguredBaseUrl()).toBe(customUrl);
    });

    it('should return DEFAULT_BASE_URL after resetConfiguredBaseUrl is called', () => {
      const customUrl = 'https://my-custom-cdn.com/icons/';
      initializeFileTypeIcons(customUrl);
      expect(getConfiguredBaseUrl()).toBe(customUrl);

      resetConfiguredBaseUrl();
      expect(getConfiguredBaseUrl()).toBe(DEFAULT_BASE_URL);
    });
  });

  describe('integration with getFileTypeIconAsUrl', () => {
    it('should use DEFAULT_BASE_URL when initializeFileTypeIcons has not been called', () => {
      const result = getFileTypeIconAsUrl({ extension: 'docx', size: 16 });
      expect(result).toBe(`${DEFAULT_BASE_URL}16/docx.svg`);
    });

    it('should use custom URL after initializeFileTypeIcons is called with custom URL', () => {
      const customUrl = 'https://my-custom-cdn.com/icons/';
      initializeFileTypeIcons(customUrl);

      const result = getFileTypeIconAsUrl({ extension: 'docx', size: 16 });
      expect(result).toBe(`${customUrl}16/docx.svg`);
    });

    it('should allow explicit baseUrl parameter to override configured URL', () => {
      const configuredUrl = 'https://configured-cdn.com/icons/';
      const explicitUrl = 'https://explicit-cdn.com/icons/';

      initializeFileTypeIcons(configuredUrl);

      // Without explicit baseUrl - uses configured URL
      const resultWithoutExplicit = getFileTypeIconAsUrl({ extension: 'docx', size: 16 });
      expect(resultWithoutExplicit).toBe(`${configuredUrl}16/docx.svg`);

      // With explicit baseUrl - uses explicit URL
      const resultWithExplicit = getFileTypeIconAsUrl({ extension: 'docx', size: 16 }, explicitUrl);
      expect(resultWithExplicit).toBe(`${explicitUrl}16/docx.svg`);
    });
  });

  describe('integration with getFileTypeIconAsHTMLString', () => {
    it('should use DEFAULT_BASE_URL when initializeFileTypeIcons has not been called', () => {
      const result = getFileTypeIconAsHTMLString({ extension: 'pdf', size: 24 });
      expect(result).toBe(`<img src="${DEFAULT_BASE_URL}24/pdf.svg" height="24" width="24" alt="pdf file icon" />`);
    });

    it('should use custom URL after initializeFileTypeIcons is called with custom URL', () => {
      const customUrl = 'https://my-custom-cdn.com/icons/';
      initializeFileTypeIcons(customUrl);

      const result = getFileTypeIconAsHTMLString({ extension: 'pdf', size: 24 });
      expect(result).toBe(`<img src="${customUrl}24/pdf.svg" height="24" width="24" alt="pdf file icon" />`);
    });

    it('should allow explicit baseUrl parameter to override configured URL', () => {
      const configuredUrl = 'https://configured-cdn.com/icons/';
      const explicitUrl = 'https://explicit-cdn.com/icons/';

      initializeFileTypeIcons(configuredUrl);

      // Without explicit baseUrl - uses configured URL
      const resultWithoutExplicit = getFileTypeIconAsHTMLString({ extension: 'xlsx', size: 32 });
      expect(resultWithoutExplicit).toContain(configuredUrl);

      // With explicit baseUrl - uses explicit URL
      const resultWithExplicit = getFileTypeIconAsHTMLString({ extension: 'xlsx', size: 32 }, explicitUrl);
      expect(resultWithExplicit).toContain(explicitUrl);
    });
  });

  describe('URL override persistence', () => {
    it('should persist custom URL across multiple utility calls', () => {
      const customUrl = 'https://persistent-cdn.com/icons/';
      initializeFileTypeIcons(customUrl);

      // Multiple calls should all use the configured URL
      expect(getFileTypeIconAsUrl({ extension: 'docx', size: 16 })).toContain(customUrl);
      expect(getFileTypeIconAsUrl({ extension: 'pdf', size: 24 })).toContain(customUrl);
      expect(getFileTypeIconAsUrl({ extension: 'xlsx', size: 32 })).toContain(customUrl);
      expect(getFileTypeIconAsHTMLString({ extension: 'pptx', size: 48 })).toContain(customUrl);
    });

    it('should update configured URL when initializeFileTypeIcons is called again', () => {
      const firstUrl = 'https://first-cdn.com/icons/';
      const secondUrl = 'https://second-cdn.com/icons/';

      initializeFileTypeIcons(firstUrl);
      expect(getFileTypeIconAsUrl({ extension: 'docx', size: 16 })).toContain(firstUrl);

      initializeFileTypeIcons(secondUrl);
      expect(getFileTypeIconAsUrl({ extension: 'docx', size: 16 })).toContain(secondUrl);
    });
  });
});

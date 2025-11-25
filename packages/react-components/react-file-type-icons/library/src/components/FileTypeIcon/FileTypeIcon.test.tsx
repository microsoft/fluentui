import * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import { render } from '@testing-library/react';
import { FileTypeIcon } from './FileTypeIcon';
import { FileIconType } from '../../utils/FileIconType';
import {
  initializeFileTypeIcons,
  resetConfiguredBaseUrl,
  DEFAULT_BASE_URL,
} from '../../utils/initializeFileTypeIcons';

describe('FileTypeIcon', () => {
  isConformant({
    Component: FileTypeIcon,
    displayName: 'FileTypeIcon',
  });

  it('renders with a file extension', () => {
    const result = render(<FileTypeIcon extension="docx" />);
    const img = result.container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.src).toContain('docx');
  });

  it('renders with a file type', () => {
    const result = render(<FileTypeIcon type={FileIconType.folder} />);
    const img = result.container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.src).toContain('folder');
  });

  it('renders with custom size', () => {
    const result = render(<FileTypeIcon extension="pdf" size={48} />);
    const img = result.container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.src).toContain('48');
  });

  it('renders with PNG image type', () => {
    const result = render(<FileTypeIcon extension="xlsx" imageFileType="png" />);
    const img = result.container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.src).toContain('png');
  });

  it('renders with SVG image type by default', () => {
    const result = render(<FileTypeIcon extension="pptx" />);
    const img = result.container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.src).toContain('svg');
  });

  it('applies custom className', () => {
    const result = render(<FileTypeIcon extension="txt" className="custom-class" />);
    const img = result.container.querySelector('img');
    expect(img?.className).toContain('custom-class');
  });

  it('renders with custom baseUrl', () => {
    const customUrl = 'https://example.com/icons/';
    const result = render(<FileTypeIcon extension="docx" baseUrl={customUrl} />);
    const img = result.container.querySelector('img');
    expect(img?.src).toContain(customUrl);
  });

  it('handles file extensions with leading dot', () => {
    const result = render(<FileTypeIcon extension=".pdf" />);
    const img = result.container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.src).toContain('pdf');
  });

  it('defaults to genericfile for unknown extensions', () => {
    const result = render(<FileTypeIcon extension="unknownext" />);
    const img = result.container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.src).toContain('genericfile');
  });
});

describe('FileTypeIcon with initializeFileTypeIcons', () => {
  beforeEach(() => {
    // Reset to default state before each test
    resetConfiguredBaseUrl();
  });

  afterAll(() => {
    // Reset to default state after all tests
    resetConfiguredBaseUrl();
  });

  it('should use DEFAULT_BASE_URL when initializeFileTypeIcons has not been called', () => {
    const result = render(<FileTypeIcon extension="docx" />);
    const img = result.container.querySelector('img');
    expect(img?.src).toContain(DEFAULT_BASE_URL);
  });

  it('should use custom URL after initializeFileTypeIcons is called with custom URL', () => {
    const customUrl = 'https://my-custom-cdn.com/icons/';
    initializeFileTypeIcons(customUrl);

    const result = render(<FileTypeIcon extension="docx" />);
    const img = result.container.querySelector('img');
    expect(img?.src).toContain(customUrl);
  });

  it('should allow explicit baseUrl prop to override configured URL', () => {
    const configuredUrl = 'https://configured-cdn.com/icons/';
    const explicitUrl = 'https://explicit-cdn.com/icons/';

    initializeFileTypeIcons(configuredUrl);

    // Without explicit baseUrl - uses configured URL
    const result1 = render(<FileTypeIcon extension="pdf" />);
    const img1 = result1.container.querySelector('img');
    expect(img1?.src).toContain(configuredUrl);

    // With explicit baseUrl - uses explicit URL
    const result2 = render(<FileTypeIcon extension="pdf" baseUrl={explicitUrl} />);
    const img2 = result2.container.querySelector('img');
    expect(img2?.src).toContain(explicitUrl);
  });
});

import * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import { render } from '@testing-library/react';
import { FileTypeIcon } from './FileTypeIcon';
import type { FileTypeIconProps } from './FileTypeIcon.types';
import { FileIconType } from '../../utils/FileIconType';
import { initializeFileTypeIcons, DEFAULT_BASE_URL } from '../../utils/initializeFileTypeIcons';
import { resetConfiguredBaseUrl } from '../../testing';

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

  it('handles compound extensions like .tar.gz by using last extension', () => {
    const result = render(<FileTypeIcon extension=".tar.gz" />);
    const img = result.container.querySelector('img');
    expect(img).toBeTruthy();
    // gz maps to archive icon
    expect(img?.src).toContain('archive');
  });

  it('handles compound extensions like file.min.js', () => {
    const result = render(<FileTypeIcon extension="file.min.js" />);
    const img = result.container.querySelector('img');
    expect(img).toBeTruthy();
    // js maps to code icon
    expect(img?.src).toContain('code');
  });
});

describe('FileTypeIcon size fallback', () => {
  it('uses next smallest size when 30 is requested (falls back to 24)', () => {
    const result = render(<FileTypeIcon extension="docx" size={30 as FileTypeIconProps['size']} />);
    const img = result.container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.src).toContain('/24/');
  });

  it('uses next smallest size when 50 is requested (falls back to 48)', () => {
    const result = render(<FileTypeIcon extension="pdf" size={50 as FileTypeIconProps['size']} />);
    const img = result.container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.src).toContain('/48/');
  });

  it('uses largest size (96) when size above maximum is requested', () => {
    const result = render(<FileTypeIcon extension="xlsx" size={100 as FileTypeIconProps['size']} />);
    const img = result.container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.src).toContain('/96/');
  });

  it('uses largest size (96) when size 128 is requested', () => {
    const result = render(<FileTypeIcon extension="pptx" size={128 as FileTypeIconProps['size']} />);
    const img = result.container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.src).toContain('/96/');
  });

  it('uses smallest size (16) when size below minimum is requested', () => {
    const result = render(<FileTypeIcon extension="txt" size={8 as FileTypeIconProps['size']} />);
    const img = result.container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.src).toContain('/16/');
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

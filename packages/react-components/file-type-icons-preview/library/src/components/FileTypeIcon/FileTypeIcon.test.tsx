import * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import { render } from '@testing-library/react';
import { FileTypeIcon } from './FileTypeIcon';
import { FileIconType } from '../../utils/FileIconType';

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

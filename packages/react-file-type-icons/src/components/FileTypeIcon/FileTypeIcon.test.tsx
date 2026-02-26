import * as React from 'react';
import { render } from '@testing-library/react';
import { getFileTypeIconAsUrl } from '../../getFileTypeIconAsUrl';
import { getFileTypeIconProps } from '../../getFileTypeIconProps';
import { FileIconType } from '../../FileIconType';
import { FileTypeIcon } from './FileTypeIcon';
import { fileTypeIconClassNames } from './useFileTypeIconStyles.styles';

describe('FileTypeIcon', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'devicePixelRatio', {
      value: 1,
      configurable: true,
    });
  });

  it('renders as an image element', () => {
    const { getByRole } = render(<FileTypeIcon extension="docx" />);
    expect(getByRole('img')).toBeTruthy();
  });

  it('applies the component static class name', () => {
    const { getByRole } = render(<FileTypeIcon extension="docx" />);
    expect(getByRole('img').className.includes(fileTypeIconClassNames.root)).toBe(true);
  });

  it('uses shared resolver output for icon name and URL', () => {
    const options = { extension: 'pptx' as const, size: 24 as const, imageFileType: 'svg' as const };
    const expectedIcon = getFileTypeIconProps(options);
    const expectedUrl = getFileTypeIconAsUrl(options);

    const { getByRole } = render(<FileTypeIcon {...options} />);
    const img = getByRole('img');

    expect(img.getAttribute('data-icon-name')).toBe(expectedIcon.iconName);
    expect(img.getAttribute('src')).toBe(expectedUrl);
    expect(img.getAttribute('aria-label')).toBe(expectedIcon['aria-label']);
    expect(img.getAttribute('width')).toBe('24');
    expect(img.getAttribute('height')).toBe('24');
  });

  it('supports resolving by FileIconType and custom baseUrl', () => {
    const options = {
      type: FileIconType.folder,
      size: 32 as const,
      imageFileType: 'png' as const,
    };

    const expectedUrl = getFileTypeIconAsUrl(options, 'https://example.com/assets/item-types/');

    const { getByRole } = render(
      <FileTypeIcon
        type={FileIconType.folder}
        size={32}
        imageFileType="png"
        baseUrl="https://example.com/assets/item-types/"
      />,
    );

    expect(getByRole('img').getAttribute('src')).toBe(expectedUrl);
  });

  it('falls back to genericfile icon for unknown extension', () => {
    const { getByRole } = render(<FileTypeIcon extension="unknown-extension" />);
    expect(getByRole('img').getAttribute('data-icon-name')?.startsWith('genericfile')).toBe(true);
  });

  it('forwards refs to the root img element', () => {
    const ref = React.createRef<HTMLImageElement>();
    render(<FileTypeIcon extension="docx" ref={ref} />);

    expect(ref.current?.tagName).toBe('IMG');
  });
});

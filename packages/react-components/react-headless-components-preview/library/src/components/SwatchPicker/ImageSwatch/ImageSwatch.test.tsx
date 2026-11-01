import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { isConformant } from '../../../testing/isConformant';
import { ImageSwatch } from './ImageSwatch';
import { SwatchPicker } from '../SwatchPicker';
import { useImageSwatch } from './useImageSwatch';

describe('ImageSwatch', () => {
  isConformant({
    Component: ImageSwatch,
    displayName: 'ImageSwatch',
    requiredProps: { src: 'image.png', value: 'image', 'aria-label': 'Image' },
    renderOptions: {
      wrapper: ({ children }) => <SwatchPicker aria-label="Images">{children}</SwatchPicker>,
    },
    getTargetElement: result => result.getByRole('radio'),
    disabledTests: ['has-top-level-file-extra'],
  });

  it('renders an image swatch with its selection state', () => {
    const { getByRole } = render(<ImageSwatch src="image.png" value="image" aria-label="Image" />, {
      wrapper: ({ children }) => <SwatchPicker selectedValue="image">{children}</SwatchPicker>,
    });

    expect(getByRole('radio')).toHaveAttribute('data-selected');
  });

  it('quotes URLs containing parentheses and spaces', () => {
    const { result } = renderHook(() => useImageSwatch({ src: 'image (1).png', value: 'image' }, null));
    expect(result.current.root.style?.backgroundImage).toBe('url("image (1).png")');
  });

  it('escapes quotes, backslashes, and CSS line terminators in URLs', () => {
    const { result } = renderHook(() => useImageSwatch({ src: 'image"\\\n\r\f.png', value: 'image' }, null));
    expect(result.current.root.style?.backgroundImage).toBe('url("image\\22 \\5c \\a \\d \\c .png")');
  });

  it('preserves an explicit background image override and defaults to a non-submit button', () => {
    const { getByRole } = render(<ImageSwatch src="image.png" value="image" style={{ backgroundImage: 'none' }} />);
    expect(getByRole('radio')).toHaveAttribute('type', 'button');
    expect(getByRole('radio').style.backgroundImage).toBe('none');
  });

  it('emits the disabled state attribute only while disabled', () => {
    const { getByLabelText } = render(
      <SwatchPicker aria-label="Images">
        <ImageSwatch src="image.png" value="image" aria-label="Image" disabled />
        <ImageSwatch src="other.png" value="other" aria-label="Other" />
      </SwatchPicker>,
    );

    expect(getByLabelText('Image')).toHaveAttribute('data-disabled');
    expect(getByLabelText('Other')).not.toHaveAttribute('data-disabled');
  });

  it('marks only the selected swatch as the focusgroup entry point', () => {
    const { getByLabelText } = render(
      <SwatchPicker aria-label="Images" selectedValue="image">
        <ImageSwatch src="image.png" value="image" aria-label="Image" />
        <ImageSwatch src="other.png" value="other" aria-label="Other" />
      </SwatchPicker>,
    );

    expect(getByLabelText('Image')).toHaveAttribute('focusgroupstart');
    expect(getByLabelText('Other')).not.toHaveAttribute('focusgroupstart');
  });
});

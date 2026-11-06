import { useImage_unstable } from './useImage';
import { imageClassNames, useImageStyles_unstable } from './useImageStyles.styles.css';

jest.mock('./Image.module.css', () => ({
  base: 'css-base',
  bordered: 'css-bordered',
  circular: 'css-circular',
  rounded: 'css-rounded',
  shadow: 'css-shadow',
  center: 'css-center',
  contain: 'css-contain',
  cover: 'css-cover',
  none: 'css-none',
  fitFill: 'css-fit-fill',
  block: 'css-block',
}));

describe('useImageStyles_unstable (CSS Modules)', () => {
  it('applies independent style classes and fills an unsized fitted image', () => {
    const state = useImage_unstable(
      {
        src: 'image.png',
        alt: 'Image',
        block: true,
        bordered: true,
        fit: 'cover',
        shadow: true,
        shape: 'circular',
        className: 'caller-class',
      },
      null,
    );

    expect(useImageStyles_unstable(state)).toBe(state);
    expect(state.root.className).toBe(
      `${imageClassNames.root} css-base css-block css-bordered css-shadow css-cover css-fit-fill css-circular caller-class`,
    );
  });

  it('does not apply fit-fill when an explicit size is provided', () => {
    const state = useImage_unstable({ src: 'image.png', alt: 'Image', fit: 'contain', width: 100 }, null);

    useImageStyles_unstable(state);

    expect(state.root.className).toBe(`${imageClassNames.root} css-base css-contain`);
  });

  it('omits empty default-fit and square-shape classes', () => {
    const state = useImage_unstable({ src: 'image.png', alt: 'Image' }, null);

    useImageStyles_unstable(state);

    expect(state.root.className).toBe(`${imageClassNames.root} css-base`);
  });
});

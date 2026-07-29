export type { ImageBaseProps, ImageBaseState, ImageProps, ImageSlots, ImageState } from './Image.types';
export { Image } from './Image';
export { renderImage_unstable } from './renderImage';
export { useImage_unstable, useImageBase_unstable } from './useImage';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- `imageClassNames` is deprecated for styling (DECISIONS.md D16.5); re-exporting it is the point.
export { imageClassNames, useImageStyles_unstable } from './useImageStyles.styles';

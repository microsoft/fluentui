import { ImageProps, ImageOptions } from './Image.types';
import { mergeProps } from '../temp/mergeProps';

/**
 * The useImage hook processes the Image component props and returns
 * state, slots, and slotProps for consumption by the component.
 * @param props
 */
export const useImage = (props: ImageProps, options: ImageOptions) => mergeProps<ImageProps, {}, {}>(props, options);

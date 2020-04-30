import { ImageProps } from './Image.types';
import { mergeProps } from '../utils/mergeProps';
import { ComposePreparedOptions } from '@fluentui/react-compose';

/**
 * The useImage hook processes the Image component props and returns
 * state, slots, and slotProps for consumption by the component.
 * @param props
 */
export const useImage = (props: ImageProps, options: ComposePreparedOptions) =>
  mergeProps<ImageProps, {}, {}>(props, options, options.resolveSlotProps(props));

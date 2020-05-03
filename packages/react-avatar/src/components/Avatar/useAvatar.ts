import { AvatarProps, AvatarSlots, AvatarSlotProps } from './Avatar.types';
import { mergeProps } from '../utils/mergeProps';
import { ComposePreparedOptions } from '@fluentui/react-compose';

/**
 * The useAvatar hook processes the Avatar component props and returns
 * state, slots, and slotProps for consumption by the component.
 * @param props
 */
export const useAvatar = (props: AvatarProps, options: ComposePreparedOptions) => {
  return mergeProps<AvatarProps, AvatarSlots, AvatarSlotProps>(props, options, options.resolveSlotProps(props));
};

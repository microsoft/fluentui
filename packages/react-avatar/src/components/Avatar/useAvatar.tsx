import { AvatarProps, AvatarOptions, AvatarSlots, AvatarSlotProps } from './Avatar.types';
import { mergeProps } from '../temp/mergeProps';

/**
 * The useAvatar hook processes the Avatar component props and returns
 * state, slots, and slotProps for consumption by the component.
 * @param props
 */
export const useAvatar = (props: AvatarProps, options: AvatarOptions) =>
  mergeProps<AvatarProps, AvatarSlots, AvatarSlotProps>(props, options);

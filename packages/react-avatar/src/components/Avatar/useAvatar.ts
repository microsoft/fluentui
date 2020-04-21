import { AvatarProps, AvatarOptions, AvatarSlots, AvatarSlotProps } from './Avatar.types';
import { mergeProps } from '../utils/mergeProps';
import { getInitials as defaultGetInitials } from '@uifabric/utilities';

/**
 * The useAvatar hook processes the Avatar component props and returns
 * state, slots, and slotProps for consumption by the component.
 * @param props
 */
export const useAvatar = (props: AvatarProps, options: AvatarOptions) => {
  const getInitials = props.getInitials || defaultGetInitials;

  return mergeProps<AvatarProps, AvatarSlots, AvatarSlotProps>(props, options, {
    // TODO: should this be shorthand string?
    label: { children: getInitials(props.name || '', false) },
    status: {
      size: props.size,
    },
  });
};

import { StatusProps, StatusOptions, StatusSlots, StatusSlotProps } from './Status.types';
import { mergeProps } from '../temp/mergeProps';

/**
 * The useStatus hook processes the status component props and returns
 * state, slots, and slotProps for consumption by the component.
 * @param props
 */
export const useStatus = (props: StatusProps, options: StatusOptions) =>
  mergeProps<StatusProps, StatusSlots, StatusSlotProps>(props, options);

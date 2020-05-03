import { StatusProps, StatusSlots, StatusSlotProps } from './Status.types';
import { mergeProps } from '../utils/mergeProps';
import { ComposePreparedOptions } from '@fluentui/react-compose';

/**
 * The useStatus hook processes the status component props and returns
 * state, slots, and slotProps for consumption by the component.
 * @param props
 */
export const useStatus = (props: StatusProps, options: ComposePreparedOptions) =>
  mergeProps<StatusProps, StatusSlots, StatusSlotProps>(props, options, options.resolveSlotProps(props));

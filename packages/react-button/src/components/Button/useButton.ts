import { ButtonProps, ButtonSlots, ButtonSlotProps } from './Button.types';
import { mergeProps } from '../../utils/mergeProps';
import { ComposePreparedOptions } from '@fluentui/react-compose';

/**
 * The useButton hook processes the Button component props and returns
 * state, slots, and slotProps for consumption by the component.
 * @param props
 */
export const useButton = (props: ButtonProps, options: ComposePreparedOptions) =>
  mergeProps<ButtonProps, ButtonSlots, ButtonSlotProps>(props, options);

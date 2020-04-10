import { BoxProps, BoxExtendedProps } from './Box.types';
/**
 * The useStatus hook processes the status component props and returns
 * state, slots, and slotProps for consumption by the component.
 * @param props
 */
export const useBox = (props: BoxProps & BoxExtendedProps) => {
  const { slots, slotProps } = props;

  return {
    state: props,
    slots,
    slotProps,
  };
};

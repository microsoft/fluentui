import { mergeProps, ComposePreparedOptions } from '@fluentui/react-compose';
import { LinkProps, LinkSlots, LinkSlotProps } from './Link.types';

/**
 * The useLink hook processes the Link component props and returns
 * state, slots and slotProps for consumption by the component.
 */
export const useLink = (props: LinkProps, options: ComposePreparedOptions) =>
  mergeProps<LinkProps, LinkSlots, LinkSlotProps>(props, options);

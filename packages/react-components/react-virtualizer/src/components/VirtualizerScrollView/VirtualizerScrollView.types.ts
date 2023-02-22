import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { VirtualizerSlots, IVirtualizerProps, IVirtualizerState } from '../Virtualizer/Virtualizer.types';

export type VirtualizerScrollViewSlots = VirtualizerSlots & {
  /**
   * The root container that provides scrolling.
   */
  root: NonNullable<Slot<'div'>>;
};

export type VirtualizerScrollViewProps = ComponentProps<Partial<VirtualizerScrollViewSlots>> & IVirtualizerProps;

export type VirtualizerScrollViewState = ComponentState<VirtualizerScrollViewSlots> & IVirtualizerState;

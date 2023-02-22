import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { MutableRefObject } from 'react';
import { VirtualizerSlots, IVirtualizerProps, IVirtualizerState } from '../Virtualizer/Virtualizer.types';

export type VirtualizerScrollViewSlots = VirtualizerSlots & {
  /**
   * The root container that provides scrolling.
   */
  container: NonNullable<Slot<'div'>>;
};

export type VirtualizerScrollViewProps = ComponentProps<Partial<VirtualizerScrollViewSlots>> &
  Omit<IVirtualizerProps, 'virtualizerLength'> & {
    scrollViewRef?: MutableRefObject<HTMLElement | null>;
  };

export type VirtualizerScrollViewState = ComponentState<VirtualizerScrollViewSlots> & IVirtualizerState;

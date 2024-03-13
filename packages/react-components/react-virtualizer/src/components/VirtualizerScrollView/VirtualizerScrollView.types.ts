import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type {
  VirtualizerSlots,
  VirtualizerConfigProps,
  VirtualizerConfigState,
  VirtualizerChildRenderFunction,
} from '../Virtualizer/Virtualizer.types';
import type { ScrollToInterface } from '../../Utilities';
import type { RefObject } from 'react';

export type VirtualizerScrollViewSlots = VirtualizerSlots & {
  /**
   * The root container that provides embedded scrolling.
   */
  container: NonNullable<Slot<'div'>>;
};

export type VirtualizerScrollViewProps = ComponentProps<Partial<VirtualizerScrollViewSlots>> &
  Partial<
    Omit<
      VirtualizerConfigProps,
      'itemSize' | 'numItems' | 'getItemSize' | 'children' | 'flagIndex' | 'imperativeVirtualizerRef'
    >
  > & {
    /**
     * Virtualizer item size in pixels - static.
     * Axis: 'vertical' = Height
     * Axis: 'horizontal' = Width
     */
    itemSize: number;
    /**
     * The total number of items to be virtualized.
     */
    numItems: number;
    /**
     * Child render function.
     * Iteratively called to return current virtualizer DOM children.
     * Will act as a row or column indexer depending on Virtualizer settings.
     */
    children: VirtualizerChildRenderFunction;
    /**
     * Imperative ref contains our scrollTo index functionality for user control.
     */
    imperativeRef?: RefObject<ScrollToInterface>;
    /**
     * Imperative ref contains our scrollTo index functionality for user control.
     */
    enablePagination?: boolean;
  };

export type VirtualizerScrollViewState = ComponentState<VirtualizerScrollViewSlots> & VirtualizerConfigState;

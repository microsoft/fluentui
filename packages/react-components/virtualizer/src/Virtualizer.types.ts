import type { ReactNode, MutableRefObject, HTMLAttributes } from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type VirtualizerSlots = {
  before?: Slot<'div'>;
  beforeContainer?: Slot<'div'>;
  after?: Slot<'div'>;
  afterContainer?: Slot<'div'>;
};

/**
 * The direction of Virtualizer
 */
export enum VirtualizerFlow {
  Vertical = 'Vertical',
  Horizontal = 'Horizontal',
}

export type VirtualizerState = ComponentState<VirtualizerSlots> & {
  /**
   * The current virtualized array of children to show in the DOM.
   */
  virtualizedChildren: ReactNode[];
  /**
   * The current start index for the virtualizer, all previous index's will be removed from DOM.
   */
  virtualizerStartIndex: number;
  /**
   * The current virtualized array of children to show in the DOM.
   */
  afterBufferHeight: number;
  /**
   * The current virtualized array of children to show in the DOM.
   */
  beforeBufferHeight: number;
  /**
   * The current virtualized array of children to show in the DOM.
   */
  totalVirtualizerHeight: number;
  /**
   * The scroll direction (vertical vs horizontal)
   */
  flow: VirtualizerFlow;
  /**
   * Tells the virtualizer to measure in the reverse direction (for column-reverse order etc.)
   */
  isReversed?: boolean;
  /**
   * Tells the virtualizer how much
   */
  bufferSize: number;
};

export type VirtualizerProps = ComponentProps<Partial<VirtualizerSlots>> & {
  /**
   * Default row height to use if no custom callback provided.
   */
  itemSize?: number;

  /**
   * Determines how many elements to render before the current index. (Ensure it's enough items to cover viewport).
   */
  bufferItems?: number;

  /**
   * The length (in pixels) before the end/start where the virtualizer will be triggered.
   */
  bufferSize?: number;

  /**
   * Determines how many elements to render at once in the list.
   */
  virtualizerLength?: number;

  /**
   * Provide external access to the scroll ref container for control.
   */
  scrollViewRef?: MutableRefObject<HTMLDivElement | null>;

  /**
   * Enable debug stylization (Easier to see virtualization).
   */
  enableDebug?: boolean;

  /**
   * Tells the virtualizer to measure in the reverse direction (for column-reverse order etc.)
   */
  isReversed?: boolean;

  /**
   * The scroll direction (vertical vs horizontal)
   */
  flow?: VirtualizerFlow;

  /**
   * Callback for acquiring size of individual items
   * @param target - the targeted child for this size request
   * @param index - the index of the requested size's child
   */
  sizeOfChild?: (target: ReactNode, index: number) => number;

  /**
   * Notify users of index changes
   */
  onUpdateIndex?: (index: number, prevIndex: number) => void;

  /**
   * Allow users to intervene in index calculation changes
   */
  onCalculateIndex?: (newIndex: number) => number;

  /**
   * Allow users to render their own container
   */
  onRenderContainer?: (virtualizedChildren: ReactNode[], containerProps: HTMLAttributes<ReactNode>) => ReactNode;
};

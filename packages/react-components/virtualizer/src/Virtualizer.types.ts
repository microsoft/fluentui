import type { ReactNode, MutableRefObject } from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type VirtualizerSlots = {
  before?: Slot<'div'>;
  beforeContainer?: Slot<'div'>;
  after?: Slot<'div'>;
  afterContainer?: Slot<'div'>;
};

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
   * Current buffer height required at beginning of array.
   */
  afterBufferHeight: number;
  /**
   * Current buffer height required at end of array.
   */
  beforeBufferHeight: number;
  /**
   * The total current height of the scrollBiew/child content.
   */
  totalVirtualizerHeight: number;
  /**
   * The scroll direction (vertical vs horizontal) - defaults to Vertical if not provided
   */
  isHorizontal: boolean;
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
   * You must provide a value, even if it is just an assumed average or minimum size.
   */
  itemSize: number;

  /**
   * Number of elements to render in the list after virtualization.
   * This should cover at least the size of the viewport at least 250px (bufferSize)
   */
  virtualizerLength: number;

  /**
   * Determines how many elements to render before the current index.
   * (Ensure it's enough items to move the buffer bookends outside viewport)
   * This will default to 1/3rd of virtualizerLength which is recommended.
   */
  bufferItems?: number;

  /**
   * The length (in pixels) before the end/start where the virtualizer will be triggered.
   * You can increase this if you wish for the virtualization to recalculate earlier
   */
  bufferSize?: number;

  /**
   * This should be passed if you have a scrollView that is offset
   * so that the intersection observer correctly fires instead of running on root body.
   */
  scrollViewRef?: MutableRefObject<HTMLElement | null>;

  /**
   * The scroll direction (vertical vs horizontal)
   */
  isHorizontal?: boolean;

  /**
   * Tells the virtualizer to measure in the reverse direction (for column-reverse order etc.)
   */
  isReversed?: boolean;

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
};

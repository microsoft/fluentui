import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type VirtualizerSlots = {
  /**
   * The intersection observed 'before' element will detect when scrolling towards the beginning.
   */
  before: NonNullable<Slot<'div', 'td'>>;
  /**
   * A block place holding whitespace at the beginning of current DOM children.
   */
  beforeContainer: NonNullable<Slot<'div', 'tr'>>;
  /**
   * The intersection observed 'after' element will detect when scrolling towards the end.
   */
  after: NonNullable<Slot<'div', 'td'>>;
  /**
   * A block place holding whitespace after the end of current DOM children.
   */
  afterContainer: NonNullable<Slot<'div', 'tr'>>;
};

export type VirtualizerState = ComponentState<VirtualizerSlots> & {
  /**
   * The current virtualized array of children to show in the DOM.
   */
  virtualizedChildren: React.ReactNode[];
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
   * The total current height of the scrollView/child content.
   */
  totalVirtualizerHeight: number;
  /**
   * The scroll direction
   * @default vertical
   */
  axis?: 'vertical' | 'horizontal';
  /**
   * Tells the virtualizer to measure in the reverse direction (for column-reverse order etc.)
   */
  reversed?: boolean;
  /**
   * Tells the virtualizer how much
   */
  bufferSize: number;
};

// Virtualizer render function to procedurally generate children elements as rows or columns via index.
// Q: Use generic typing and passing through object data or a simple index system?
export type VirtualizerChildRenderFunction = (index: number) => React.ReactNode;

export type VirtualizerProps = ComponentProps<Partial<VirtualizerSlots>> & {
  /**
   * Child render function.
   * Iteratively called to return current virtualizer DOM children.
   * Will act as a row or column indexer depending on Virtualizer settings.
   * Can be used dynamically.
   */
  children: VirtualizerChildRenderFunction;

  /**
   * Default cell size to use if no custom callback provided.
   * If implementing `getItemSize` this should be the initial and ideally minimum cell size.
   */
  itemSize: number;

  /**
   * The total number of items to be virtualized.
   */
  numItems: number;

  /**
   * Number of children to render in the DOM during virtualization.
   * Constraints:
   * - Large enough that the items rendered in DOM cover the viewport
   *   and intersection observer buffers (buffersize) at both ends.
   */
  virtualizerLength: number;

  /**
   * Defaults to 1/4th of virtualizerLength.
   * Controls the number of elements rendered before the current index entering the virtualized viewport.
   * Constraints:
   * - Large enough to cover bufferSize (prevents buffers intersecting into the viewport during rest state).
   * - Small enough that the end buffer and end index (start index + virtualizerLength) is not within viewport at rest.
   */
  bufferItems?: number;

  /**
   * Defaults to half of bufferItems size (in pixels).
   * The length (in pixels) before the end/start DOM index where the virtualizer recalculation will be triggered.
   * Increasing this reduces whitespace on ultra-fast scroll, as additional elements
   * are buffered to appear while virtualization recalculates.
   * Constraints:
   * - At least 1px - although this will only trigger the recalculation after bookends (whitespace) enter viewport.
   * - BufferSize must be smaller than bufferItems pixel size, as it prevents bookends entering viewport at rest.
   */
  bufferSize?: number;

  /**
   * Enables users to override the intersectionObserverRoot.
   * @default null
   */
  intersectionObserverRoot?: React.MutableRefObject<HTMLElement | null>;

  /**
   * The scroll direction
   * @default vertical
   */
  axis?: 'vertical' | 'horizontal';

  /**
   * Tells the virtualizer to measure in the reverse direction (for column-reverse order etc.)
   * This value should be flipped in RTL implementation (TBD whether automate RTL).
   */
  reversed?: boolean;

  /**
   * Callback for acquiring size of individual items
   * @param index - the index of the requested size's child
   */
  getItemSize?: (index: number) => number;

  /**
   * Notify users of index changes
   */
  onUpdateIndex?: (index: number, prevIndex: number) => void;

  /**
   * Allow users to intervene in index calculation changes
   */
  onCalculateIndex?: (newIndex: number) => number;
};

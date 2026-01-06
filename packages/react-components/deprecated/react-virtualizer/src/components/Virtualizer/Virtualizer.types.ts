import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { VirtualizerContextProps } from '../../Utilities';

/**
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
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

/**
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export type VirtualizerConfigState = {
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
   * Enables the isScrolling property in the child render function
   * Default: false - to prevent nessecary render function calls
   */
  enableScrollLoad?: boolean;
  /**
   * Pixel size of intersection observers and how much they 'cross over' into the bufferItems index.
   * Minimum 1px.
   */
  bufferSize: number;
  /**
   * Ref for access to internal size knowledge, can be used to measure updates
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  childSizes: React.MutableRefObject<number[]>;
  /**
   * Ref for access to internal progressive size knowledge, can be used to measure updates
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  childProgressiveSizes: React.MutableRefObject<number[]>;
};

/**
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export type VirtualizerState = ComponentState<VirtualizerSlots> & VirtualizerConfigState;

/**
 * The main child render method of Virtualization
 * isScrolling will only be enabled when enableScrollLoad is set to true.
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export type VirtualizerChildRenderFunction = (index: number, isScrolling: boolean) => React.ReactNode;

/**
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export type VirtualizerDataRef = {
  progressiveSizes: React.RefObject<number[]>;
  nodeSizes: React.RefObject<number[]>;
  setFlaggedIndex: (index: number | null) => void;
  currentIndex: React.RefObject<number>;
};

/**
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export type VirtualizerConfigProps = {
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
   * Defaults to 1/4th (or 1/3rd for dynamic items) of virtualizerLength.
   * RECOMMEND: Override this with a consistent value if using a dynamic virtualizer.
   *
   * Controls the number of elements rendered before the current index entering the virtualized viewport.
   * Constraints:
   * - Large enough to cover bufferSize (prevents buffers intersecting into the viewport during rest state).
   * - Small enough that the virtualizer only renders a few items outside of view.
   */
  bufferItems?: number;

  /**
   * Defaults to half of bufferItems * itemSize size (in pixels).
   * RECOMMEND: Override this with a consistent minimum item size value if using a dynamic virtualizer.
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
   * We recommend passing this in for accurate distance assessment in IO
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  scrollViewRef?: React.MutableRefObject<HTMLElement | null>;

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
   * Enables the isScrolling property in the child render function
   * Default: false - to prevent nessecary render function calls
   */
  enableScrollLoad?: boolean;

  /**
   * Callback for acquiring size of individual items
   * @param index - the index of the requested size's child
   */
  getItemSize?: (index: number) => number;

  /**
   * Virtualizer context can be passed as a prop for extended class use
   */
  virtualizerContext?: VirtualizerContextProps;

  /**
   * Callback for notifying when a flagged index has been rendered
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onRenderedFlaggedIndex?: (index: number) => void;

  /*
   * Callback for notifying when a flagged index has been rendered
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  flaggedIndex?: React.MutableRefObject<number | null>;

  /**
   * Imperative ref contains our scrollTo index functionality for user control.
   */
  imperativeVirtualizerRef?: React.RefObject<VirtualizerDataRef | null>;

  /**
   * A ref that provides the size of container (vertical - height, horizontal - width), set by a resize observer.
   * Virtualizer Measure hooks provide a suitable reference.
   */
  containerSizeRef: React.RefObject<number>;

  /**
   * A callback that enables updating scroll position for calculating required dynamic lengths,
   * this should be passed in from useDynamicVirtualizerMeasure
   */
  updateScrollPosition?: (position: number) => void;

  /**
   * Spacing between rendered children for calculation, should match the container's gap CSS value.
   */
  gap?: number;
};

/**
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export type VirtualizerProps = ComponentProps<Partial<VirtualizerSlots>> & VirtualizerConfigProps;

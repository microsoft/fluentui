export {
  slotFromProps,
  slotFromShorthand,
  isSlot,
  getSlots,
  getSlotsNext,
  resolveShorthand,
  isResolvedShorthand,
  SLOT_COMPONENT_METADATA_SYMBOL,
} from './compose/index';
export type {
  ExtractSlotProps,
  ComponentProps,
  NextComponentState,
  ComponentState,
  ForwardRefComponent,
  // eslint-disable-next-line deprecation/deprecation
  ResolveShorthandFunction,
  // eslint-disable-next-line deprecation/deprecation
  ResolveShorthandOptions,
  Slot,
  Slots,
  SlotClassNames,
  SlotPropsRecord,
  SlotRenderFunction,
  SlotShorthandValue,
  UnknownSlotProps,
  SlotComponent,
  SlotComponentMetadata,
} from './compose/index';

export {
  IdPrefixProvider,
  resetIdsForTests,
  useControllableState,
  useEventCallback,
  useFirstMount,
  useForceUpdate,
  useId,
  useIsomorphicLayoutEffect,
  useMergedRefs,
  useOnClickOutside,
  useOnScrollOutside,
  usePrevious,
  useScrollbarWidth,
  useTimeout,
} from './hooks/index';
export type { RefObjectFunction, UseControllableStateOptions, UseOnClickOrScrollOutsideOptions } from './hooks/index';

export { canUseDOM, useIsSSR, SSRProvider } from './ssr/index';

export {
  clamp,
  getNativeElementProps,
  getPartitionedNativeProps,
  getRTLSafeKey,
  mergeCallbacks,
  isHTMLElement,
  isInteractiveHTMLElement,
  omit,
  createPriorityQueue,
} from './utils/index';

export type { PriorityQueue } from './utils/priorityQueue';

export { applyTriggerPropsToChildren, getTriggerChild, isFluentTrigger } from './trigger/index';

export type { FluentTriggerComponent, TriggerProps } from './trigger/index';

/**
 * Event utils
 */
export type { NativeTouchOrMouseEvent, ReactTouchOrMouseEvent, TouchOrMouseEvent } from './events/index';
export { isTouchEvent, isMouseEvent, getEventClientCoords } from './events/index';

export {
  slot,
  isSlot,
  getSlots,
  getSlotsNext,
  assertSlots,
  resolveShorthand,
  isResolvedShorthand,
  getIntrinsicElementProps,
  SLOT_ELEMENT_TYPE_SYMBOL,
  SLOT_RENDER_FUNCTION_SYMBOL,
} from './compose/index';
export type {
  ExtractSlotProps,
  ComponentProps,
  ComponentState,
  ForwardRefComponent,
  ResolveShorthandFunction,
  ResolveShorthandOptions,
  Slot,
  Slots,
  SlotClassNames,
  SlotPropsRecord,
  SlotRenderFunction,
  SlotShorthandValue,
  UnknownSlotProps,
  SlotComponentType,
  SlotOptions,
  InferredElementRefType,
} from './compose/index';

export {
  IdPrefixProvider,
  resetIdsForTests,
  useAnimationFrame,
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
  // eslint-disable-next-line deprecation/deprecation
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

export type {
  SelectionMode,
  OnSelectionChangeCallback,
  OnSelectionChangeData,
  SelectionItemId,
  SelectionHookParams,
  SelectionMethods,
} from './selection/index';
export { useSelection } from './selection/index';

export { elementContains, setVirtualParent, getParent } from './virtualParent/index';

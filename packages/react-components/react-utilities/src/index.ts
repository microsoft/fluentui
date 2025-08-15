export {
  slot,
  isSlot,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  getSlots,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  getSlotsNext,
  assertSlots,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  resolveShorthand,
  isResolvedShorthand,
  getIntrinsicElementProps,
  getSlotClassNameProp_unstable,
  SLOT_CLASS_NAME_PROP_SYMBOL,
  SLOT_ELEMENT_TYPE_SYMBOL,
  SLOT_RENDER_FUNCTION_SYMBOL,
} from './compose/index';
export type {
  ExtractSlotProps,
  ComponentProps,
  ComponentState,
  ForwardRefComponent,
  RefAttributes,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  ResolveShorthandFunction,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  ResolveShorthandOptions,
  Slot,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  Slots,
  SlotClassNames,
  SlotPropsRecord,
  SlotRenderFunction,
  SlotShorthandValue,
  UnknownSlotProps,
  SlotComponentType,
  SlotOptions,
  InferredElementRefType,
  EventData,
  EventHandler,
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
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  getNativeElementProps,
  getPartitionedNativeProps,
  getReactElementRef,
  getRTLSafeKey,
  mergeCallbacks,
  isHTMLElement,
  isInteractiveHTMLElement,
  omit,
  createPriorityQueue,
} from './utils/index';

export type {
  DistributiveOmit,
  UnionToIntersection,
  JSXElement,
  JSXIntrinsicElement,
  JSXIntrinsicElementKeys,
} from './utils/types';

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

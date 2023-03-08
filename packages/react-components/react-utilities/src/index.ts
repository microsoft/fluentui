export { getSlots, resolveShorthand, isResolvedShorthand } from './compose/index';
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
} from './utils/index';

export { applyTriggerPropsToChildren, getTriggerChild, isFluentTrigger } from './trigger/index';

export type { FluentTriggerComponent, TriggerProps } from './trigger/index';

/**
 * Event utils
 */
export type { NativeTouchOrMouseEvent, ReactTouchOrMouseEvent, TouchOrMouseEvent } from './events/index';
export { isTouchEvent, isMouseEvent, getEventClientCoords } from './events/index';

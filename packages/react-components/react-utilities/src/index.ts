export { getSlots, resolveShorthand } from './compose/index';
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
  resetIdsForTests,
  useControllableState,
  useEventCallback,
  useFirstMount,
  useForceUpdate,
  useId,
  useIsomorphicLayoutEffect,
  useMergedEventCallbacks,
  useMergedRefs,
  useOnClickOutside,
  useOnScrollOutside,
  usePrevious,
  useTimeout,
} from './hooks/index';
export type { RefObjectFunction, UseControllableStateOptions, UseOnClickOrScrollOutsideOptions } from './hooks/index';

export { canUseDOM, useIsSSR, SSRProvider } from './ssr/index';

export {
  clamp,
  getNativeElementProps,
  getPartitionedNativeProps,
  getRTLSafeKey,
  shouldPreventDefaultOnKeyDown,
} from './utils/index';

export { applyTriggerPropsToChildren, getTriggerChild } from './trigger/index';

export type { FluentTriggerComponent } from './trigger/index';

import * as slot from './slot';

export type {
  AsIntrinsicElement,
  ComponentProps,
  ComponentState,
  EventData,
  EventHandler,
  ExtractSlotProps,
  ForwardRefComponent,
  InferredElementRefType,
  IsSingleton,
  PropsWithoutChildren,
  PropsWithoutRef,
  Slot,
  SlotClassNames,
  SlotComponentType,
  SlotPropsRecord,
  SlotRenderFunction,
  SlotShorthandValue,
  UnknownSlotProps,
} from './types';
export { isResolvedShorthand } from './isResolvedShorthand';
export { SLOT_ELEMENT_TYPE_SYMBOL, SLOT_RENDER_FUNCTION_SYMBOL } from './constants';
export { isSlot } from './isSlot';
export { assertSlots } from './assertSlots';
export { getIntrinsicElementProps } from './getIntrinsicElementProps';

// eslint-disable-next-line @typescript-eslint/no-deprecated
export type { ObjectSlotProps, Slots } from './deprecated/getSlots';
// eslint-disable-next-line @typescript-eslint/no-deprecated
export { getSlots } from './deprecated/getSlots';
// eslint-disable-next-line @typescript-eslint/no-deprecated
export type { ResolveShorthandFunction, ResolveShorthandOptions } from './deprecated/resolveShorthand';
// eslint-disable-next-line @typescript-eslint/no-deprecated
export { resolveShorthand } from './deprecated/resolveShorthand';
// eslint-disable-next-line @typescript-eslint/no-deprecated
export { getSlotsNext } from './deprecated/getSlotsNext';

export { slot };
export type { SlotOptions } from './slot';

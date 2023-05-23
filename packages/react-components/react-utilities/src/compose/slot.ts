import { isValidElement } from 'react';
import type {
  AsIntrinsicElement,
  SlotComponent,
  SlotComponentMetadata,
  SlotRenderFunction,
  SlotShorthandValue,
  UnknownSlotProps,
} from './types';
import { SLOT_COMPONENT_METADATA_SYMBOL } from './constants';
import * as React from 'react';
import { SlotPropsRecord } from './types';
import { ExtractSlotProps } from './types';
import { PropsWithoutRef } from './types';
import { getNativeElementProps } from '../utils/getNativeElementProps';

export type SlotOptions<Props extends UnknownSlotProps> = {
  elementType?:
    | React.ComponentType<Props>
    | (Props extends AsIntrinsicElement<infer As> ? As : keyof JSX.IntrinsicElements);
  defaultProps?: Partial<Props>;
};

/**
 * Creates a slot for a v9 component
 * @param params - an object containing:
 * 1. `value` provided through `props.SLOT`,
 * 2. Base `elementType` that will be rendered
 * 3. A boolean (`required`) indicating if the slot will be rendered even if no `value` is provided
 * 4. `defaultProps`, similar to a component a slot might have default properties to be merged together with the value provided by the user
 *
 * @example
 * ```ts
 * // useDialogSurface
 * const backdropSlot = slot({
    value: props.backdrop,
    elementType: 'div',
    required: open && modalType !== 'non-modal',
    defaultProps: { 'aria-hidden': 'true' },
  });
 * ```
 */
export function slotFromShorthand<Props extends UnknownSlotProps>(
  value: Props | SlotShorthandValue | SlotComponent<Props> | undefined,
  options: { required: true } & SlotOptions<Props>,
): SlotComponent<Props>;
export function slotFromShorthand<Props extends UnknownSlotProps>(
  value: Props | SlotShorthandValue | SlotComponent<Props> | undefined | null,
  options?: { required?: boolean } & SlotOptions<Props>,
): SlotComponent<Props> | undefined;
export function slotFromShorthand<Props extends UnknownSlotProps>(
  value: Props | SlotShorthandValue | SlotComponent<Props> | undefined | null,
  options: { required?: boolean } & SlotOptions<Props> = {},
): SlotComponent<Props> | undefined {
  const { required = false, defaultProps, elementType } = options;

  if (value === null || (value === undefined && !required)) {
    return undefined;
  }
  const metadata: SlotComponentMetadata<Props> = isSlot<Props>(value) ? value[SLOT_COMPONENT_METADATA_SYMBOL] : {};

  if (elementType) {
    metadata.elementType = elementType;
  }

  // casting is required here as SlotComponent is an uncallable function, not an object
  const propsWithMetadata = {
    ...defaultProps,
    [SLOT_COMPONENT_METADATA_SYMBOL]: metadata,
  } as SlotComponent<Props>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof value === 'string' || typeof value === 'number' || Array.isArray(value) || isValidElement<any>(value)) {
    propsWithMetadata.children = value;
  } else if (typeof value === 'object') {
    Object.assign(propsWithMetadata, value);
    if (typeof value.children === 'function') {
      metadata.renderFunction = value.children as SlotRenderFunction<Props>;
      propsWithMetadata.children = defaultProps?.children;
    }
  }

  return propsWithMetadata;
}

/**
 * Creates a slot for a v9 component - equivalent to `slot` method, but with a more specialized parameter,
 * main difference is the presence of `props` and `ref`,
 * which are a more specialized types than `value` on `slot` method.
 *
 * @example
 * ```ts
 * // useDialogBody
 * export const useDialogBody_unstable = (props: DialogBodyProps, ref: React.Ref<HTMLDivElement>): DialogBodyState => ({
 *   root: slotFromProps<DialogBodySlots>({ props, ref, elementType: props.as ?? 'div' }),
 * });
 * ```
 */
export function slotFromProps<Slots extends SlotPropsRecord, Primary extends keyof Slots = 'root'>(
  props: PropsWithoutRef<ExtractSlotProps<Slots[Primary]>>,
  params: SlotOptions<ExtractSlotProps<Slots[Primary]>> & {
    ref?: 'ref' extends keyof ExtractSlotProps<Slots[Primary]> ? ExtractSlotProps<Slots[Primary]>['ref'] : never;
  } = {},
): SlotComponent<ExtractSlotProps<Slots[Primary]>> {
  const { defaultProps, elementType, ref } = params;
  const filteredProps: ExtractSlotProps<Slots[Primary]> = getNativeElementProps(elementType as string, {
    ref,
    ...props,
  });
  return slotFromShorthand(filteredProps, { elementType, defaultProps, required: true });
}

export function isSlot<Props extends {}>(element: unknown): element is SlotComponent<Props> {
  return Boolean((element as {} | undefined)?.hasOwnProperty(SLOT_COMPONENT_METADATA_SYMBOL));
}

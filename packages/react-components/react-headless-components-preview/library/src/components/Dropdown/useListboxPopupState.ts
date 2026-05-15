'use client';

import * as React from 'react';
import { getPartitionedNativeProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot, SlotComponentType } from '@fluentui/react-utilities';
import { type FieldControlPropsOptions, useFieldControlProps_unstable } from '@fluentui/react-field';
import { useActiveDescendant, type ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import {
  isComboboxOptionElement,
  useComboboxBaseState,
  type ComboboxBaseProps,
  type ComboboxBaseState,
} from '@fluentui/react-combobox';

import { resolvePositioningShorthand, usePositioning } from '../../positioning';
import type { Listbox } from './Listbox';
import { useListboxSlot } from './useListboxSlot';

type TriggerElement = HTMLButtonElement | HTMLInputElement;

type RootSlot = SlotComponentType<ExtractSlotProps<Slot<'div'>>>;

type ListboxSlot = ReturnType<typeof useListboxSlot>;

/**
 * Minimum prop shape this hook needs from the consumer (Dropdown / Combobox).
 *
 * The consumer's full props type extends this — for example `DropdownProps` adds `button` and
 * `clearButton`, while `ComboboxProps` adds `input` and `clearIcon`.
 */
export type ListboxPopupBaseProps = ComboboxBaseProps &
  Pick<
    React.HTMLAttributes<HTMLElement>,
    'id' | 'aria-labelledby' | 'aria-describedby' | 'aria-invalid' | 'aria-required' | 'style' | 'className'
  > & {
    root?: Slot<'div'>;
    listbox?: Slot<typeof Listbox>;
    children?: React.ReactNode;
  };

/** Extras accepted by `useComboboxBaseState` beyond `ComboboxBaseProps`. */
type ComboboxBaseStateExtras = Partial<ComboboxBaseProps> & {
  freeform?: boolean;
  editable?: boolean;
};

export type UseListboxPopupStateOptions<TProps extends ListboxPopupBaseProps> = {
  /** Tag name of the primary slot — used by `getPartitionedNativeProps` to split native attributes. */
  primarySlotTagName: 'button' | 'input';
  /** Options forwarded to `useFieldControlProps_unstable`. */
  fieldControlOptions: FieldControlPropsOptions;
  /**
   * Extra props merged into the `useComboboxBaseState` call (after field control merging).
   * For example, Dropdown forces `freeform: false`; Combobox derives `editable` from `multiselect`.
   */
  baseStateExtras?: (mergedProps: TProps) => ComboboxBaseStateExtras;
  /**
   * Extra default props for the root slot. For example, Dropdown places its children on the root
   * (the option list); Combobox does not.
   */
  rootDefaultProps?: (mergedProps: TProps) => Record<string, unknown>;
};

export type UseListboxPopupStateReturn<TProps extends ListboxPopupBaseProps, TTrigger extends TriggerElement> = {
  /** Props after merging with the surrounding `<Field>`, if any. */
  props: TProps;
  triggerRef: React.RefObject<TTrigger | null>;
  activeParentRef: React.Ref<TTrigger>;
  activeDescendantController: ActiveDescendantImperativeRef;
  triggerNativeProps: Omit<TProps, 'children'>;
  internalState: ComboboxBaseState;
  listbox: ListboxSlot;
  rootSlot: RootSlot;
};

/**
 * Shared core for `useDropdown` and `useCombobox`. Owns positioning, active-descendant wiring,
 * the listbox slot, the root slot, and the dev-only warning about unsupported
 * `clearable + multiselect` combinations.
 *
 * Consumers layer their own trigger and clear slots on top of the returned pieces.
 *
 * @internal
 */
export function useListboxPopupState<TProps extends ListboxPopupBaseProps, TTrigger extends TriggerElement>(
  initialProps: TProps,
  options: UseListboxPopupStateOptions<TProps>,
): UseListboxPopupStateReturn<TProps, TTrigger> {
  'use no memo';

  const { primarySlotTagName, fieldControlOptions, baseStateExtras, rootDefaultProps } = options;

  const positioningOptions = resolvePositioningShorthand(initialProps.positioning);
  const { targetRef: comboboxTargetRef, containerRef: comboboxPopupRef } = usePositioning(positioningOptions);

  const props = useFieldControlProps_unstable(initialProps, fieldControlOptions) as TProps;

  const {
    listboxRef: activeDescendantListboxRef,
    activeParentRef,
    controller: activeDescendantController,
  } = useActiveDescendant<TTrigger, HTMLDivElement>({
    matchOption: isComboboxOptionElement,
  });

  const internalState = useComboboxBaseState({
    ...props,
    ...baseStateExtras?.(props),
    activeDescendantController,
  });
  const { clearable, multiselect, open } = internalState;

  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName,
    // The cast is needed because `excludedPropNames` is constrained to `Extract<keyof TProps, string>[]`,
    // and TypeScript can't prove `'children'` is a key of the generic `TProps` despite the bound.
    excludedPropNames: ['children'] as Extract<keyof TProps, string>[],
  });

  const triggerRef = React.useRef<TTrigger>(null);

  const listbox = useListboxSlot(props.listbox, useMergedRefs(comboboxPopupRef, activeDescendantListboxRef), {
    state: internalState,
    triggerRef,
    defaultProps: {
      children: props.children,
    },
  });

  const rootSlot = slot.always(props.root ?? undefined, {
    defaultProps: {
      'aria-owns': open ? listbox?.id : undefined,
      ...rootDefaultProps?.(props),
      ...rootNativeProps,
    },
    elementType: 'div',
  }) as RootSlot;
  rootSlot.ref = useMergedRefs(rootSlot.ref, comboboxTargetRef);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- "process.env" does not change in runtime
    React.useEffect(() => {
      if (clearable && multiselect) {
        // eslint-disable-next-line no-console
        console.error(
          `[@fluentui/react-headless-components-preview] "clearable" prop is not supported in multiselect mode.`,
        );
      }
    }, [clearable, multiselect]);
  }

  return {
    props,
    triggerRef,
    activeParentRef,
    activeDescendantController,
    // `getPartitionedNativeProps` returns `Omit<Props, ExcludedPropKeys>` where the excluded keys
    // are inferred from a generic constraint. TS can't prove that simplifies to `Omit<TProps, 'children'>`.
    triggerNativeProps: triggerNativeProps as unknown as Omit<TProps, 'children'>,
    internalState,
    listbox,
    rootSlot,
  };
}

import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { ChevronDownRegular as ChevronDownIcon } from '@fluentui/react-icons';
import {
  getPartitionedNativeProps,
  mergeCallbacks,
  useEventCallback,
  useId,
  useMergedRefs,
  slot,
} from '@fluentui/react-utilities';
import { useComboboxBaseState } from '../../utils/useComboboxBaseState';
import { useComboboxPositioning } from '../../utils/useComboboxPositioning';
import { Listbox } from '../Listbox/Listbox';
import type { SelectionEvents } from '../../utils/Selection.types';
import type { OptionValue } from '../../utils/OptionCollection.types';
import type { ComboboxProps, ComboboxState } from './Combobox.types';
import { useListboxSlot } from '../../utils/useListboxSlot';
import { useInputTriggerSlot } from './useInputTriggerSlot';

/**
 * Create the state required to render Combobox.
 *
 * The returned state can be modified with hooks such as useComboboxStyles_unstable,
 * before being passed to renderCombobox_unstable.
 *
 * @param props - props from this instance of Combobox
 * @param ref - reference to root HTMLElement of Combobox
 */
export const useCombobox_unstable = (props: ComboboxProps, ref: React.Ref<HTMLInputElement>): ComboboxState => {
  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true, supportsRequired: true, supportsSize: true });

  const baseState = useComboboxBaseState({ ...props, editable: true });
  const { open, selectOption, setOpen, setValue, value } = baseState;
  const [comboboxPopupRef, comboboxTargetRef] = useComboboxPositioning(props);
  const { disabled, freeform, inlinePopup } = props;
  const comboId = useId('combobox-');

  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['children', 'size'],
  });

  // reset any typed value when an option is selected
  baseState.selectOption = (ev: SelectionEvents, option: OptionValue) => {
    setValue(undefined);
    selectOption(ev, option);
  };

  baseState.setOpen = (ev, newState: boolean) => {
    if (disabled) {
      return;
    }

    if (!newState && !freeform) {
      setValue(undefined);
    }

    setOpen(ev, newState);
  };

  const triggerRef = React.useRef<HTMLInputElement>(null);

  const listbox = useListboxSlot(props.listbox, comboboxPopupRef, {
    state: baseState,
    triggerRef,
    defaultProps: {
      children: props.children,
    },
  });

  const triggerSlot = useInputTriggerSlot(props.input ?? {}, useMergedRefs(triggerRef, ref), {
    state: baseState,
    freeform,
    defaultProps: {
      type: 'text',
      value: value ?? '',
      ...triggerNativeProps,
    },
  });

  const rootSlot = slot.always(props.root, {
    defaultProps: {
      'aria-owns': !inlinePopup && open ? listbox?.id : undefined,
      ...rootNativeProps,
    },
    elementType: 'div',
  });
  rootSlot.ref = useMergedRefs(rootSlot.ref, comboboxTargetRef);

  const state: ComboboxState = {
    components: { root: 'div', input: 'input', expandIcon: 'span', listbox: Listbox },
    root: rootSlot,
    input: triggerSlot,
    listbox: open ? listbox : undefined,
    expandIcon: slot.optional(props.expandIcon, {
      renderByDefault: true,
      defaultProps: {
        'aria-expanded': open,
        children: <ChevronDownIcon />,
        role: 'button',
      },
      elementType: 'span',
    }),
    ...baseState,
  };

  /* handle open/close + focus change when clicking expandIcon */
  const { onMouseDown: onIconMouseDown } = state.expandIcon || {};

  const onExpandIconMouseDown = useEventCallback(
    mergeCallbacks(onIconMouseDown, (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      state.setOpen(event, !state.open);
      triggerRef.current?.focus();
    }),
  );

  if (state.expandIcon) {
    state.expandIcon.onMouseDown = onExpandIconMouseDown;

    // If there is no explicit aria-label, calculate default accName attribute for expandIcon button,
    // using the following steps:
    // 1. If there is an aria-label, it is "Open [aria-label]"
    // 2. If there is an aria-labelledby, it is "Open [aria-labelledby target]" (using aria-labelledby + ids)
    // 3. If there is no aria-label/ledby attr, it falls back to "Open"
    // We can't fall back to a label/htmlFor name because of https://github.com/w3c/accname/issues/179
    const hasExpandLabel = state.expandIcon['aria-label'] || state.expandIcon['aria-labelledby'];
    const defaultOpenString = 'Open'; // this is english-only since it is the fallback
    if (!hasExpandLabel) {
      if (props['aria-labelledby']) {
        const chevronId = state.expandIcon.id ?? `${comboId}-chevron`;
        const chevronLabelledBy = `${chevronId} ${state.input['aria-labelledby']}`;

        state.expandIcon['aria-label'] = defaultOpenString;
        state.expandIcon.id = chevronId;
        state.expandIcon['aria-labelledby'] = chevronLabelledBy;
      } else if (props['aria-label']) {
        state.expandIcon['aria-label'] = `${defaultOpenString} ${props['aria-label']}`;
      } else {
        state.expandIcon['aria-label'] = defaultOpenString;
      }
    }
  }

  return state;
};

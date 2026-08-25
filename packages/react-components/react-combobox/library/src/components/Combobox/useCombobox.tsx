'use client';

import * as React from 'react';
import { useActiveDescendant } from '@fluentui/react-aria';
import { useFieldContext_unstable, useFieldControlProps_unstable } from '@fluentui/react-field';
import { ChevronDownRegular as ChevronDownIcon, DismissRegular as DismissIcon } from '@fluentui/react-icons';
import {
  getPartitionedNativeProps,
  mergeCallbacks,
  useEventCallback,
  useMergedRefs,
  slot,
  useOnClickOutside,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useComboboxBaseState } from '../../utils/useComboboxBaseState';
import { useComboboxPositioning } from '../../utils/useComboboxPositioning';
import { Listbox } from '../Listbox/Listbox';
import type {
  BaseComboboxProps,
  BaseComboboxState,
  ComboboxOpenEvents,
  ComboboxProps,
  ComboboxState,
} from './Combobox.types';
import { useListboxSlot } from '../../utils/useListboxSlot';
import { useInputTriggerSlot } from './useInputTriggerSlot';
import { useComboboxExpandIconSlot } from './useComboboxExpandIconSlot';
import { isComboboxOptionElement } from '../../utils/isComboboxOptionElement';
import { useTabsterEscapeIgnore } from '../../hooks/useTabsterEscapeIgnore';

/**
 * Create the base state required to render Combobox, without design-only props.
 *
 * @param props - props from this instance of Combobox (without appearance and size)
 * @param ref - reference to root HTMLInputElement of Combobox
 */
export const useComboboxBase_unstable = (
  props: BaseComboboxProps,
  ref: React.Ref<HTMLInputElement>,
): BaseComboboxState => {
  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true, supportsRequired: true });
  const {
    listboxRef: activeDescendantListboxRef,
    activeParentRef,
    controller: activeDescendantController,
  } = useActiveDescendant<HTMLInputElement, HTMLDivElement>({
    matchOption: isComboboxOptionElement,
  });
  const comboboxInternalState = useComboboxBaseState({ ...props, editable: true, activeDescendantController });
  const { appearance: _appearance, size: _size, ...baseState } = comboboxInternalState;

  const { clearable, clearSelection, disabled, multiselect, open, selectedOptions, setOpen, value, hasFocus } =
    baseState;
  const [comboboxPopupRef, comboboxTargetRef] = useComboboxPositioning(props);
  const { disableAutoFocus = false, freeform, inlinePopup } = props;

  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['children'],
  });

  const triggerRef = React.useRef<HTMLInputElement>(null);

  const listbox = useListboxSlot(props.listbox, useMergedRefs(comboboxPopupRef, activeDescendantListboxRef), {
    state: comboboxInternalState,
    triggerRef,
    defaultProps: {
      children: props.children,
      disableAutoFocus,
    },
  });

  const triggerSlot = useInputTriggerSlot(props.input ?? {}, useMergedRefs(triggerRef, activeParentRef, ref), {
    state: comboboxInternalState,
    freeform,
    defaultProps: {
      type: 'text',
      value: value ?? '',
      'aria-controls': open ? listbox?.id : undefined,
      ...triggerNativeProps,
    },
    activeDescendantController,
  });

  const rootSlot = slot.always(props.root, {
    defaultProps: {
      'aria-owns': !inlinePopup && open ? listbox?.id : undefined,
      ...rootNativeProps,
    },
    elementType: 'div',
  });
  rootSlot.ref = useMergedRefs(rootSlot.ref, comboboxTargetRef);

  const showClearIcon = selectedOptions.length > 0 && !disabled && clearable && !multiselect;
  const state: BaseComboboxState = {
    components: { root: 'div', input: 'input', expandIcon: 'span', listbox: Listbox, clearIcon: 'span' },
    root: rootSlot,
    input: triggerSlot,
    listbox: open || hasFocus ? listbox : undefined,
    clearIcon: slot.optional(props.clearIcon, {
      defaultProps: {
        'aria-hidden': 'true',
      },
      elementType: 'span',
      renderByDefault: true,
    }),
    expandIcon: useComboboxExpandIconSlot(props.expandIcon, {
      disabled,
      open,
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      triggerLabelledBy: triggerSlot['aria-labelledby'],
    }),
    showClearIcon,
    activeDescendantController,
    ...baseState,
  };

  const { targetDocument } = useFluent();

  useOnClickOutside({
    element: targetDocument,
    callback: event => setOpen(event as unknown as ComboboxOpenEvents, false),
    refs: [triggerRef, comboboxPopupRef, comboboxTargetRef],
    disabled: !open,
  });

  /* handle open/close + focus change when clicking expandIcon */
  const { onMouseDown: onIconMouseDown } = state.expandIcon || {};

  const onExpandIconMouseDown = useEventCallback(
    // eslint-disable-next-line react-hooks/refs
    mergeCallbacks(onIconMouseDown, (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      state.setOpen(event, !state.open);
      triggerRef.current?.focus();
    }),
  );

  if (state.expandIcon) {
    state.expandIcon.onMouseDown = onExpandIconMouseDown;
  }

  const onClearIconMouseDown = useEventCallback(
    mergeCallbacks(state.clearIcon?.onMouseDown, (ev: React.MouseEvent<HTMLSpanElement>) => {
      ev.preventDefault();
    }),
  );
  const onClearIconClick = useEventCallback(
    mergeCallbacks(state.clearIcon?.onClick, (ev: React.MouseEvent<HTMLSpanElement>) => {
      clearSelection(ev);
    }),
  );

  if (state.clearIcon) {
    state.clearIcon.onMouseDown = onClearIconMouseDown;
    state.clearIcon.onClick = onClearIconClick;
  }

  // Heads up! We don't support "clearable" in multiselect mode, so we should never display a slot
  if (multiselect) {
    state.clearIcon = undefined;
  }

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- "process.env" does not change in runtime
    React.useEffect(() => {
      if (clearable && multiselect) {
        // eslint-disable-next-line no-console
        console.error(`[@fluentui/react-combobox] "clearable" prop is not supported in multiselect mode.`);
      }
    }, [clearable, multiselect]);
  }

  return state;
};

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
  const fieldContext = useFieldContext_unstable();
  const { appearance = 'outline', size = fieldContext?.size ?? 'medium', ...baseProps } = props;
  const baseState = useComboboxBase_unstable(baseProps, ref);

  if (baseState.clearIcon) {
    baseState.clearIcon.children ??= <DismissIcon />;
  }

  if (baseState.expandIcon) {
    baseState.expandIcon.children ??= <ChevronDownIcon />;
  }

  return {
    ...baseState,
    appearance,
    size,
    input: {
      ...useTabsterEscapeIgnore(baseState.input, baseState.open),
      ...baseState.input,
    },
  };
};

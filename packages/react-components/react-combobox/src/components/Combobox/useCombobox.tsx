import * as React from 'react';
import { ChevronDownRegular as ChevronDownIcon } from '@fluentui/react-icons';
import {
  getPartitionedNativeProps,
  resolveShorthand,
  useMergedEventCallbacks,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useComboboxBaseState } from '../../utils/useComboboxBaseState';
import { useTriggerListboxSlots } from '../../utils/useTriggerListboxSlots';
import { useComboboxPopup } from '../../utils/useComboboxPopup';
import { Listbox } from '../Listbox/Listbox';
import type { ComboboxProps, ComboboxState } from './Combobox.types';

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
  const baseState = useComboboxBaseState(props);

  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['children', 'size'],
  });

  const triggerRef = React.useRef<HTMLInputElement>(null);

  const triggerShorthand = resolveShorthand(props.input, {
    required: true,
    defaultProps: {
      onChange: () => {
        /* Combobox does not yet support allowFreeForm */
      },
      ref: useMergedRefs(props.input?.ref, triggerRef),
      type: 'text',
      value: baseState.value,
      ...triggerNativeProps,
    },
  });

  const listboxShorthand = resolveShorthand(props.listbox, { required: true });

  const [triggerWithPopup, listboxWithPopup] = useComboboxPopup(props, triggerShorthand, listboxShorthand);
  const [triggerSlot, listboxSlot] = useTriggerListboxSlots(props, baseState, ref, triggerWithPopup, listboxWithPopup);

  const state: ComboboxState = {
    components: {
      root: 'div',
      input: 'input',
      expandIcon: 'span',
      listbox: Listbox,
    },
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: {
        children: props.children,
        ...rootNativeProps,
      },
    }),
    input: triggerSlot,
    listbox: listboxSlot,
    expandIcon: resolveShorthand(props.expandIcon, {
      required: true,
      defaultProps: {
        children: <ChevronDownIcon />,
      },
    }),
    ...baseState,
  };

  /* handle open/close + focus change when clicking expandIcon */
  const { onMouseDown: onIconMouseDown, onClick: onIconClick } = state.expandIcon || {};
  const onExpandIconMouseDown = useMergedEventCallbacks(onIconMouseDown, () => {
    // do not dismiss on blur when clicking the icon
    baseState.ignoreNextBlur.current = true;
  });

  const onExpandIconClick = useMergedEventCallbacks(onIconClick, (event: React.MouseEvent<HTMLSpanElement>) => {
    // open and set focus
    state.setOpen(event, !state.open);
    triggerRef.current?.focus();
  });

  if (state.expandIcon) {
    state.expandIcon.onMouseDown = onExpandIconMouseDown;
    state.expandIcon.onClick = onExpandIconClick;
  }

  return state;
};

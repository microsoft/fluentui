import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { ChevronDownRegular as ChevronDownIcon } from '@fluentui/react-icons';
import { getPartitionedNativeProps, useMergedRefs, slot } from '@fluentui/react-utilities';
import { useComboboxBaseState } from '../../utils/useComboboxBaseState';
import { useComboboxPositioning } from '../../utils/useComboboxPositioning';
import { Listbox } from '../Listbox/Listbox';
import type { DropdownProps, DropdownState } from './Dropdown.types';
import { useListboxSlot } from '../../utils/useListboxSlot';
import { useButtonTriggerSlot } from './useButtonTriggerSlot';

/**
 * Create the state required to render Dropdown.
 *
 * The returned state can be modified with hooks such as useDropdownStyles_unstable,
 * before being passed to renderDropdown_unstable.
 *
 * @param props - props from this instance of Dropdown
 * @param ref - reference to root HTMLElement of Dropdown
 */
export const useDropdown_unstable = (props: DropdownProps, ref: React.Ref<HTMLButtonElement>): DropdownState => {
  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true, supportsSize: true });

  const baseState = useComboboxBaseState(props);
  const { open, hasFocus } = baseState;

  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'button',
    excludedPropNames: ['children'],
  });

  const [comboboxPopupRef, comboboxTargetRef] = useComboboxPositioning(props);

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listbox = useListboxSlot(props.listbox, comboboxPopupRef, {
    state: baseState,
    triggerRef,
    defaultProps: {
      children: props.children,
    },
  });

  const trigger = useButtonTriggerSlot(props.button ?? {}, useMergedRefs(triggerRef, ref), {
    state: baseState,
    defaultProps: {
      type: 'button',
      tabIndex: 0,
      children: baseState.value || props.placeholder,
      ...triggerNativeProps,
    },
  });

  const rootSlot = slot.always(props.root, {
    defaultProps: {
      'aria-owns': !props.inlinePopup && open ? listbox?.id : undefined,
      children: props.children,
      ...rootNativeProps,
    },
    elementType: 'div',
  });
  rootSlot.ref = useMergedRefs(rootSlot.ref, comboboxTargetRef);

  const state: DropdownState = {
    components: { root: 'div', button: 'button', expandIcon: 'span', listbox: Listbox },
    root: rootSlot,
    button: trigger,
    listbox: open || hasFocus ? listbox : undefined,
    expandIcon: slot.optional(props.expandIcon, {
      renderByDefault: true,
      defaultProps: {
        children: <ChevronDownIcon />,
      },
      elementType: 'span',
    }),
    placeholderVisible: !baseState.value && !!props.placeholder,
    ...baseState,
  };

  return state;
};

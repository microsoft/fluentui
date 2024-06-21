import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { useActiveDescendant } from '@fluentui/react-aria';
import { ChevronDownRegular as ChevronDownIcon, DismissRegular as DismissIcon } from '@fluentui/react-icons';
import {
  getPartitionedNativeProps,
  mergeCallbacks,
  useMergedRefs,
  slot,
  useEventCallback,
} from '@fluentui/react-utilities';
import { useComboboxBaseState } from '../../utils/useComboboxBaseState';
import { useComboboxPositioning } from '../../utils/useComboboxPositioning';
import { Listbox } from '../Listbox/Listbox';
import type { DropdownProps, DropdownState } from './Dropdown.types';
import { useListboxSlot } from '../../utils/useListboxSlot';
import { useButtonTriggerSlot } from './useButtonTriggerSlot';
import { optionClassNames } from '../Option/useOptionStyles.styles';

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
  'use no memo';

  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true, supportsSize: true });
  const {
    listboxRef: activeDescendantListboxRef,
    activeParentRef,
    controller: activeDescendantController,
  } = useActiveDescendant<HTMLButtonElement, HTMLDivElement>({
    matchOption: el => el.classList.contains(optionClassNames.root),
  });

  const baseState = useComboboxBaseState({ ...props, activeDescendantController, freeform: false });
  const { clearable, clearSelection, hasFocus, multiselect, open, selectedOptions } = baseState;

  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'button',
    excludedPropNames: ['children'],
  });

  const [comboboxPopupRef, comboboxTargetRef] = useComboboxPositioning(props);

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listbox = useListboxSlot(props.listbox, useMergedRefs(comboboxPopupRef, activeDescendantListboxRef), {
    state: baseState,
    triggerRef,
    defaultProps: {
      children: props.children,
    },
  });

  const trigger = useButtonTriggerSlot(props.button ?? {}, useMergedRefs(triggerRef, activeParentRef, ref), {
    state: baseState,
    defaultProps: {
      type: 'button',
      tabIndex: 0,
      children: baseState.value || props.placeholder,
      'aria-controls': open ? listbox?.id : undefined,
      ...triggerNativeProps,
    },
    activeDescendantController,
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

  const showClearButton = selectedOptions.length > 0 && clearable && !multiselect;
  const state: DropdownState = {
    components: { root: 'div', button: 'button', clearButton: 'button', expandIcon: 'span', listbox: Listbox },
    root: rootSlot,
    button: trigger,
    listbox: open || hasFocus ? listbox : undefined,
    clearButton: slot.optional(props.clearButton, {
      defaultProps: {
        'aria-label': 'Clear selection',
        children: <DismissIcon />,
        // Safari doesn't allow to focus an element with this
        tabIndex: 0,
        type: 'button',
      },
      elementType: 'button',
      renderByDefault: true,
    }),
    expandIcon: slot.optional(props.expandIcon, {
      renderByDefault: true,
      defaultProps: {
        children: <ChevronDownIcon />,
      },
      elementType: 'span',
    }),
    placeholderVisible: !baseState.value && !!props.placeholder,
    showClearButton,
    activeDescendantController,
    ...baseState,
  };

  const onClearButtonClick = useEventCallback(
    mergeCallbacks(state.clearButton?.onClick, (ev: React.MouseEvent<HTMLButtonElement>) => {
      clearSelection(ev);
      triggerRef.current?.focus();
    }),
  );

  if (state.clearButton) {
    state.clearButton.onClick = onClearButtonClick;
  }

  // Heads up! We don't support "clearable" in multiselect mode, so we should never display a slot
  if (multiselect) {
    state.clearButton = undefined;
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

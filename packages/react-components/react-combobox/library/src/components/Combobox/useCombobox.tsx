import * as React from 'react';
import { useActiveDescendant } from '@fluentui/react-aria';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { ChevronDownRegular as ChevronDownIcon, DismissRegular as DismissIcon } from '@fluentui/react-icons';
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
import type { ComboboxProps, ComboboxState } from './Combobox.types';
import { useListboxSlot } from '../../utils/useListboxSlot';
import { useInputTriggerSlot } from './useInputTriggerSlot';
import { optionClassNames } from '../Option/useOptionStyles.styles';

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
  'use no memo';

  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true, supportsRequired: true, supportsSize: true });
  const {
    listboxRef: activeDescendantListboxRef,
    activeParentRef,
    controller: activeDescendantController,
  } = useActiveDescendant<HTMLInputElement, HTMLDivElement>({
    matchOption: el => el.classList.contains(optionClassNames.root),
  });
  const baseState = useComboboxBaseState({ ...props, editable: true, activeDescendantController });

  const { clearable, clearSelection, disabled, multiselect, open, selectedOptions, value, hasFocus } = baseState;
  const [comboboxPopupRef, comboboxTargetRef] = useComboboxPositioning(props);
  const { freeform, inlinePopup } = props;
  const comboId = useId('combobox-');

  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['children', 'size'],
  });

  const triggerRef = React.useRef<HTMLInputElement>(null);

  const listbox = useListboxSlot(props.listbox, useMergedRefs(comboboxPopupRef, activeDescendantListboxRef), {
    state: baseState,
    triggerRef,
    defaultProps: {
      children: props.children,
    },
  });

  const triggerSlot = useInputTriggerSlot(props.input ?? {}, useMergedRefs(triggerRef, activeParentRef, ref), {
    state: baseState,
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

  const showClearIcon = selectedOptions.length > 0 && clearable && !multiselect;
  const state: ComboboxState = {
    components: { root: 'div', input: 'input', expandIcon: 'span', listbox: Listbox, clearIcon: 'span' },
    root: rootSlot,
    input: triggerSlot,
    listbox: open || hasFocus ? listbox : undefined,
    clearIcon: slot.optional(props.clearIcon, {
      defaultProps: {
        'aria-hidden': 'true',
        children: <DismissIcon />,
      },
      elementType: 'span',
      renderByDefault: true,
    }),
    expandIcon: slot.optional(props.expandIcon, {
      renderByDefault: true,
      defaultProps: {
        'aria-disabled': disabled ? 'true' : undefined,
        'aria-expanded': open,
        children: <ChevronDownIcon />,
        role: 'button',
      },
      elementType: 'span',
    }),
    showClearIcon,
    activeDescendantController,
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

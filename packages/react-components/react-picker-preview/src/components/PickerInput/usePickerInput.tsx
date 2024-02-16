import * as React from 'react';
import type { PickerInputProps, PickerInputState } from './PickerInput.types';
import { ChevronDownRegular as ChevronDownIcon, DismissRegular as DismissIcon } from '@fluentui/react-icons';
import { useActiveDescendantContext } from '@fluentui/react-aria';
import { usePickerContext_unstable } from '../../contexts/PickerContext';
import { useInputTriggerSlot } from '@fluentui/react-combobox';
import {
  slot,
  useMergedRefs,
  getIntrinsicElementProps,
  useEventCallback,
  mergeCallbacks,
} from '@fluentui/react-utilities';
import { usePickerControlContext } from '../../contexts/PickerControlContext';

/**
 * Create the state required to render PickerInput.
 *
 * The returned state can be modified with hooks such as usePickerInputStyles_unstable,
 * before being passed to renderPickerInput_unstable.
 *
 * @param props - props from this instance of PickerInput
 * @param ref - reference to root HTMLDivElement of PickerInput
 */
export const usePickerInput_unstable = (props: PickerInputProps, ref: React.Ref<HTMLDivElement>): PickerInputState => {
  const { controller: activeDescendantController } = useActiveDescendantContext();
  const { size, clearable, disabled } = usePickerControlContext();
  const {
    triggerRef,
    clearSelection,
    getOptionById,
    open,
    selectOption,
    selectedOptions,
    setHasFocus,
    setOpen,
    setValue,
    multiselect,
    value,
    popoverId,
  } = usePickerContext();

  const root = useInputTriggerSlot({}, useMergedRefs(triggerRef, ref) as React.RefObject<HTMLInputElement>, {
    activeDescendantController,
    freeform: props.freeform,
    defaultProps: {
      type: 'text',
      value: value ?? '',
      'aria-controls': open ? popoverId : undefined,
      disabled,
      ...getIntrinsicElementProps('input', props),
    },
    state: {
      clearSelection,
      getOptionById,
      open,
      selectedOptions,
      selectOption,
      setHasFocus,
      setOpen,
      setValue,
      multiselect,
      value,
    },
  });

  const onKeydownBase = root.onKeyDown;
  root.onKeyDown = useEventCallback(e => {
    onKeydownBase?.(e);
    if (e.key === 'Enter') {
      setOpen(e, false);
    }

    if (e.key === 'Backspace' && value?.length === 0 && selectedOptions.length) {
      const toDismiss = selectedOptions[selectedOptions.length - 1];
      selectOption(e, {
        value: toDismiss,
        // These values no longer exist because the option has unregistered itself
        // for the purposes of selection - these values aren't actually used
        id: 'ERROR_DO_NOT_USE',
        text: 'ERROR_DO_NOT_USE',
      });
    }
  });

  const state: PickerInputState = {
    components: {
      root: 'input',
      clearIcon: 'span',
      expandIcon: 'span',
    },
    root,
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
        'aria-expanded': open,
        children: <ChevronDownIcon />,
        role: 'button',
      },
      elementType: 'span',
    }),
    size,
    clearable,
    disabled,
    showClearIcon: selectedOptions.length > 0 && clearable && !multiselect,
  };

  /* handle open/close + focus change when clicking expandIcon */
  const { onMouseDown: onIconMouseDown } = state.expandIcon || {};

  const onExpandIconMouseDown = useEventCallback(
    mergeCallbacks(onIconMouseDown, (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
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

  return state;
};

function usePickerContext() {
  return {
    triggerRef: usePickerContext_unstable(ctx => ctx.triggerRef),
    clearSelection: usePickerContext_unstable(ctx => ctx.clearSelection),
    getOptionById: usePickerContext_unstable(ctx => ctx.getOptionById),
    open: usePickerContext_unstable(ctx => ctx.open),
    selectOption: usePickerContext_unstable(ctx => ctx.selectOption),
    selectedOptions: usePickerContext_unstable(ctx => ctx.selectedOptions),
    setHasFocus: usePickerContext_unstable(ctx => ctx.setHasFocus),
    setOpen: usePickerContext_unstable(ctx => ctx.setOpen),
    setValue: usePickerContext_unstable(ctx => ctx.setValue),
    multiselect: usePickerContext_unstable(ctx => ctx.multiselect),
    value: usePickerContext_unstable(ctx => ctx.value),
    popoverId: usePickerContext_unstable(ctx => ctx.popoverId),
  };
}

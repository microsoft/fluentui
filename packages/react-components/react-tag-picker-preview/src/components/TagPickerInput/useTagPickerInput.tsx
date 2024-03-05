import * as React from 'react';
import type { TagPickerInputProps, TagPickerInputState } from './TagPickerInput.types';
import { ChevronDownRegular as ChevronDownIcon, DismissRegular as DismissIcon } from '@fluentui/react-icons';
import { useActiveDescendantContext } from '@fluentui/react-aria';
import { useTagPickerContext_unstable } from '../../contexts/TagPickerContext';
import {
  slot,
  useMergedRefs,
  getIntrinsicElementProps,
  useEventCallback,
  mergeCallbacks,
} from '@fluentui/react-utilities';
import { useTagPickerControlContext } from '../../contexts/TagPickerControlContext';
import { useInputTriggerSlot } from '../../utils/useInputTriggerSlot';

/**
 * Create the state required to render TagPickerInput.
 *
 * The returned state can be modified with hooks such as useTagPickerInputStyles_unstable,
 * before being passed to renderTagPickerInput_unstable.
 *
 * @param props - props from this instance of TagPickerInput
 * @param ref - reference to root HTMLDivElement of TagPickerInput
 */
export const useTagPickerInput_unstable = (
  props: TagPickerInputProps,
  ref: React.Ref<HTMLDivElement>,
): TagPickerInputState => {
  const { controller: activeDescendantController } = useActiveDescendantContext();
  const { size, clearable, disabled } = useTagPickerControlContext();
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
    popoverId,
    value: contextValue,
  } = usePickerContext();

  const { value = contextValue } = props;

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
      value: props.value,
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

  const state: TagPickerInputState = {
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
    triggerRef: useTagPickerContext_unstable(ctx => ctx.triggerRef),
    clearSelection: useTagPickerContext_unstable(ctx => ctx.clearSelection),
    getOptionById: useTagPickerContext_unstable(ctx => ctx.getOptionById),
    open: useTagPickerContext_unstable(ctx => ctx.open),
    selectOption: useTagPickerContext_unstable(ctx => ctx.selectOption),
    selectedOptions: useTagPickerContext_unstable(ctx => ctx.selectedOptions),
    setHasFocus: useTagPickerContext_unstable(ctx => ctx.setHasFocus),
    setOpen: useTagPickerContext_unstable(ctx => ctx.setOpen),
    setValue: useTagPickerContext_unstable(ctx => ctx.setValue),
    multiselect: useTagPickerContext_unstable(ctx => ctx.multiselect),
    value: useTagPickerContext_unstable(ctx => ctx.value),
    popoverId: useTagPickerContext_unstable(ctx => ctx.popoverId),
  };
}

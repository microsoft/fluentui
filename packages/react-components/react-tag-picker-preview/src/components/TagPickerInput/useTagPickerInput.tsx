import * as React from 'react';
import * as ReactDOM from 'react-dom';
import type { TagPickerInputProps, TagPickerInputState } from './TagPickerInput.types';
import { ChevronDownRegular as ChevronDownIcon } from '@fluentui/react-icons';
import { useActiveDescendantContext } from '@fluentui/react-aria';
import { useTagPickerContext_unstable } from '../../contexts/TagPickerContext';
import {
  slot,
  useMergedRefs,
  getIntrinsicElementProps,
  useEventCallback,
  mergeCallbacks,
} from '@fluentui/react-utilities';
import { useInputTriggerSlot } from '../../utils/useInputTriggerSlot';
import { Backspace, Enter } from '@fluentui/keyboard-keys';

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
  ref: React.Ref<HTMLInputElement>,
): TagPickerInputState => {
  const { controller: activeDescendantController } = useActiveDescendantContext();
  const size = useTagPickerContext_unstable(ctx => ctx.size);
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

  const { value = contextValue, disabled } = props;

  const root = useInputTriggerSlot(
    {
      type: 'text',
      value: value ?? '',
      'aria-controls': open ? popoverId : undefined,
      disabled,
      ...getIntrinsicElementProps('input', props),
      onKeyDown: useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        props.onKeyDown?.(event);
        if (event.key === Enter) {
          ReactDOM.unstable_batchedUpdates(() => {
            setValue(undefined);
            setOpen(event, false);
          });
        }

        if (event.key === Backspace && value?.length === 0 && selectedOptions.length) {
          const toDismiss = selectedOptions[selectedOptions.length - 1];
          selectOption(event, {
            value: toDismiss,
            // These values no longer exist because the option has unregistered itself
            // for the purposes of selection - these values aren't actually used
            id: 'ERROR_DO_NOT_USE',
            text: 'ERROR_DO_NOT_USE',
          });
        }
      }),
    },
    useMergedRefs(triggerRef, ref),
    {
      activeDescendantController,
      freeform: props.freeform,
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
    },
  );

  const state: TagPickerInputState = {
    components: {
      root: 'input',
      expandIcon: 'span',
    },
    root,
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

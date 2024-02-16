import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { ChevronDownRegular as ChevronDownIcon, DismissRegular as DismissIcon } from '@fluentui/react-icons';
import { useActiveDescendantContext } from '@fluentui/react-aria';
import type { PickerButtonProps, PickerButtonState } from './PickerButton.types';
import { usePickerContext_unstable } from '../../contexts/PickerContext';
import { useButtonTriggerSlot } from '@fluentui/react-combobox';

/**
 * Create the state required to render PickerButton.
 *
 * The returned state can be modified with hooks such as usePickerButtonStyles_unstable,
 * before being passed to renderPickerButton_unstable.
 *
 * @param props - props from this instance of PickerButton
 * @param ref - reference to root HTMLDivElement of PickerButton
 */
export const usePickerButton_unstable = (
  props: PickerButtonProps,
  ref: React.Ref<HTMLDivElement>,
): PickerButtonState => {
  const { clearable = false, size = 'medium', disabled = false } = props;
  const { controller: activeDescendantController } = useActiveDescendantContext();
  const {
    triggerRef,
    getOptionById,
    open,
    selectOption,
    setHasFocus,
    setOpen,
    multiselect,
    value,
    popoverId,
    hasSelectedOption,
  } = usePickerContext();
  const root = useButtonTriggerSlot({}, triggerRef as React.RefObject<HTMLButtonElement>, {
    activeDescendantController,
    defaultProps: {
      type: 'button',
      tabIndex: 0,
      children: value || props.placeholder,
      'aria-controls': open ? popoverId : undefined,
    },
    state: {
      getOptionById,
      open,
      selectOption,
      setHasFocus,
      setOpen,
      multiselect,
    },
  });

  const state: PickerButtonState = {
    components: {
      root: 'button',
      clearButton: 'button',
      expandIcon: 'span',
    },
    root,
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

    clearable,
    size,
    disabled,
    showClearIcon: false,
    hasSelectedOption,
  };

  // Heads up! We don't support "clearable" in multiselect mode, so we should never display a slot
  if (multiselect) {
    state.clearButton = undefined;
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
    hasSelectedOption: usePickerContext_unstable(ctx => ctx.selectedOptions.length > 0),
  };
}

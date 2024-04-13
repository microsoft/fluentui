import * as React from 'react';
import { useActiveDescendantContext } from '@fluentui/react-aria';
import type { TagPickerButtonProps, TagPickerButtonState } from './TagPickerButton.types';
import { useTagPickerContext } from '../../contexts/TagPickerContext';
import { useButtonTriggerSlot } from '@fluentui/react-combobox';

/**
 * Create the state required to render PickerButton.
 *
 * The returned state can be modified with hooks such as usePickerButtonStyles,
 * before being passed to renderPickerButton.
 *
 * @param props - props from this instance of PickerButton
 * @param ref - reference to root HTMLDivElement of PickerButton
 */
export const useTagPickerButton = (
  props: TagPickerButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): TagPickerButtonState => {
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
  // casting is required here as triggerRef can either be button or input,
  // but in this case we can assure it's a button
  const root = useButtonTriggerSlot(props, triggerRef as React.RefObject<HTMLButtonElement>, {
    activeDescendantController,
    defaultProps: {
      type: 'button',
      tabIndex: 0,
      children: value || props.placeholder,
      'aria-controls': open ? popoverId : undefined,
      ref,
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

  const size = useTagPickerContext(ctx => ctx.size);

  const state: TagPickerButtonState = {
    components: {
      root: 'button',
    },
    root,
    size,
    hasSelectedOption,
  };

  return state;
};

function usePickerContext() {
  return {
    triggerRef: useTagPickerContext(ctx => ctx.triggerRef),
    clearSelection: useTagPickerContext(ctx => ctx.clearSelection),
    getOptionById: useTagPickerContext(ctx => ctx.getOptionById),
    open: useTagPickerContext(ctx => ctx.open),
    selectOption: useTagPickerContext(ctx => ctx.selectOption),
    selectedOptions: useTagPickerContext(ctx => ctx.selectedOptions),
    setHasFocus: useTagPickerContext(ctx => ctx.setHasFocus),
    setOpen: useTagPickerContext(ctx => ctx.setOpen),
    setValue: useTagPickerContext(ctx => ctx.setValue),
    multiselect: useTagPickerContext(ctx => ctx.multiselect),
    value: useTagPickerContext(ctx => ctx.value),
    popoverId: useTagPickerContext(ctx => ctx.popoverId),
    hasSelectedOption: useTagPickerContext(ctx => ctx.selectedOptions.length > 0),
  };
}

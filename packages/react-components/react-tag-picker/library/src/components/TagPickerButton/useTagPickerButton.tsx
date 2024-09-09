import * as React from 'react';
import { useActiveDescendantContext } from '@fluentui/react-aria';
import type { TagPickerButtonProps, TagPickerButtonState } from './TagPickerButton.types';
import { useTagPickerContext_unstable } from '../../contexts/TagPickerContext';
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
export const useTagPickerButton_unstable = (
  props: TagPickerButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): TagPickerButtonState => {
  const { controller: activeDescendantController } = useActiveDescendantContext();
  const triggerRef = useTagPickerContext_unstable(ctx => ctx.triggerRef);
  const open = useTagPickerContext_unstable(ctx => ctx.open);
  const value = useTagPickerContext_unstable(ctx => ctx.value);
  const hasSelectedOption = useTagPickerContext_unstable(ctx => ctx.selectedOptions.length > 0);
  const popoverId = useTagPickerContext_unstable(ctx => ctx.popoverId);
  const getOptionById = useTagPickerContext_unstable(ctx => ctx.getOptionById);
  const selectOption = useTagPickerContext_unstable(ctx => ctx.selectOption);
  const setHasFocus = useTagPickerContext_unstable(ctx => ctx.setHasFocus);
  const setOpen = useTagPickerContext_unstable(ctx => ctx.setOpen);

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
      multiselect: true,
    },
  });

  const size = useTagPickerContext_unstable(ctx => ctx.size);

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

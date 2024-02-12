import * as React from 'react';
import type { PickerButtonProps, PickerButtonState } from './PickerButton.types';
import { useActiveDescendantContext } from '@fluentui/react-aria';
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
  const { controller: activeDescendantController } = useActiveDescendantContext();
  const triggerRef = usePickerContext_unstable(ctx => ctx.triggerRef);
  const getOptionById = usePickerContext_unstable(ctx => ctx.getOptionById);
  const open = usePickerContext_unstable(ctx => ctx.open);
  const selectOption = usePickerContext_unstable(ctx => ctx.selectOption);
  const setHasFocus = usePickerContext_unstable(ctx => ctx.setHasFocus);
  const setOpen = usePickerContext_unstable(ctx => ctx.setOpen);
  const multiselect = usePickerContext_unstable(ctx => ctx.multiselect);
  const value = usePickerContext_unstable(ctx => ctx.value);
  const popoverId = usePickerContext_unstable(ctx => ctx.popoverId);
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

  return {
    components: {
      root: 'button',
    },
    root,
  };
};

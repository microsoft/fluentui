import * as React from 'react';
import { DefaultInfoButtonIcon } from './DefaultInfoButtonIcon';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { OnOpenChangeData, OpenPopoverEvents, Popover, PopoverSurface } from '@fluentui/react-popover';
import { useControllableState } from '@fluentui/react-utilities';
import type { InfoButtonProps, InfoButtonState } from './InfoButton.types';
import type { PopoverProps } from '@fluentui/react-popover';

/**
 * Create the state required to render InfoButton.
 *
 * The returned state can be modified with hooks such as useInfoButtonStyles_unstable,
 * before being passed to renderInfoButton_unstable.
 *
 * @param props - props from this instance of InfoButton
 * @param ref - reference to root HTMLElement of InfoButton
 */
export const useInfoButton_unstable = (props: InfoButtonProps, ref: React.Ref<HTMLElement>): InfoButtonState => {
  const state: InfoButtonState = {
    components: {
      root: 'button',
      popover: Popover,
      content: PopoverSurface,
    },

    root: getNativeElementProps('button', {
      children: <DefaultInfoButtonIcon />,
      type: 'button',
      ...props,
      ref,
    }),
    popover: resolveShorthand(props.popover, {
      required: true,
      defaultProps: {
        children: <></>,
        positioning: 'above-start',
        size: 'small',
        withArrow: true,
      },
    }),
    content: resolveShorthand(props.content, {
      required: true,
      defaultProps: {
        role: 'dialog',
      },
    }),
  };

  const [popoverOpen, setPopoverOpen] = useControllableState({
    state: (props.popover as PopoverProps)?.open,
    defaultState: (props.popover as PopoverProps)?.defaultOpen,
    initialState: false,
  });

  const handleOnPopoverChange = React.useCallback(
    (e: OpenPopoverEvents, data: OnOpenChangeData) => {
      (props.popover as PopoverProps)?.onOpenChange?.(e, data);
      setPopoverOpen(data.open);
    },
    [props.popover, setPopoverOpen],
  );

  state.popover.open = popoverOpen;
  state.popover.onOpenChange = handleOnPopoverChange;

  return state;
};

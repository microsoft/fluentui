import * as React from 'react';
import { DefaultInfoButtonIcon } from './DefaultInfoButtonIcon';
import { OnOpenChangeData, OpenPopoverEvents, Popover, PopoverSurface } from '@fluentui/react-popover';
import { resolveShorthand } from '@fluentui/react-utilities';
import { useControllableState } from '@fluentui/react-utilities';
import type { InfoButtonProps, InfoButtonState } from './InfoButton.types';

/**
 * Create the state required to render InfoButton.
 *
 * The returned state can be modified with hooks such as useInfoButtonStyles_unstable,
 * before being passed to renderInfoButton_unstable.
 *
 * @param props - props from this instance of InfoButton
 */
export const useInfoButton_unstable = (props: InfoButtonProps): InfoButtonState => {
  const [popoverOpen, setPopoverOpen] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  const handleOnPopoverChange = (e: OpenPopoverEvents, data: OnOpenChangeData) => {
    props.onOpenChange?.(e, data);
    setPopoverOpen(data.open);
  };

  return {
    popoverOpen,

    components: {
      root: Popover,
      button: 'button',
      content: PopoverSurface,
    },

    root: {
      children: <></>,
      size: 'small',
      withArrow: true,
      positioning: 'above-start',
      ...props,
      open: popoverOpen,
      onOpenChange: handleOnPopoverChange,
    },
    content: resolveShorthand(props.content, {
      required: true,
      defaultProps: {
        role: 'dialog',
      },
    }),
    button: resolveShorthand(props.button, {
      required: true,
      defaultProps: {
        children: <DefaultInfoButtonIcon />,
        type: 'button',
      },
    }),
  };
};

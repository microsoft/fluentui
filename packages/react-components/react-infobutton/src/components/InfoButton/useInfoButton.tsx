import * as React from 'react';
import { DefaultInfoButtonIcon } from './DefaultInfoButtonIcon';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { OnOpenChangeData, OpenPopoverEvents, PopoverSurface } from '@fluentui/react-popover';
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
export const useInfoButton_unstable = (props: InfoButtonProps, ref: React.Ref<HTMLElement>): InfoButtonState => {
  const { positioning = 'above-start', size = 'small', withArrow = true, open, defaultOpen, onOpenChange } = props;

  const [popoverOpen, setPopoverOpen] = useControllableState({
    state: open,
    defaultState: defaultOpen,
    initialState: false,
  });

  const handleOnPopoverChange = (e: OpenPopoverEvents, data: OnOpenChangeData) => {
    onOpenChange?.(e, data);
    setPopoverOpen(data.open);
  };

  return {
    open: popoverOpen,
    onOpenChange: handleOnPopoverChange,
    positioning,
    size,
    withArrow,

    components: {
      root: 'button',
      popoverSurface: PopoverSurface,
    },

    root: getNativeElementProps('button', {
      children: <DefaultInfoButtonIcon />,
      type: 'button',
      ...props,
      ref,
    }),
    popoverSurface: resolveShorthand(props.popoverSurface, {
      required: true,
      defaultProps: {
        role: 'dialog',
      },
    }),
  };
};

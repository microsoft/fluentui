import * as React from 'react';
import { DefaultInfoButtonIcon12, DefaultInfoButtonIcon16, DefaultInfoButtonIcon20 } from './DefaultInfoButtonIcons';
import { getNativeElementProps, mergeCallbacks, resolveShorthand } from '@fluentui/react-utilities';
import { Popover, PopoverSurface } from '@fluentui/react-popover';
import { useControllableState } from '@fluentui/react-utilities';
import type { InfoButtonProps, InfoButtonState } from './InfoButton.types';
import type { PopoverProps } from '@fluentui/react-popover';

const infoButtonIconMap = {
  small: <DefaultInfoButtonIcon12 />,
  medium: <DefaultInfoButtonIcon16 />,
  large: <DefaultInfoButtonIcon20 />,
} as const;

const popoverSizeMap = {
  small: 'small',
  medium: 'small',
  large: 'medium',
} as const;

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
  const { size = 'medium' } = props;

  const state: InfoButtonState = {
    size,

    components: {
      root: 'button',
      popover: Popover as React.FC<Partial<PopoverProps>>,
      info: PopoverSurface,
    },

    root: getNativeElementProps('button', {
      children: infoButtonIconMap[size],
      type: 'button',
      'aria-label': 'information',
      ...props,
      ref,
    }),
    popover: resolveShorthand(props.popover, {
      required: true,
      defaultProps: {
        positioning: 'above-start',
        size: popoverSizeMap[size],
        withArrow: true,
      },
    }),
    info: resolveShorthand(props.info, {
      required: true,
      defaultProps: {
        role: 'note',
        tabIndex: -1,
      },
    }),
  };

  const [popoverOpen, setPopoverOpen] = useControllableState({
    state: state.popover.open,
    defaultState: state.popover.defaultOpen,
    initialState: false,
  });

  state.popover.open = popoverOpen;
  state.popover.onOpenChange = mergeCallbacks(state.popover.onOpenChange, (e, data) => setPopoverOpen(data.open));

  return state;
};

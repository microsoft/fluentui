import * as React from 'react';
import { DefaultInfoButtonIcon12, DefaultInfoButtonIcon16, DefaultInfoButtonIcon20 } from './DefaultInfoButtonIcons';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  useControllableState,
  slot,
  useMergedRefs,
  elementContains,
  useEventCallback,
} from '@fluentui/react-utilities';
import { Popover, PopoverSurface } from '@fluentui/react-popover';
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
 * @param ref - reference to root HTMLButtonElement of InfoButton
 */
export const useInfoButton_unstable = (props: InfoButtonProps, ref: React.Ref<HTMLButtonElement>): InfoButtonState => {
  const { size = 'medium', inline = true } = props;

  const rootRef = useMergedRefs(ref);

  const state: InfoButtonState = {
    inline,
    size,

    components: {
      root: 'button',
      popover: Popover as React.FC<Partial<PopoverProps>>,
      info: PopoverSurface,
    },

    root: slot.always(
      getIntrinsicElementProps('button', {
        children: infoButtonIconMap[size],
        type: 'button',
        'aria-label': 'information',
        ...props,
        ref: rootRef,
      }),
      { elementType: 'button' },
    ),
    popover: slot.always(props.popover, {
      defaultProps: {
        inline,
        positioning: 'above-start',
        size: popoverSizeMap[size],
        withArrow: true,
      },
      elementType: Popover as React.FC<Partial<Omit<PopoverProps, 'openOnHover'>>>,
    }),
    info: slot.always(props.info, {
      defaultProps: {
        role: 'note',
        tabIndex: -1,
      },
      elementType: PopoverSurface,
    }),
  };

  const [popoverOpen, setPopoverOpen] = useControllableState({
    state: state.popover.open,
    defaultState: state.popover.defaultOpen,
    initialState: false,
  });

  state.popover.open = popoverOpen;
  state.popover.onOpenChange = mergeCallbacks(state.popover.onOpenChange, (e, data) => setPopoverOpen(data.open));

  const infoRef = useMergedRefs(state.info.ref);
  state.info.ref = infoRef;

  // Hide the popover when focus moves out of the button and popover
  const onBlurButtonOrInfo = (e: React.FocusEvent) => {
    const nextFocused = e.relatedTarget;
    if (rootRef.current !== nextFocused && !elementContains(infoRef.current, nextFocused)) {
      setPopoverOpen(false);
    }
  };

  state.root.onBlur = useEventCallback(mergeCallbacks(state.root.onBlur, onBlurButtonOrInfo));
  state.info.onBlurCapture = useEventCallback(mergeCallbacks(state.info.onBlurCapture, onBlurButtonOrInfo));

  return state;
};

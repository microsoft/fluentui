'use client';

import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  useControllableState,
  slot,
  useMergedRefs,
  elementContains,
  useEventCallback,
} from '@fluentui/react-utilities';

import type { InfoButtonProps, InfoButtonState } from './InfoButton.types';
import { Popover, PopoverSurface } from '../../Popover';
import type { PopoverProps } from '../../Popover';

/**
 * Create the state required to render InfoButton.
 *
 * @param props - props from this instance of InfoButton
 * @param ref - reference to root HTMLButtonElement of InfoButton
 */
export const useInfoButton = (props: InfoButtonProps, ref: React.Ref<HTMLButtonElement>): InfoButtonState => {
  const { popover, info, ...rest } = props;

  const rootRef = useMergedRefs(ref);

  const state: InfoButtonState = {
    components: {
      root: 'button',
      popover: Popover as React.FC<Partial<PopoverProps>>,
      info: PopoverSurface,
    },

    root: slot.always(
      // eslint-disable-next-line react-hooks/refs
      getIntrinsicElementProps('button', {
        type: 'button',
        'aria-label': 'information',
        ...rest,
        ref: rootRef,
      }),
      { elementType: 'button' },
    ),
    popover: slot.always(popover, {
      defaultProps: {
        positioning: 'above-start',
        withArrow: true,
      },
      elementType: Popover as React.FC<Partial<Omit<PopoverProps, 'openOnHover'>>>,
    }),
    info: slot.always(info, {
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
  state.popover.onOpenChange = mergeCallbacks(state.popover.onOpenChange, (_e, data) => setPopoverOpen(data.open));

  const infoRef = useMergedRefs(state.info.ref);
  state.info.ref = infoRef;

  React.useEffect(() => {
    if (!popoverOpen) {
      return;
    }

    // InfoButton pattern requires focusing the surface first so content is read in order.
    infoRef.current?.focus();
  }, [popoverOpen, infoRef]);

  // Hide the popover when focus moves out of the button and popover
  const onBlurButtonOrInfo = (e: React.FocusEvent) => {
    const nextFocused = e.relatedTarget;

    if (!nextFocused || (rootRef.current !== nextFocused && !elementContains(infoRef.current, nextFocused))) {
      setPopoverOpen(false);
    }
  };

  // eslint-disable-next-line react-hooks/refs
  state.root.onBlur = useEventCallback(mergeCallbacks(state.root.onBlur, onBlurButtonOrInfo));
  // eslint-disable-next-line react-hooks/refs
  state.info.onBlurCapture = useEventCallback(mergeCallbacks(state.info.onBlurCapture, onBlurButtonOrInfo));
  return state;
};

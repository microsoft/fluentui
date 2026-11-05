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
  useId,
} from '@fluentui/react-utilities';

import type { InfoButtonProps, InfoButtonState } from './InfoButton.types';
import { Popover, PopoverSurface } from '../../Popover';
import type { PopoverProps } from '../../Popover';
import { toDataAttributeValue } from '../../../utils';

/**
 * Create the state required to render InfoButton.
 *
 * @param props - props from this instance of InfoButton
 * @param ref - reference to root HTMLButtonElement of InfoButton
 */
export const useInfoButton = (props: InfoButtonProps, ref: React.Ref<HTMLButtonElement>): InfoButtonState => {
  const { popover, info, ...rest } = props;

  const rootRef = useMergedRefs(ref);
  const buttonId = useId('info-button-', rest.id);
  const popoverSlot = slot.always(popover, {
    defaultProps: {
      positioning: 'above-start',
      withArrow: true,
    },
    elementType: Popover as React.ComponentType<Partial<Omit<PopoverProps, 'openOnHover'>>>,
  });

  const state: InfoButtonState = {
    components: {
      root: 'button',
      popover: Popover as React.ComponentType<Partial<PopoverProps>>,
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
    popover: popoverSlot,
    info: slot.always(info, {
      defaultProps: {
        as: popoverSlot.inertTrapFocus ? 'dialog' : 'div',
        role: popoverSlot.inertTrapFocus ? 'dialog' : 'note',
        tabIndex: -1,
      },
      elementType: PopoverSurface,
    }),
  };

  if (state.popover.inertTrapFocus) {
    state.root.id ??= buttonId;
    if (state.info['aria-label'] === undefined && state.info['aria-labelledby'] === undefined) {
      state.info['aria-labelledby'] = state.root.id;
    }
  }

  const [popoverOpen, setPopoverOpen] = useControllableState({
    state: state.popover.open,
    defaultState: state.popover.defaultOpen,
    initialState: false,
  });

  state.popover.open = popoverOpen;
  // InfoButton consumes defaultOpen; the nested Popover receives only the resolved open state.
  state.popover.defaultOpen = undefined;
  state.root['data-open'] = toDataAttributeValue(popoverOpen);
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
  const onBlurButtonOrInfo: React.FocusEventHandler<HTMLElement> = e => {
    const nextFocused = e.relatedTarget;

    if (!nextFocused || (rootRef.current !== nextFocused && !elementContains(infoRef.current, nextFocused))) {
      setPopoverOpen(false);
    }
  };

  // eslint-disable-next-line react-hooks/refs
  state.root.onBlur = useEventCallback(mergeCallbacks(state.root.onBlur, onBlurButtonOrInfo));
  const onInfoBlurCapture = state.info.onBlurCapture as React.FocusEventHandler<HTMLElement> | undefined;
  // eslint-disable-next-line react-hooks/refs
  state.info.onBlurCapture = useEventCallback(mergeCallbacks(onInfoBlurCapture, onBlurButtonOrInfo));
  return state;
};

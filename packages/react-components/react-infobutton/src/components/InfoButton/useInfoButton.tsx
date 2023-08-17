import * as React from 'react';
import { DefaultInfoButtonIcon12, DefaultInfoButtonIcon16, DefaultInfoButtonIcon20 } from './DefaultInfoButtonIcons';
import {
  getNativeElementProps,
  mergeCallbacks,
  useControllableState,
  slot,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { Popover, PopoverSurface } from '@fluentui/react-popover';
import { useFocusFinders } from '@fluentui/react-tabster';
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
  const { findAllFocusable } = useFocusFinders();
  const { size = 'medium' } = props;

  const state: InfoButtonState = {
    size,

    components: {
      root: 'button',
      popover: Popover as React.FC<Partial<PopoverProps>>,
      info: PopoverSurface,
    },

    root: slot.always(
      getNativeElementProps('button', {
        children: infoButtonIconMap[size],
        type: 'button',
        'aria-label': 'information',
        ...props,
        ref,
      }),
      { elementType: 'button' },
    ),
    popover: slot.always(props.popover, {
      defaultProps: {
        positioning: 'above-start',
        size: popoverSizeMap[size],
        withArrow: true,
      },
      elementType: Popover as React.FC<Partial<PopoverProps>>,
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

  const closeOnTabBack = (ev: KeyboardEvent) => {
    if (ev.shiftKey && ev.key === 'Tab') {
      setPopoverOpen(false);
    }
  };
  const closeOnTabForward = (ev: KeyboardEvent) => {
    if (ev.key === 'Tab') {
      setPopoverOpen(false);
    }
  };

  // This ref creates the event listeners needed to dismiss the popover when tabbing out of the surface
  const infoTabDismissRef = (element: HTMLDivElement) => {
    if (element) {
      const focusableElements = findAllFocusable(element);

      if (focusableElements.length > 0) {
        // We need two events, one for the surface in case the popover is opened but tabbed back right away and one for
        // the first item since the surface can only be focused programmatically because of its tabIndex = -1
        element.addEventListener('keydown', closeOnTabBack);
        focusableElements[0].addEventListener(
          'keydown',
          focusableElements.length > 1 ? closeOnTabBack : mergeCallbacks(closeOnTabBack, closeOnTabForward),
        );

        if (focusableElements.length > 1) {
          focusableElements[focusableElements.length - 1].addEventListener('keydown', closeOnTabForward);
        }
      } else {
        element.addEventListener('blur', () => {
          setPopoverOpen(false);
        });
      }
    }
  };

  state.info.ref = useMergedRefs(state.info.ref, infoTabDismissRef);

  return state;
};

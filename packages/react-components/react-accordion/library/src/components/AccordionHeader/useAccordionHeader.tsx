'use client';

import * as React from 'react';
import { useEventCallback, slot, isResolvedShorthand } from '@fluentui/react-utilities';
import { useARIAButtonProps } from '@fluentui/react-aria';
import type {
  AccordionHeaderBaseProps,
  AccordionHeaderBaseState,
  AccordionHeaderProps,
  AccordionHeaderState,
} from './AccordionHeader.types';
import { useAccordionContext_unstable } from '../../contexts/accordion';
import { bundleIcon, ChevronRightFilled, ChevronRightRegular } from '@fluentui/react-icons';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useAccordionItemContext_unstable } from '../../contexts/accordionItem';
import { motionTokens } from '@fluentui/react-motion';

const ChevronRightIcon = bundleIcon(ChevronRightFilled, ChevronRightRegular);

/**
 * Returns the props and state required to render the component
 *
 * @param props - AccordionHeader properties
 * @param ref - reference to root HTMLElement of AccordionHeader
 */
export const useAccordionHeader_unstable = (
  props: AccordionHeaderProps,
  ref: React.Ref<HTMLElement>,
): AccordionHeaderState => {
  const { inline = false, size = 'medium', ...baseProps } = props;
  const state = useAccordionHeaderBase_unstable(baseProps, ref);
  const { dir } = useFluent();

  // Calculate how to rotate the expand icon [>] (ChevronRightRegular)
  let expandIconRotation: 0 | 90 | -90 | 180;
  if (state.expandIconPosition === 'end') {
    // If expand icon is at the end, the chevron points up [^] when open, and down [v] when closed
    expandIconRotation = state.open ? -90 : 90;
  } else {
    // Otherwise, the chevron points down [v] when open, and right [>] (or left [<] in RTL) when closed
    expandIconRotation = state.open ? 90 : dir !== 'rtl' ? 0 : 180;
  }

  if (state.expandIcon) {
    state.expandIcon.children ??= (
      <ChevronRightIcon
        style={{
          transform: `rotate(${expandIconRotation}deg)`,
          transition: `transform ${motionTokens.durationNormal}ms ease-out`,
        }}
      />
    );
  }

  return { ...state, inline, size };
};

/**
 * Base state hook for AccordionHeader, without design related features.
 *
 * @param props - AccordionHeader properties
 * @param ref - reference to root HTMLElement of AccordionHeader
 */
export const useAccordionHeaderBase_unstable = (
  props: AccordionHeaderBaseProps,
  ref: React.Ref<HTMLElement>,
): AccordionHeaderBaseState => {
  const { icon, button, expandIcon, expandIconPosition = 'start', ...rest } = props;
  const { value, disabled, open } = useAccordionItemContext_unstable();
  const requestToggle = useAccordionContext_unstable(ctx => ctx.requestToggle);

  /**
   * force disabled state on button if accordion isn't collapsible
   * and this is the only item opened
   */
  const disabledFocusable = useAccordionContext_unstable(ctx => !ctx.collapsible && ctx.openItems.length === 1 && open);

  const buttonSlot = slot.always(button, {
    elementType: 'button',
    defaultProps: {
      disabled,
      disabledFocusable,
      'aria-expanded': open,
      type: 'button',
    },
  });

  buttonSlot.onClick = useEventCallback(event => {
    if (isResolvedShorthand(button)) {
      button.onClick?.(event);
    }
    if (!event.defaultPrevented) {
      requestToggle({ value, event });
    }
  });

  return {
    disabled,
    open,
    expandIconPosition,
    components: {
      root: 'div',
      button: 'button',
      expandIcon: 'span',
      icon: 'div',
    },
    root: slot.always(
      {
        ref: ref as React.Ref<HTMLDivElement>,
        ...rest,
      },
      { elementType: 'div' },
    ),
    icon: slot.optional(icon, { elementType: 'div' }),
    expandIcon: slot.optional(expandIcon, {
      renderByDefault: true,
      defaultProps: {
        'aria-hidden': true,
      },
      elementType: 'span',
    }),
    button: useARIAButtonProps(buttonSlot.as, buttonSlot),
  };
};

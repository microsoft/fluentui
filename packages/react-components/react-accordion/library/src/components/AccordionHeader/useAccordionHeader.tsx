'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { AccordionHeaderProps, AccordionHeaderState } from './AccordionHeader.types';
import { ChevronRightRegular } from '@fluentui/react-icons';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { motionTokens } from '@fluentui/react-motion';
import { useAccordionHeaderBase_unstable } from './useAccordionHeaderBase';

/**
 * Returns the props and state required to render the component
 * @param props - AccordionHeader properties
 * @param ref - reference to root HTMLElement of AccordionHeader
 */
export const useAccordionHeader_unstable = (
  props: AccordionHeaderProps,
  ref: React.Ref<HTMLElement>,
): AccordionHeaderState => {
  const { expandIcon, inline = false, size = 'medium', expandIconPosition = 'start' } = props;
  const state = useAccordionHeaderBase_unstable(props, ref);

  const { dir } = useFluent();

  // Calculate how to rotate the expand icon [>] (ChevronRightRegular)
  let expandIconRotation: 0 | 90 | -90 | 180;
  if (expandIconPosition === 'end') {
    // If expand icon is at the end, the chevron points up [^] when open, and down [v] when closed
    expandIconRotation = state.open ? -90 : 90;
  } else {
    // Otherwise, the chevron points down [v] when open, and right [>] (or left [<] in RTL) when closed
    expandIconRotation = state.open ? 90 : dir !== 'rtl' ? 0 : 180;
  }

  return {
    ...state,
    expandIcon: slot.optional(expandIcon, {
      renderByDefault: true,
      defaultProps: {
        children: (
          <ChevronRightRegular
            style={{
              transform: `rotate(${expandIconRotation}deg)`,
              transition: `transform ${motionTokens.durationNormal}ms ease-out`,
            }}
          />
        ),
        'aria-hidden': true,
      },
      elementType: 'span',
    }),
    size,
    inline,
  };
};

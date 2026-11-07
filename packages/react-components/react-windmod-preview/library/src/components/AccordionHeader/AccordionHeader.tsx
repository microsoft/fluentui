'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderAccordionHeader,
  useAccordionHeader,
  useAccordionHeaderContextValues,
} from '@fluentui/react-headless-components-preview/accordion';
import { ChevronRightRegular } from '@fluentui/react-icons/headless/svg/chevron-right';

import type { AccordionHeaderProps } from './AccordionHeader.types';
import { useAccordionHeaderStyles } from './useAccordionHeaderStyles';

/**
 * An AccordionHeader is the button that toggles one AccordionItem. Windmod AccordionHeader: the
 * headless header decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const AccordionHeader: ForwardRefComponent<AccordionHeaderProps> = React.forwardRef(
  ({ inline = false, size = 'medium', ...rest }, ref) => {
    const base = useAccordionHeader(rest, ref);

    // The headless surface builds the expand-icon slot but leaves it empty. The glyph carries no
    // rotation of its own: which way it points is a function of open state, icon position and
    // direction, all of which the stylesheet reads off the header root.
    const styled = useAccordionHeaderStyles({
      ...base,
      inline,
      size,
      expandIcon: base.expandIcon && {
        ...base.expandIcon,
        children: base.expandIcon.children ?? <ChevronRightRegular />,
      },
    });

    // The context values are built from the styled state: the headless state omits `size`, so
    // children reading the header context see `undefined` unless windmod feeds it back in.
    const contextValues = useAccordionHeaderContextValues(styled);

    return renderAccordionHeader(styled, contextValues);
  },
);

AccordionHeader.displayName = 'AccordionHeader';

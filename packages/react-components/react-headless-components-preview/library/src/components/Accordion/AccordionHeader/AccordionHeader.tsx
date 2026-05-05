'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AccordionHeaderProps } from './AccordionHeader.types';
import { useAccordionHeader, useAccordionHeaderContextValues } from './useAccordionHeader';
import { renderAccordionHeader } from './renderAccordionHeader';

/**
 * Represents the heading of an accordion item, containing a button that toggles the panel open or closed.
 */
export const AccordionHeader: ForwardRefComponent<AccordionHeaderProps> = React.forwardRef((props, ref) => {
  const state = useAccordionHeader(props, ref);
  const contextValues = useAccordionHeaderContextValues(state);

  return renderAccordionHeader(state, contextValues);
});

AccordionHeader.displayName = 'AccordionHeader';

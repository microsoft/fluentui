'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AccordionHeaderProps } from './AccordionHeader.types';
import { renderAccordionHeader } from './renderAccordionHeader';
import { useAccordionHeader, useAccordionHeaderContextValues } from './useAccordionHeader';
import { useAccordionHeaderStyles } from './useAccordionHeaderStyles.styles';

export const AccordionHeader: ForwardRefComponent<AccordionHeaderProps> = React.forwardRef((props, ref) => {
  const state = useAccordionHeader(props, ref);
  const contextValues = useAccordionHeaderContextValues(state);

  useAccordionHeaderStyles(state);

  return renderAccordionHeader(state, contextValues);
});

AccordionHeader.displayName = 'AccordionHeader';

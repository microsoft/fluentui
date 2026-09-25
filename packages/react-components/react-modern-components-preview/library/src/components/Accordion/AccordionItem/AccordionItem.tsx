'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AccordionItemProps } from './AccordionItem.types';
import { renderAccordionItem } from './renderAccordionItem';
import { useAccordionItem, useAccordionItemContextValues } from './useAccordionItem';
import { useAccordionItemStyles } from './useAccordionItemStyles.styles';

export const AccordionItem: ForwardRefComponent<AccordionItemProps> = React.forwardRef((props, ref) => {
  const state = useAccordionItem(props, ref);
  const contextValues = useAccordionItemContextValues(state);

  useAccordionItemStyles(state);

  return renderAccordionItem(state, contextValues);
});

AccordionItem.displayName = 'AccordionItem';
